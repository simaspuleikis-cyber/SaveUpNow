const STORAGE_KEY = "saveupnow_v6";
const $ = (id) => document.getElementById(id);

let state = null;

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

const I18N = {
  en: {
    brandSub: "Free saving plan. Simple. Smarter.",
    heroBadge: "Free · Private · Open",
    stat1: "Free", stat2: "Servers", stat3: "Goals",
    leftTitle: "Build your savings habit",
    leftIntro: "SaveUpNow gives you a personal saving plan based on your income and goals. Free forever, private by design — your data never leaves your browser.",
    c1t: "100% free, forever", c1d: "No subscriptions, no hidden fees, no limits.",
    c2t: "Code login", c2d: "Unlock with a personal code — no email required.",
    c3t: "Age verified", c3d: "Upload an ID to confirm your age once and start saving.",
    howTitle: "How it works",
    howSteps: [
      "Create your account using a unique unlock code.",
      "Upload a document for age verification.",
      "Enter your income, expenses, and savings goal.",
      "Log savings and track your monthly progress.",
      "Use the bottom menu: Wallet, Home, Settings."
    ],
    tipText: "Your data is stored only in your browser. Nothing is sent to any server.",
    footNote: "All data stays in your browser (localStorage)",
    export: "Export", reset: "Reset",
    authTitle: "Welcome", authSub: "Create or sign into your account",
    codeTitle: "Unlock code",
    codeDesc: "Your code is your key. Keep it safe — it unlocks your account.",
    codeLabel: "Code", start: "Continue", genCode: "Generate code",
    codeHintAuth: "New here? Generate a code and keep it somewhere safe.",
    verifyTitle: "Age verification",
    verifyDesc: "Upload a government ID or proof of age document.",
    uploadTitle: "Upload document", noFile: "No file selected",
    verified: "Verified", notVerified: "Not verified",
    setupTitle: "Saving goal",
    incomeLabel: "Monthly income (\u20ac)", expensesLabel: "Monthly expenses (\u20ac)",
    goalLabel: "Goal amount (\u20ac)", goalNameLabel: "Goal name",
    saveContinue: "Save & continue",
    homeTitle: "Home", homeSubtitle: "Your monthly progress",
    savedMonthLabel: "Saved this month", ringSub: "of goal",
    goalMiniLabel: "Goal", remainingMiniLabel: "Remaining",
    totalSavedMiniLabel: "Total saved", entriesLabel: "Entries",
    chartLabel: "Monthly savings",
    streakLbl: "streak", streakBestLbl: "best", txTotalLbl: "saves",
    actionsTitle: "Add savings",
    addAmountLabel: "Amount (\u20ac)", addNoteLabel: "Note (optional)",
    add: "Add", planTitle: "Saving plan",
    txTitle: "Recent transactions", txEmpty: "No transactions logged yet.",
    txDefaultNote: "Savings",
    showAllTx: "View all transactions", showLessTx: "Show less",
    walletTitle: "Wallet", walletSub: "Overview and card",
    savedTotalLabel: "Total saved", thisMonth: "This month",
    cardTitle: "Card details", cardDesc: "Personalise your account card.",
    cardNameLabel: "Name", cardStatusLabel: "Status", active: "Active",
    cardNameInputLabel: "Name on card", cardLast4Label: "Last 4 digits",
    saveCard: "Save card",
    friendsTitle: "Saving with friends",
    friendsDesc: "Monthly leaderboard — see how you compare.",
    refreshFriends: "Refresh amounts", addFriend: "Add friend",
    friendNameLabel: "Friend name", you: "You", friend: "Friend",
    rank1Label: "Top saver",
    settingsTitle: "Settings",
    accountRow: "Your account", privacyRow: "Privacy policy",
    loginRow: "Login methods", loginRowValue: "Code",
    language: "Language", langEnglish: "English", langLithuanian: "Lietuviu",
    darkModeLabel: "Dark mode", darkModeSub: "Switch to dark theme",
    remindersTitle: "Reminders",
    remindersDesc: "Get scheduled notifications to stay on track.",
    enableBrowserNotifs: "Enable notifications",
    off: "Off", on: "On",
    remindersEnabledLabel: "Reminders enabled",
    remindersEnabledSub: "Receive scheduled saving reminders.",
    everyLabel: "Repeat", timesHint: "Reminders at 10:00 and 18:00",
    nextHint: "Next: ",
    securityTitle: "Account security",
    showCode: "Show code", hideCode: "Hide code",
    lock: "Lock account", locked: "Account locked",
    goalPlanTitle: "Goal & plan",
    goalEditLabel: "Goal (\u20ac)", goalNameEditLabel: "Goal name",
    incomeEditLabel: "Income (\u20ac)", expensesEditLabel: "Expenses (\u20ac)",
    save: "Save changes", savedOk: "Saved",
    navWallet: "Wallet", navHome: "Home", navSettings: "Settings",
    enterCode: "Enter a code to continue",
    enterFriendName: "Enter a name",
    needVerify: "Age verification required",
    signedIn: "Signed in",
    codeGenerated: "Code generated — keep it safe",
    docUploaded: "Document uploaded and verified",
    savedSettings: "Settings saved",
    enterPositive: "Enter a positive amount",
    added: "Savings added",
    notifsUnsupported: "Browser notifications are not supported",
    notifsEnabled: "Notifications enabled",
    notifsDenied: "Notifications not allowed",
    friendAdded: "Friend added",
    friendsUpdated: "Amounts refreshed",
    resetDone: "Data cleared",
    exportDone: "Exported",
    mustLogin: "Sign in and verify your age first",
    goalReached: "Goal reached — well done!",
    noCodeSet: "No code set.",
    reminderMessage: "Time to save",
    streakMilestone: (n) => `${n}-day streak — keep it up!`,
    everyXDays: (n) => `Every ${n} day${n === 1 ? "" : "s"}`
  },

  lt: {
    brandSub: "Nemokamas taupymo planas. Paprasta. Protinga.",
    heroBadge: "Nemokama · Privatu · Atvira",
    stat1: "Nemokama", stat2: "Serveriai", stat3: "Tikslai",
    leftTitle: "Sukurkite taupymo iproti",
    leftIntro: "SaveUpNow suteikia jums asmenini taupymo plana pagal jusu pajamas ir tikslus. Nemokama amzinai, privatu pagal dizaina.",
    c1t: "100% nemokama", c1d: "Nera pirkimu, prenumeratu ar pasleptuju mokesciu.",
    c2t: "Prisijungimas su kodu", c2d: "Atrakinkite su asmeniniu kodu. Nereikia el. pasto.",
    c3t: "Amziaus patvirtinimas", c3d: "Ikelkite asmens dokumento nuotrauka amziui patvirtinti.",
    howTitle: "Kaip pradeti",
    howSteps: [
      "Sukurkite paskyrą su unikaliu atrakinimu kodu.",
      "Ikelkite dokumenta amziaus patvirtinimui.",
      "Iveskite pajamas, islaidas ir taupymo tikslą.",
      "Registruokite taupymą ir sekite menesio pažangą.",
      "Naudokite apatiniu meniu: Piniginė, Pagrindinis, Nustatymai."
    ],
    tipText: "Jusu duomenys saugomi tik jusu narsy\u0137uje. Niekas nesiunčiama i serverius.",
    footNote: "Visi duomenys lieka jusu narsy\u0137uje (localStorage)",
    export: "Eksportuoti", reset: "Reset",
    authTitle: "Sveiki", authSub: "Sukurkite arba prisijunkite prie paskyros",
    codeTitle: "Atrakinimo kodas",
    codeDesc: "Kodas yra jusu raktas. Saugokite ji — jis atrakina jusu paskyrą.",
    codeLabel: "Kodas", start: "Tęsti", genCode: "Sugeneruoti koda",
    codeHintAuth: "Naujas vartotojas? Sugeneruokite kodą ir isaugokite ji saugioje vietoje.",
    verifyTitle: "Amziaus patvirtinimas",
    verifyDesc: "Ikelkite asmens dokumento arba amziaus patvirtinimo dokumentą.",
    uploadTitle: "Ikelti dokumentą", noFile: "Failas nepasirinktas",
    verified: "Patvirtinta", notVerified: "Nepatvirtinta",
    setupTitle: "Taupymo tikslas",
    incomeLabel: "Menesio pajamos (\u20ac)", expensesLabel: "Menesio islaidos (\u20ac)",
    goalLabel: "Tikslo suma (\u20ac)", goalNameLabel: "Tikslo pavadinimas",
    saveContinue: "Issaugoti ir testi",
    homeTitle: "Pagrindinis", homeSubtitle: "Jusu menesio pazanga",
    savedMonthLabel: "Sutaupyta si menesi", ringSub: "tikslo",
    goalMiniLabel: "Tikslas", remainingMiniLabel: "Liko",
    totalSavedMiniLabel: "Sutaupyta is viso", entriesLabel: "Irasai",
    chartLabel: "Menesio taupymas",
    streakLbl: "serija", streakBestLbl: "rekordas", txTotalLbl: "taupymai",
    actionsTitle: "Prideti taupymą",
    addAmountLabel: "Suma (\u20ac)", addNoteLabel: "Pastaba (nebutina)",
    add: "Prideti", planTitle: "Taupymo planas",
    txTitle: "Paskutines operacijos", txEmpty: "Dar nera uzregistruotu operaciju.",
    txDefaultNote: "Taupymas",
    showAllTx: "Rodyti visas operacijas", showLessTx: "Rodyti maziau",
    walletTitle: "Piniginė", walletSub: "Apzvalga ir kortele",
    savedTotalLabel: "Sutaupyta is viso", thisMonth: "Si men.",
    cardTitle: "Kortelės duomenys", cardDesc: "Suasmeninkite savo paskyros kortelę.",
    cardNameLabel: "Vardas", cardStatusLabel: "Statusas", active: "Aktyvi",
    cardNameInputLabel: "Vardas ant kortelės", cardLast4Label: "Paskutiniai 4 sk.",
    saveCard: "Issaugoti kortelę",
    friendsTitle: "Taupymas su draugais",
    friendsDesc: "Menesio lyderiu lenta — palyginkite save.",
    refreshFriends: "Atnaujinti sumas", addFriend: "Prideti draugą",
    friendNameLabel: "Draugo vardas", you: "Tu", friend: "Draugas",
    rank1Label: "Geriausias taupy\u0117jas",
    settingsTitle: "Nustatymai",
    accountRow: "Jusu paskyra", privacyRow: "Privatumo politika",
    loginRow: "Prisijungimo budai", loginRowValue: "Kodas",
    language: "Kalba", langEnglish: "English", langLithuanian: "Lietuvi\u0173",
    darkModeLabel: "Tamsi tema", darkModeSub: "Perjungti i tamsią temą",
    remindersTitle: "Priminimai",
    remindersDesc: "Gaukite suplanuotus pranesimu priminimus.",
    enableBrowserNotifs: "Ijungti pranesi mus",
    off: "Isjungta", on: "Ijungta",
    remindersEnabledLabel: "Priminimai ijungti",
    remindersEnabledSub: "Gaukite suplanuotus taupymo priminimus.",
    everyLabel: "Kartoti", timesHint: "Priminimai 10:00 ir 18:00",
    nextHint: "Kitas: ",
    securityTitle: "Paskyros saugumas",
    showCode: "Rodyti kodą", hideCode: "Slepti kodą",
    lock: "Uzrakinti paskyrą", locked: "Paskyra uzrakinta",
    goalPlanTitle: "Tikslas ir planas",
    goalEditLabel: "Tikslas (\u20ac)", goalNameEditLabel: "Tikslo pavadinimas",
    incomeEditLabel: "Pajamos (\u20ac)", expensesEditLabel: "Islaidos (\u20ac)",
    save: "Issaugoti pakeitimus", savedOk: "Issaugota",
    navWallet: "Piniginė", navHome: "Pagrindinis", navSettings: "Nustatymai",
    enterCode: "Iveskite kodą testi",
    enterFriendName: "Iveskite varda",
    needVerify: "Butinas amziaus patvirtinimas",
    signedIn: "Prisijungta",
    codeGenerated: "Kodas sugeneruotas — issaugokite ji",
    docUploaded: "Dokumentas ikeltas ir patvirtintas",
    savedSettings: "Nustatymai issaugoti",
    enterPositive: "Iveskite teigiam\u0105 suma",
    added: "Taupymas pridetas",
    notifsUnsupported: "Narsy\u0137ė nepalaiko pranesimu",
    notifsEnabled: "Pranesimai ijungti",
    notifsDenied: "Pranesimai neleidzi ama",
    friendAdded: "Draugas pridetas",
    friendsUpdated: "Sumos atnaujintos",
    resetDone: "Duomenys istrinti",
    exportDone: "Eksportuota",
    mustLogin: "Pirmiau prisijunkite ir patvirtinkite amziu",
    goalReached: "Tikslas pasiektas — puiku!",
    noCodeSet: "Kodas nenurodytas.",
    reminderMessage: "Laikas taupy ti",
    streakMilestone: (n) => `${n} dienu serija — puiku!`,
    everyXDays: (n) => `Kas ${n} d.`
  }
};

