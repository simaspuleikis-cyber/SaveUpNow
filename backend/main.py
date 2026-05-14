from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import sqlite3, hashlib, uuid, os
from datetime import datetime, date
from typing import Optional

app = FastAPI(title="SaveUpNow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store the DB next to the exe when running as a packaged desktop app,
# otherwise keep it in the backend directory (dev mode).
_DATA_DIR = os.environ.get('SUN_DATA_DIR', os.path.dirname(os.path.abspath(__file__)))
os.makedirs(_DATA_DIR, exist_ok=True)
DB = os.path.join(_DATA_DIR, "saveupnow.db")


def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id          TEXT PRIMARY KEY,
            code_hash   TEXT UNIQUE NOT NULL,
            name        TEXT    DEFAULT '',
            income      REAL    DEFAULT 0,
            expenses    REAL    DEFAULT 0,
            goal        REAL    DEFAULT 0,
            goal_name   TEXT    DEFAULT '',
            card_name   TEXT    DEFAULT '',
            card_last4  TEXT    DEFAULT '1234',
            lang        TEXT    DEFAULT 'en',
            dark_mode   INTEGER DEFAULT 0,
            verified    INTEGER DEFAULT 0,
            created_at  TEXT    DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS transactions (
            id       TEXT PRIMARY KEY,
            user_id  TEXT NOT NULL,
            amount   REAL NOT NULL,
            note     TEXT DEFAULT '',
            date     TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        CREATE TABLE IF NOT EXISTS friends (
            id       TEXT PRIMARY KEY,
            user_id  TEXT NOT NULL,
            name     TEXT NOT NULL,
            amount   REAL DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    """)
    conn.commit()
    conn.close()


init_db()


def hash_code(code: str) -> str:
    return hashlib.sha256(code.encode()).hexdigest()


def require_user(token: str, conn):
    if not token:
        raise HTTPException(401, "Missing token")
    user = conn.execute("SELECT * FROM users WHERE code_hash = ?", (token,)).fetchone()
    if not user:
        raise HTTPException(401, "Invalid token")
    return user


# ── Models ───────────────────────────────────────────────────────────────────

class AuthReq(BaseModel):
    code: str


class ProfileUpdate(BaseModel):
    name:        Optional[str]   = None
    income:      Optional[float] = None
    expenses:    Optional[float] = None
    goal:        Optional[float] = None
    goal_name:   Optional[str]   = None
    card_name:   Optional[str]   = None
    card_last4:  Optional[str]   = None
    lang:        Optional[str]   = None
    dark_mode:   Optional[bool]  = None
    verified:    Optional[bool]  = None


class TxCreate(BaseModel):
    amount: float
    note:   str = ""
    date:   str = ""


class FriendCreate(BaseModel):
    name:   str
    amount: float = 0


class FriendAmountUpdate(BaseModel):
    amount: float


# ── Auth ─────────────────────────────────────────────────────────────────────

@app.post("/api/auth")
def auth(req: AuthReq):
    """Login or register — always succeeds with a valid code."""
    conn = get_db()
    code_hash = hash_code(req.code)
    user = conn.execute("SELECT * FROM users WHERE code_hash = ?", (code_hash,)).fetchone()
    if not user:
        uid = str(uuid.uuid4())
        conn.execute("INSERT INTO users (id, code_hash) VALUES (?, ?)", (uid, code_hash))
        conn.commit()
        user = conn.execute("SELECT * FROM users WHERE id = ?", (uid,)).fetchone()
    result = dict(user)
    conn.close()
    return {"token": code_hash, "user": result}


# ── User ─────────────────────────────────────────────────────────────────────

@app.get("/api/user")
def get_user(token: str):
    conn = get_db()
    user = require_user(token, conn)
    result = dict(user)
    conn.close()
    return result


@app.put("/api/user")
def update_user(update: ProfileUpdate, token: str):
    conn = get_db()
    user = require_user(token, conn)
    fields = {k: v for k, v in update.model_dump().items() if v is not None}
    if fields:
        sets = ", ".join(f"{k} = ?" for k in fields)
        vals = list(fields.values()) + [user["id"]]
        conn.execute(f"UPDATE users SET {sets} WHERE id = ?", vals)
        conn.commit()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
    result = dict(user)
    conn.close()
    return result


# ── Transactions ─────────────────────────────────────────────────────────────

@app.get("/api/transactions")
def list_txs(token: str):
    conn = get_db()
    user = require_user(token, conn)
    rows = conn.execute(
        "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
        (user["id"],)
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.post("/api/transactions")
def add_tx(tx: TxCreate, token: str):
    conn = get_db()
    user = require_user(token, conn)
    tid = str(uuid.uuid4())
    date_val = tx.date or datetime.now().isoformat()
    conn.execute(
        "INSERT INTO transactions (id, user_id, amount, note, date) VALUES (?, ?, ?, ?, ?)",
        (tid, user["id"], tx.amount, tx.note, date_val)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM transactions WHERE id = ?", (tid,)).fetchone()
    conn.close()
    return dict(row)


@app.delete("/api/transactions/{tid}")
def delete_tx(tid: str, token: str):
    conn = get_db()
    user = require_user(token, conn)
    conn.execute("DELETE FROM transactions WHERE id = ? AND user_id = ?", (tid, user["id"]))
    conn.commit()
    conn.close()
    return {"ok": True}


# ── Friends ──────────────────────────────────────────────────────────────────

@app.get("/api/friends")
def list_friends(token: str):
    conn = get_db()
    user = require_user(token, conn)
    rows = conn.execute(
        "SELECT * FROM friends WHERE user_id = ? ORDER BY amount DESC",
        (user["id"],)
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.post("/api/friends")
def add_friend(f: FriendCreate, token: str):
    conn = get_db()
    user = require_user(token, conn)
    fid = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO friends (id, user_id, name, amount) VALUES (?, ?, ?, ?)",
        (fid, user["id"], f.name, f.amount)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM friends WHERE id = ?", (fid,)).fetchone()
    conn.close()
    return dict(row)


@app.put("/api/friends/{fid}/amount")
def update_friend_amount(fid: str, data: FriendAmountUpdate, token: str):
    conn = get_db()
    user = require_user(token, conn)
    conn.execute(
        "UPDATE friends SET amount = ? WHERE id = ? AND user_id = ?",
        (data.amount, fid, user["id"])
    )
    conn.commit()
    conn.close()
    return {"ok": True}


@app.delete("/api/friends/{fid}")
def delete_friend(fid: str, token: str):
    conn = get_db()
    user = require_user(token, conn)
    conn.execute("DELETE FROM friends WHERE id = ? AND user_id = ?", (fid, user["id"]))
    conn.commit()
    conn.close()
    return {"ok": True}


# ── Stats ────────────────────────────────────────────────────────────────────

@app.get("/api/stats")
def get_stats(token: str):
    conn = get_db()
    user = require_user(token, conn)
    txs = [dict(t) for t in conn.execute(
        "SELECT * FROM transactions WHERE user_id = ?", (user["id"],)
    ).fetchall()]
    conn.close()

    total = sum(t["amount"] for t in txs)
    now = datetime.now()
    month_key = now.strftime("%Y-%m")
    this_month = sum(t["amount"] for t in txs if t["date"].startswith(month_key))

    hist: dict[str, float] = {}
    for t in txs:
        k = t["date"][:7]
        hist[k] = hist.get(k, 0) + t["amount"]

    save_dates = sorted({t["date"][:10] for t in txs}, reverse=True)
    streak = 0
    today = date.today()
    cur = today
    for ds in save_dates:
        d = date.fromisoformat(ds)
        if (cur - d).days <= 1:
            streak += 1
            cur = d
        else:
            break

    return {
        "total_saved":      total,
        "saved_this_month": this_month,
        "month_history":    [{"key": k, "amount": v}
                             for k, v in sorted(hist.items())[-12:]],
        "streak":           streak,
        "tx_count":         len(txs),
    }


# ── Serve built frontend (production mode) ───────────────────────────────────
# When `frontend/dist` exists (after running `npm run build`), the backend
# serves the React app directly so only ONE process needs to run.

_HERE = os.path.dirname(os.path.abspath(__file__))
_DIST = os.path.join(_HERE, "..", "frontend", "dist")

if os.path.isdir(_DIST):
    _ASSETS = os.path.join(_DIST, "assets")
    if os.path.isdir(_ASSETS):
        app.mount("/assets", StaticFiles(directory=_ASSETS), name="static-assets")

    @app.get("/", include_in_schema=False)
    def serve_index():
        return FileResponse(os.path.join(_DIST, "index.html"))

    # Catch-all: any unmatched path → SPA shell
    # (API routes registered above take priority because FastAPI matches in order)
    @app.get("/{rest:path}", include_in_schema=False)
    def serve_spa(rest: str):
        index = os.path.join(_DIST, "index.html")
        return FileResponse(index)