function t(key) {
  const lang = state?.ui?.lang || "en";
  const dict = I18N[lang] || I18N.en;
  const v = dict[key];
  return (v !== undefined) ? v : (I18N.en[key] ?? key);
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

function defaultState() {
  return {
    auth: { unlockCode: "", verified: false, idFileName: "" },
    profile: { goalName: "", goalAmount: 0, income: 0, expenses: 0 },
    savings: { savedTotal: 0, savedThisMonth: 0, monthKey: monthKey(new Date()) },
    transactions: [],
    monthHistory: [],
    streak: { current: 0, best: 0, lastSaveDate: "" },
    card: { name: "", last4: "1234" },
    friends: [
      { name: "Mantas", savedThisMonth: 45 },
      { name: "Ieva",   savedThisMonth: 60 },
      { name: "Lukas",  savedThisMonth: 35 }
    ],
    reminders: {
      enabled: false, everyDays: 1,
      times: ["10:00", "18:00"], anchorTs: Date.now(), lastFireKey: ""
    },
    ui: {
      activeView: "auth", notifEnabled: false,
      lang: "en", showCodeVisible: false,
      darkMode: false, showAllTx: false
    }
  };
}

function monthKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // Migrate from old storage key
    if (!raw) {
      const old = localStorage.getItem("saveupnow_v5");
      if (old) {
        const s = JSON.parse(old);
        const migrated = { ...defaultState(), ...s };
        migrated.monthHistory = [];
        migrated.streak = defaultState().streak;
        if (!migrated.ui) migrated.ui = defaultState().ui;
        migrated.ui.darkMode = false;
        migrated.ui.showAllTx = false;
        return migrated;
      }
      return defaultState();
    }

    const s = JSON.parse(raw);
    const current = monthKey(new Date());
    if (s?.savings?.monthKey !== current) {
      s.savings.monthKey = current;
      s.savings.savedThisMonth = 0;
    }

    if (!s.ui)         s.ui = defaultState().ui;
    if (!s.ui.lang)    s.ui.lang = "en";
    if (s.ui.darkMode === undefined) s.ui.darkMode = false;
    if (s.ui.showAllTx === undefined) s.ui.showAllTx = false;
    if (!s.reminders)  s.reminders = defaultState().reminders;
    if (!Number.isFinite(s.reminders.everyDays)) s.reminders.everyDays = 1;
    if (!Array.isArray(s.reminders.times))  s.reminders.times = ["10:00", "18:00"];
    if (!Array.isArray(s.transactions))     s.transactions = [];
    if (!Array.isArray(s.monthHistory))     s.monthHistory = [];
    if (!s.streak) s.streak = defaultState().streak;

    return { ...defaultState(), ...s };
  } catch {
    return defaultState();
  }
}

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toast(msg, duration = 2200) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove("show"), duration);
}

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function money(n) {
  const x = Number.isFinite(n) ? n : 0;
  return "\u20ac" + x.toFixed(2).replace(/\.00$/, "");
}

function parseNumber(v) {
  const x = Number(String(v).replace(",", ".").trim());
  return Number.isFinite(x) ? x : 0;
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function setBadge(el, ok, okText, badText) {
  el.textContent = ok ? okText : badText;
  el.style.color        = ok ? "var(--green)"        : "var(--muted)";
  el.style.borderColor  = ok ? "var(--green-border)"  : "var(--border)";
  el.style.background   = ok ? "var(--green-light)"   : "var(--surface2)";
}

// Avatar color palette
const AVATAR_COLORS = [
  "#4f46e5","#7c3aed","#db2777","#ea580c","#16a34a","#0891b2","#7c3aed"
];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

// ---------------------------------------------------------------------------
// View routing
// ---------------------------------------------------------------------------

function showView(name) {
  ["auth","home","wallet","settings"].forEach(v => {
    const el = document.querySelector(`[data-view="${v}"]`);
    if (el) el.classList.toggle("hidden", v !== name);
  });
  const navMap = { wallet: $("navWallet"), home: $("navHome"), settings: $("navSettings") };
  Object.values(navMap).forEach(btn => btn?.classList.remove("active"));
  if (navMap[name]) navMap[name].classList.add("active");
  state.ui.activeView = name;
  save();
}

function isReadyToEnterApp() {
  return Boolean(state.auth.unlockCode) && state.auth.verified;
}

// ---------------------------------------------------------------------------
// Plan computation
// ---------------------------------------------------------------------------

function computePlan() {
  const income   = Number(state.profile.income)    || 0;
  const expenses = Number(state.profile.expenses)  || 0;
  const goal     = Number(state.profile.goalAmount) || 0;
  const free     = Math.max(0, income - expenses);
  const total    = Number(state.savings.savedTotal) || 0;

  const conservative = free > 0 ? Math.max(5,  Math.round(free * 0.10)) : 5;
  const moderate     = free > 0 ? Math.max(10, Math.round(free * 0.20)) : 10;
  const aggressive   = free > 0 ? Math.max(15, Math.round(free * 0.30)) : 15;
  const remaining    = Math.max(0, goal - total);
  const monthsModerate = moderate > 0 ? Math.ceil(remaining / moderate) : null;

  return { conservative, moderate, aggressive, remaining, monthsModerate, free };
}

// ---------------------------------------------------------------------------
// Month history helpers
// ---------------------------------------------------------------------------

function getLastNMonths(n) {
  const result = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(d);
    const existing = (state.monthHistory || []).find(h => h.key === key);
    result.push({ key, amount: existing ? existing.amount : 0 });
  }
  return result;
}

function updateMonthHistory(amount) {
  const key = monthKey(new Date());
  if (!Array.isArray(state.monthHistory)) state.monthHistory = [];
  const existing = state.monthHistory.find(h => h.key === key);
  if (existing) {
    existing.amount = Math.max(0, existing.amount + amount);
  } else {
    state.monthHistory.push({ key, amount: Math.max(0, amount) });
  }
  state.monthHistory.sort((a, b) => a.key.localeCompare(b.key));
  if (state.monthHistory.length > 12) state.monthHistory = state.monthHistory.slice(-12);
}

// ---------------------------------------------------------------------------
// Streak helpers
// ---------------------------------------------------------------------------

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last  = state.streak.lastSaveDate || "";

  if (!last) {
    state.streak.current = 1;
  } else if (last === today) {
    return; // already saved today
  } else {
    const diffMs   = new Date(today) - new Date(last);
    const diffDays = Math.round(diffMs / 86400000);
    state.streak.current = (diffDays === 1) ? state.streak.current + 1 : 1;
  }
  state.streak.lastSaveDate = today;
  state.streak.best = Math.max(state.streak.best, state.streak.current);
}

// ---------------------------------------------------------------------------
// Ring
// ---------------------------------------------------------------------------

function updateRing(pct) {
  const ring = 290;
  const p = clamp(pct, 0, 100);
  const circle = $("progressCircle");
  circle.style.strokeDashoffset = String(ring - (ring * p / 100));
  $("progressPct").textContent = `${Math.round(p)}%`;
  circle.classList.toggle("ring-complete", p >= 100);
}

// ---------------------------------------------------------------------------
// Motivation
// ---------------------------------------------------------------------------

function motivationLine(pct) {
  const lt = state.ui.lang === "lt";
  if (pct >= 100) return lt ? "Tikslas pasiektas. Puikus darbas." : "Goal reached. Outstanding work.";
  if (pct >= 70)  return lt ? "Labai arti tikslo. Tik nesustokite." : "Very close to your goal. Keep going.";
  if (pct > 0)    return lt ? "Geras startas. Mazi zingsniai duoda rezultata." : "Good start. Small, consistent steps lead to big results.";
  return lt ? "Nustatykite tiksla ir pradekite taupyti." : "Set a goal and start saving to see your progress here.";
}

// ---------------------------------------------------------------------------
// Chart rendering
// ---------------------------------------------------------------------------

function renderChart() {
  const svg = $("chartSvg");
  if (!svg) return;

  const history = getLastNMonths(6);
  const hasData = history.some(h => h.amount > 0);

  if (!hasData) {
    const lt = state.ui.lang === "lt";
    svg.innerHTML = `<text x="130" y="40" text-anchor="middle"
      font-size="10" font-weight="600" fill="var(--muted)"
      font-family="ui-sans-serif,system-ui,sans-serif">
      ${lt ? "Dar nera duomenu" : "No data yet"}</text>`;
    return;
  }

  const W = 260, H = 76;
  const padL = 8, padR = 8, padT = 18, padB = 16;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const n = history.length;
  const barW = Math.floor((innerW - (n - 1) * 6) / n);
  const curKey = monthKey(new Date());
  const max = Math.max(...history.map(h => h.amount), 1);

  let html = "";
  history.forEach((h, i) => {
    const x = padL + i * (barW + 6);
    const barH = h.amount > 0 ? Math.max(3, Math.round((h.amount / max) * innerH)) : 2;
    const y = padT + innerH - barH;
    const isCurrent = h.key === curKey;
    const fill = isCurrent ? "var(--accent)" : "var(--border)";
    const mon = h.key.slice(5); // "MM"

    html += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${fill}"/>`;

    if (h.amount > 0) {
      const displayAmt = h.amount >= 1000
        ? `${(h.amount / 1000).toFixed(1)}k`
        : `${Math.round(h.amount)}`;
      html += `<text x="${x + barW / 2}" y="${y - 3}" text-anchor="middle"
        font-size="8" font-weight="700" fill="var(--accent)"
        font-family="ui-sans-serif,system-ui,sans-serif">\u20ac${displayAmt}</text>`;
    }
    html += `<text x="${x + barW / 2}" y="${H - 1}" text-anchor="middle"
      font-size="8.5" font-weight="600" fill="var(--muted)"
      font-family="ui-sans-serif,system-ui,sans-serif">${mon}</text>`;
  });

  svg.innerHTML = html;
}

// ---------------------------------------------------------------------------
// Streak rendering
// ---------------------------------------------------------------------------

function renderStreak() {
  const streak = state.streak || { current: 0, best: 0 };
  const total  = (state.transactions || []).length;
  if ($("streakCurrent")) $("streakCurrent").textContent = String(streak.current);
  if ($("streakBestVal")) $("streakBestVal").textContent = String(streak.best);
  if ($("txTotal"))       $("txTotal").textContent       = String(total);
}

// ---------------------------------------------------------------------------
// Render functions
// ---------------------------------------------------------------------------

function renderAuth() {
  $("unlockCodeInput").value = state.auth.unlockCode || "";
  $("uploadSub").textContent = state.auth.idFileName ? state.auth.idFileName : t("noFile");
  setBadge($("badgeVerified"), state.auth.verified, t("verified"), t("notVerified"));
  $("setupNote").textContent = "";
}

function renderHome() {
  const goal  = Number(state.profile.goalAmount) || 0;
  const total = Number(state.savings.savedTotal) || 0;
  const month = Number(state.savings.savedThisMonth) || 0;

  $("savedThisMonth").textContent  = money(month);
  $("goalValue").textContent       = goal > 0 ? money(goal) : "—";
  $("remainingValue").textContent  = goal > 0 ? money(Math.max(0, goal - total)) : "—";
  $("totalSavedMini").textContent  = total > 0 ? money(total) : "—";
  $("entriesCount").textContent    = String((state.transactions || []).length);

  let pct = 0;
  if (goal > 0) pct = clamp((total / goal) * 100, 0, 100);
  updateRing(pct);

  const motEl = $("motivationText");
  motEl.textContent = motivationLine(pct);
  motEl.classList.toggle("goal-complete", pct >= 100);

  renderPlan();
  renderTransactions();
  renderStreak();
  renderChart();
}

function renderPlan() {
  const plan     = computePlan();
  const goal     = Number(state.profile.goalAmount) || 0;
  const lt       = state.ui.lang === "lt";
  const planBody = $("planText");

  if (goal <= 0) {
    planBody.innerHTML = `<span class="plan-row-label">${lt ? "Nustatykite tikslą, kad pamatytu oti plana." : "Set a goal to see your personalised plan."}</span>`;
    return;
  }

  const goalName = (state.profile.goalName || "").trim() || (lt ? "Tikslas" : "Goal");
  const rows = [
    { label: goalName,                                      value: money(goal) },
    { label: lt ? "Konservatyvus (10%)" : "Conservative (10%)", value: `${money(plan.conservative)}/mo` },
    { label: lt ? "Vidutinis (20%)" : "Moderate (20%)",    value: `${money(plan.moderate)}/mo` },
    { label: lt ? "Aktyvus (30%)" : "Aggressive (30%)",    value: `${money(plan.aggressive)}/mo` }
  ];

  if (plan.monthsModerate !== null && plan.remaining > 0) {
    rows.push({ label: lt ? "Tikslas per (vid.)" : "Reach goal in (mod.)", value: `~${plan.monthsModerate} ${lt ? "men." : "mo."}` });
  }
  if (plan.remaining <= 0) {
    rows.push({ label: lt ? "Pasiekta" : "Status", value: lt ? "Tikslas pasiektas" : "Goal reached" });
  }

  planBody.innerHTML = rows.map(r =>
    `<div class="plan-row"><span class="plan-row-label">${escapeHtml(r.label)}</span><span class="plan-row-value">${escapeHtml(r.value)}</span></div>`
  ).join("");
}

function renderTransactions() {
  const list   = $("transactionList");
  const empty  = $("transactionEmpty");
  const allBtn = $("btnShowAllTx");
  const allTxns = state.transactions || [];
  const showAll = state.ui.showAllTx;
  const txns   = showAll ? allTxns : allTxns.slice(0, 6);

  if (!txns.length) {
    list.innerHTML = "";
    empty.style.display = "";
    allBtn.classList.add("hidden");
    return;
  }

  empty.style.display = "none";
  const locale = state.ui.lang === "lt" ? "lt-LT" : "en-GB";

  list.innerHTML = txns.map(tx => {
    const date = new Date(tx.date).toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
    const note = (tx.note || "").trim() || t("txDefaultNote");
    return `<div class="tx-item">
      <div class="tx-left">
        <div class="tx-label">${escapeHtml(note)}</div>
        <div class="tx-date">${escapeHtml(date)}</div>
      </div>
      <div class="tx-amount">+${money(tx.amount)}</div>
      <button class="tx-delete" data-id="${tx.id}" aria-label="Delete" type="button">&times;</button>
    </div>`;
  }).join("");

  // Bind delete buttons
  list.querySelectorAll(".tx-delete").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      deleteTransaction(id);
    });
  });

  // Show/hide "view all" button
  if (allTxns.length > 6) {
    allBtn.classList.remove("hidden");
    const label = $("showAllTxLabel");
    if (label) label.textContent = showAll ? t("showLessTx") : `${t("showAllTx")} (${allTxns.length})`;
  } else {
    allBtn.classList.add("hidden");
  }
}

function deleteTransaction(id) {
  const idx = (state.transactions || []).findIndex(tx => tx.id === id);
  if (idx < 0) return;

  const tx = state.transactions[idx];

  // Subtract from totals
  state.savings.savedTotal = Math.max(0, (Number(state.savings.savedTotal) || 0) - tx.amount);

  // If from current month, subtract from savedThisMonth
  const txMonthKey = monthKey(new Date(tx.date));
  if (txMonthKey === state.savings.monthKey) {
    state.savings.savedThisMonth = Math.max(0, (Number(state.savings.savedThisMonth) || 0) - tx.amount);
  }

  // Update month history
  if (Array.isArray(state.monthHistory)) {
    const entry = state.monthHistory.find(h => h.key === txMonthKey);
    if (entry) entry.amount = Math.max(0, entry.amount - tx.amount);
  }

  state.transactions.splice(idx, 1);
  save();
  renderHome();
  renderWallet();
}

function renderWallet() {
  $("savedTotal").textContent  = money(Number(state.savings.savedTotal) || 0);
  $("monthlyPill").textContent = `${t("thisMonth")}: ${money(Number(state.savings.savedThisMonth) || 0)}`;
  $("cardMasked").textContent  = `\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${state.card.last4 || "1234"}`;
  $("cardName").textContent    = state.card.name || (state.ui.lang === "lt" ? "Vartotojas" : "User");
  renderLeaderboard();
}

function renderLeaderboard() {
  const el   = $("leaderboard");
  el.innerHTML = "";

  const user = { name: t("you"), savedThisMonth: Number(state.savings.savedThisMonth) || 0, isMe: true };
  const all  = [user, ...state.friends].sort((a, b) => b.savedThisMonth - a.savedThisMonth);
  const lt   = state.ui.lang === "lt";
  const rankClasses = ["gold", "silver", "bronze"];

  all.forEach((entry, i) => {
    const row = document.createElement("div");
    row.className = "list-item" + (i === 0 ? " rank-1" : i === 1 ? " rank-2" : "");

    const rankLabel  = i === 0 ? t("rank1Label") : (entry.isMe ? t("you") : t("friend"));
    const initials   = entry.name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    const color      = entry.isMe ? "var(--accent)" : avatarColor(entry.name);
    const badgeCls   = rankClasses[i] || "";

    row.innerHTML = `
      <div class="list-item-left">
        <div class="rank-badge ${badgeCls}">${i + 1}</div>
        <div class="friend-avatar" style="background:${color}">${escapeHtml(initials)}</div>
        <div>
          <b>${escapeHtml(entry.name)}</b><br>
          <span>${escapeHtml(rankLabel)}</span>
        </div>
      </div>
      <div class="list-item-right">
        <b>${money(entry.savedThisMonth)}</b>
        <span>${lt ? "si men." : "this month"}</span>
      </div>`;
    el.appendChild(row);
  });
}

function renderNotifBadge() {
  setBadge($("notifBadge"), state.ui.notifEnabled, t("on"), t("off"));
  $("btnEnableNotifications").style.display = state.ui.notifEnabled ? "none" : "";
}

function renderLanguagePickerUI() {
  const val = state.ui.lang || "en";
  $("langPillValue").textContent = val === "lt" ? I18N.lt.langLithuanian : I18N.en.langEnglish;

  buildPickerList($("langPickerList"), languageOptions(), val, (picked) => {
    state.ui.lang = picked;
    save();
    $("langPicker").classList.add("hidden");
    renderAll();
  });
}

function languageOptions() {
  return [
    { value: "en", title: I18N.en.langEnglish,    sub: "English" },
    { value: "lt", title: I18N.lt.langLithuanian, sub: "Lithuanian" }
  ];
}

function buildPickerList(containerEl, items, selectedValue, onPick) {
  containerEl.innerHTML = "";
  for (const it of items) {
    const row = document.createElement("div");
    row.className = "picker-item";
    row.innerHTML = `<div><b>${escapeHtml(it.title)}</b><br><span>${escapeHtml(it.sub || "")}</span></div>
                     <div class="picker-check">${it.value === selectedValue ? "\u2713" : ""}</div>`;
    row.addEventListener("click", () => onPick(it.value));
    containerEl.appendChild(row);
  }
}

function everyOptions() {
  return Array.from({ length: 7 }, (_, i) => i + 1).map(n => ({
    value: n, title: t("everyXDays")(n), sub: ""
  }));
}

function renderReminderSettingsUI() {
  $("remindersEnabled").checked = !!state.reminders.enabled;
  const n = clamp(parseInt(state.reminders.everyDays, 10) || 1, 1, 7);
  $("everyPillValue").textContent = t("everyXDays")(n);
  const next = computeNextOccurrences(4);
  $("nextHint").textContent = t("nextHint") + (next.length ? formatNextTimes(next) : "—");

  buildPickerList($("everyPickerList"), everyOptions(), n, (picked) => {
    state.reminders.everyDays = picked;
    state.reminders.anchorTs  = Date.now();
    state.reminders.lastFireKey = "";
    save();
    $("everyPicker").classList.add("hidden");
    renderReminderSettingsUI();
  });
}

function formatNextTimes(list) {
  const locale = state.ui.lang === "lt" ? "lt-LT" : "en-GB";
  return list.map(d => d.toLocaleString(locale, {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  })).join(" · ");
}

function computeNextOccurrences(maxCount = 5) {
  if (!state.reminders.enabled || !state.ui.notifEnabled) return [];
  const every  = clamp(parseInt(state.reminders.everyDays, 10) || 1, 1, 7);
  const times  = state.reminders.times || ["10:00", "18:00"];
  const anchor = new Date(state.reminders.anchorTs || Date.now());
  anchor.setHours(0, 0, 0, 0);
  const now    = new Date();
  const results = [];

  for (let dayOffset = 0; dayOffset <= 30 && results.length < maxCount; dayOffset++) {
    const day = new Date(now);
    day.setDate(now.getDate() + dayOffset);
    day.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((day - anchor) / 86400000);
    if (diffDays < 0 || diffDays % every !== 0) continue;
    for (const tm of times) {
      const [hh, mm] = tm.split(":").map(x => parseInt(x, 10));
      const slot = new Date(day);
      slot.setHours(hh, mm, 0, 0);
      if (slot > now) { results.push(slot); if (results.length >= maxCount) break; }
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Dark mode
// ---------------------------------------------------------------------------

function applyDarkMode() {
  document.documentElement.setAttribute("data-theme", state.ui.darkMode ? "dark" : "light");
  const toggle = $("darkModeToggle");
  if (toggle) toggle.checked = !!state.ui.darkMode;
}

// ---------------------------------------------------------------------------
// Notifications / reminders
// ---------------------------------------------------------------------------

function notify(msg) {
  toast(msg);
  if (state.ui.notifEnabled && "Notification" in window && Notification.permission === "granted") {
    new Notification("SaveUpNow", { body: msg });
  }
}

function tickScheduledReminders() {
  if (!state.reminders.enabled || !state.ui.notifEnabled) return;
  const every  = clamp(parseInt(state.reminders.everyDays, 10) || 1, 1, 7);
  const times  = new Set(state.reminders.times || ["10:00", "18:00"]);
  const now    = new Date();
  const hh     = String(now.getHours()).padStart(2, "0");
  const mm     = String(now.getMinutes()).padStart(2, "0");
  const curTime = `${hh}:${mm}`;
  if (!times.has(curTime)) return;

  const anchor = new Date(state.reminders.anchorTs || Date.now());
  anchor.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - anchor) / 86400000);
  if (diffDays < 0 || diffDays % every !== 0) return;

  const y  = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const d  = String(now.getDate()).padStart(2, "0");
  const fireKey = `${y}-${mo}-${d}|${curTime}`;
  if (state.reminders.lastFireKey === fireKey) return;

  state.reminders.lastFireKey = fireKey;
  save();
  notify(t("reminderMessage"));
  renderReminderSettingsUI();
}

// ---------------------------------------------------------------------------
// i18n apply
// ---------------------------------------------------------------------------

function applyLanguageToStaticText() {
  const ids = {
    brandSub: "brandSub", heroBadge: "heroBadge",
    stat1: "stat1", stat2: "stat2", stat3: "stat3",
    leftTitle: "leftTitle", leftIntro: "leftIntro",
    c1t: "c1t", c1d: "c1d", c2t: "c2t", c2d: "c2d", c3t: "c3t", c3d: "c3d",
    tipText: "tipText", footNote: "footNote",
    btnExport: "export", btnReset: "reset",
    authTitle: "authTitle", authSub: "authSub",
    codeTitle: "codeTitle", codeDesc: "codeDesc", codeLabel: "codeLabel",
    btnStart: "start", btnGenerateCode: "genCode", codeHintAuth: "codeHintAuth",
    verifyTitle: "verifyTitle", verifyDesc: "verifyDesc", uploadTitle: "uploadTitle",
    setupTitle: "setupTitle", incomeLabel: "incomeLabel", expensesLabel: "expensesLabel",
    goalLabel: "goalLabel", goalNameLabel: "goalNameLabel", btnSaveSetup: "saveContinue",
    homeTitle: "homeTitle", homeSubtitle: "homeSubtitle",
    savedMonthLabel: "savedMonthLabel", ringSub: "ringSub",
    goalMiniLabel: "goalMiniLabel", remainingMiniLabel: "remainingMiniLabel",
    totalSavedMiniLabel: "totalSavedMiniLabel", entriesLabel: "entriesLabel",
    chartLabel: "chartLabel",
    streakLbl: "streakLbl", streakBestLbl: "streakBestLbl", txTotalLbl: "txTotalLbl",
    actionsTitle: "actionsTitle",
    addAmountLabel: "addAmountLabel", addNoteLabel: "addNoteLabel",
    btnAddAmount: "add", planTitle: "planTitle", txTitle: "txTitle",
    transactionEmpty: "txEmpty",
    walletTitle: "walletTitle", walletSub: "walletSub",
    savedTotalLabel: "savedTotalLabel", cardTitle: "cardTitle", cardDesc: "cardDesc",
    cardNameLabel: "cardNameLabel", cardStatusLabel: "cardStatusLabel",
    cardStatus: "active", cardNameInputLabel: "cardNameInputLabel",
    cardLast4Label: "cardLast4Label", btnSaveCard: "saveCard",
    friendsTitle: "friendsTitle", friendsDesc: "friendsDesc",
    btnRandomizeFriends: "refreshFriends", btnAddFriend: "addFriend",
    friendNameLabel: "friendNameLabel",
    settingsTitle: "settingsTitle", accountRow: "accountRow",
    privacyRow: "privacyRow", loginRow: "loginRow", loginRowValue: "loginRowValue",
    langLabel: "language",
    darkModeLabel: "darkModeLabel", darkModeSub: "darkModeSub",
    remindersTitle: "remindersTitle", remindersDesc: "remindersDesc",
    remindersOnLabel: "remindersEnabledLabel", remindersOnSub: "remindersEnabledSub",
    everyLabel: "everyLabel", timesHint: "timesHint",
    btnEnableNotifications: "enableBrowserNotifs",
    securityTitle: "securityTitle", btnLock: "lock",
    goalPlanTitle: "goalPlanTitle", goalEditLabel: "goalEditLabel",
    goalNameEditLabel: "goalNameEditLabel", incomeEditLabel: "incomeEditLabel",
    expensesEditLabel: "expensesEditLabel", btnSaveSettings: "save",
    navWalletTxt: "navWallet", navHomeTxt: "navHome", navSettingsTxt: "navSettings",
    howTitle: "howTitle"
  };

  Object.entries(ids).forEach(([elId, key]) => {
    const el = $(elId);
    if (!el) return;
    if (elId === "leftTitle") {
      // Preserve accent-word span for gradient text effect
      const text = t(key);
      const match = text.match(/^(.*?)(savings habit|taupymo iproti)(.*)$/i);
      if (match) {
        el.innerHTML = `${escapeHtml(match[1])}<span class="accent-word">${escapeHtml(match[2])}</span>${escapeHtml(match[3])}`;
      } else {
        el.textContent = text;
      }
    } else {
      el.textContent = t(key);
    }
  });

  const steps = t("howSteps");
  if (Array.isArray(steps)) {
    $("howSteps").innerHTML = steps.map(s => `<li>${escapeHtml(s)}</li>`).join("");
  }

  $("btnShowCode").textContent = state.ui.showCodeVisible ? t("hideCode") : t("showCode");
  document.documentElement.lang = state.ui.lang === "lt" ? "lt" : "en";
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

function bindEvents() {
  // Pickers
  $("btnLangPill").addEventListener("click", () => {
    $("everyPicker").classList.add("hidden");
    $("langPicker").classList.toggle("hidden");
  });
  $("btnEveryPill").addEventListener("click", () => {
    $("langPicker").classList.add("hidden");
    $("everyPicker").classList.toggle("hidden");
  });
  document.addEventListener("click", (e) => {
    if (!$("langPicker").contains(e.target) && !$("btnLangPill").contains(e.target))
      $("langPicker").classList.add("hidden");
    if (!$("everyPicker").contains(e.target) && !$("btnEveryPill").contains(e.target))
      $("everyPicker").classList.add("hidden");
  });

  // Auth
  $("btnGenerateCode").addEventListener("click", () => {
    $("unlockCodeInput").value = generateCode();
    toast(t("codeGenerated"));
  });
  $("btnStart").addEventListener("click", () => {
    const code = $("unlockCodeInput").value.trim();
    if (!code) { toast(t("enterCode")); return; }
    state.auth.unlockCode = code;
    save();
    if (!state.auth.verified) { toast(t("needVerify")); renderAuth(); return; }
    toast(t("signedIn"));
    showView("home");
    renderAll();
  });
  $("idUpload").addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    state.auth.verified    = true;
    state.auth.idFileName  = file.name;
    save();
    renderAuth();
    toast(t("docUploaded"));
  });
  $("btnSaveSetup").addEventListener("click", () => {
    state.profile.income      = parseNumber($("incomeInput").value);
    state.profile.expenses    = parseNumber($("expensesInput").value);
    state.profile.goalAmount  = parseNumber($("goalInput").value);
    state.profile.goalName    = $("goalNameInput").value.trim();
    save();
    renderAll();
    toast(t("savedSettings"));
    if (isReadyToEnterApp()) showView("home");
  });

  // Quick-add presets
  document.querySelectorAll(".btn-quick").forEach(btn => {
    btn.addEventListener("click", () => {
      const v = btn.getAttribute("data-quick");
      $("addAmountInput").value = v;
      $("addAmountInput").focus();
    });
  });

  // Add savings
  $("btnAddAmount").addEventListener("click", () => {
    const amt  = parseNumber($("addAmountInput").value);
    if (amt <= 0) { toast(t("enterPositive")); return; }

    const note = $("addNoteInput").value.trim();
    state.savings.savedTotal       = (Number(state.savings.savedTotal)      || 0) + amt;
    state.savings.savedThisMonth   = (Number(state.savings.savedThisMonth)  || 0) + amt;

    if (!Array.isArray(state.transactions)) state.transactions = [];
    state.transactions.unshift({ id: Date.now(), amount: amt, date: new Date().toISOString(), note });
    if (state.transactions.length > 50) state.transactions = state.transactions.slice(0, 50);

    updateMonthHistory(amt);
    updateStreak();

    $("addAmountInput").value = "";
    $("addNoteInput").value   = "";
    save();
    renderHome();
    renderWallet();

    const goal  = Number(state.profile.goalAmount) || 0;
    const total = Number(state.savings.savedTotal)  || 0;

    if (goal > 0 && total >= goal) {
      toast(t("goalReached"), 3000);
    } else {
      // Streak milestone toasts
      const sc = state.streak.current;
      if ([5, 10, 20, 30, 50, 100].includes(sc)) {
        toast(t("streakMilestone")(sc), 3000);
      } else {
        toast(t("added"));
      }
    }
  });

  // Show all transactions toggle
  $("btnShowAllTx").addEventListener("click", () => {
    state.ui.showAllTx = !state.ui.showAllTx;
    save();
    renderTransactions();
  });

  // Notifications
  $("btnEnableNotifications").addEventListener("click", async () => {
    if (!("Notification" in window)) { toast(t("notifsUnsupported")); return; }
    const perm = await Notification.requestPermission();
    state.ui.notifEnabled = perm === "granted";
    save();
    renderNotifBadge();
    renderReminderSettingsUI();
    toast(state.ui.notifEnabled ? t("notifsEnabled") : t("notifsDenied"));
  });
  $("remindersEnabled").addEventListener("change", (e) => {
    const enabled = e.target.checked;
    if (enabled && !state.ui.notifEnabled) {
      toast(t("notifsDenied"));
      e.target.checked = false;
      state.reminders.enabled = false;
      save(); renderReminderSettingsUI(); return;
    }
    state.reminders.enabled = enabled;
    if (enabled && !state.reminders.anchorTs) state.reminders.anchorTs = Date.now();
    save(); renderReminderSettingsUI();
  });

  // Dark mode toggle
  $("darkModeToggle").addEventListener("change", (e) => {
    state.ui.darkMode = e.target.checked;
    save();
    applyDarkMode();
  });

  // Card
  $("btnSaveCard").addEventListener("click", () => {
    const name  = $("cardNameInput").value.trim();
    const last4 = $("cardLast4Input").value.trim();
    if (name) state.card.name = name;
    if (/^\d{4}$/.test(last4)) state.card.last4 = last4;
    $("cardNameInput").value  = "";
    $("cardLast4Input").value = "";
    save(); renderWallet(); toast(t("savedOk"));
  });

  // Friends
  $("btnAddFriend").addEventListener("click", () => {
    $("friendAddForm").classList.remove("hidden");
    $("friendActions").style.display = "none";
    $("friendNameInput").focus();
  });
  $("btnConfirmAddFriend").addEventListener("click", () => {
    const name = $("friendNameInput").value.trim();
    if (!name) { toast(t("enterFriendName")); return; }
    state.friends.push({ name, savedThisMonth: Math.round(Math.random() * 80) });
    $("friendNameInput").value = "";
    $("friendAddForm").classList.add("hidden");
    $("friendActions").style.display = "";
    save(); renderLeaderboard(); toast(t("friendAdded"));
  });
  $("btnCancelAddFriend").addEventListener("click", () => {
    $("friendNameInput").value = "";
    $("friendAddForm").classList.add("hidden");
    $("friendActions").style.display = "";
  });
  $("btnRandomizeFriends").addEventListener("click", () => {
    state.friends = state.friends.map(f => ({
      ...f, savedThisMonth: Math.max(0, Math.round(f.savedThisMonth + (Math.random() * 30 - 10)))
    }));
    save(); renderLeaderboard(); toast(t("friendsUpdated"));
  });

  // Security
  $("btnShowCode").addEventListener("click", () => {
    state.ui.showCodeVisible = !state.ui.showCodeVisible;
    if (!state.auth.unlockCode) {
      $("codeHint").textContent = t("noCodeSet");
      state.ui.showCodeVisible = false;
    } else {
      $("codeHint").textContent = state.ui.showCodeVisible
        ? `${t("codeLabel")}: ${state.auth.unlockCode}` : "—";
    }
    save();
    $("btnShowCode").textContent = state.ui.showCodeVisible ? t("hideCode") : t("showCode");
  });
  $("btnLock").addEventListener("click", () => {
    state.ui.activeView      = "auth";
    state.ui.showCodeVisible = false;
    save(); toast(t("locked")); showView("auth");
  });

  // Settings save
  $("btnSaveSettings").addEventListener("click", () => {
    state.profile.goalAmount = parseNumber($("goalEditInput").value);
    state.profile.goalName   = $("goalNameEditInput").value.trim();
    state.profile.income     = parseNumber($("incomeEditInput").value);
    state.profile.expenses   = parseNumber($("expensesEditInput").value);
    save();
    $("settingsSavedNote").textContent = t("savedOk");
    renderHome(); renderWallet(); toast(t("savedOk"));
  });

  // Settings item stubs
  $("btnAccount").addEventListener("click",      () => toast(state.ui.lang === "lt" ? "Paskyros ekranas — netrukus" : "Account screen — coming soon"));
  $("btnPrivacy").addEventListener("click",      () => toast(state.ui.lang === "lt" ? "Privatumo politika — netrukus" : "Privacy policy — coming soon"));
  $("btnLoginMethods").addEventListener("click", () => toast(state.ui.lang === "lt" ? "Prisijungimo budas: kodas" : "Login method: code"));

  // Nav
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-nav");
      if (!isReadyToEnterApp()) { toast(t("mustLogin")); showView("auth"); return; }
      showView(target);
    });
  });

  // Export
  $("btnExport").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = "saveupnow-export.json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast(t("exportDone"));
  });

  // Reset
  $("btnReset").addEventListener("click", () => {
    const msg = state.ui.lang === "lt" ? "Tikrai istrinti visus duomenis?" : "Clear all saved data?";
    if (!confirm(msg)) return;
    localStorage.removeItem(STORAGE_KEY);
    state = load();
    save();
    applyDarkMode();
    toast(t("resetDone"));
    renderAll();
  });
}

// ---------------------------------------------------------------------------
// Render all
// ---------------------------------------------------------------------------

function renderAll() {
  applyLanguageToStaticText();
  applyDarkMode();
  renderAuth();
  renderHome();
  renderWallet();
  renderLanguagePickerUI();
  renderReminderSettingsUI();
  renderNotifBadge();

  $("goalEditInput").value    = state.profile.goalAmount || "";
  $("goalNameEditInput").value = state.profile.goalName  || "";
  $("incomeEditInput").value  = state.profile.income     || "";
  $("expensesEditInput").value = state.profile.expenses  || "";
  $("settingsSavedNote").textContent = "";
  $("codeHint").textContent = "—";

  if (isReadyToEnterApp()) {
    showView(state.ui.activeView === "auth" ? "home" : state.ui.activeView);
  } else {
    showView("auth");
  }
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Scroll animations
// ---------------------------------------------------------------------------

function initScrollAnimations() {
  const els = document.querySelectorAll("[data-animate]");
  if (!els.length) return;

  // Stagger siblings inside the same parent
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
  });
}

function main() {
  state = load();

  if ("Notification" in window && Notification.permission === "granted") {
    state.ui.notifEnabled = true;
    save();
  }

  bindEvents();
  renderAll();
  initScrollAnimations();

  setInterval(tickScheduledReminders, 1000);
}

main();
