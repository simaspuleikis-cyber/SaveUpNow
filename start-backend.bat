@echo off
title SaveUpNow — Backend (FastAPI)
cd /d "%~dp0backend"

:: Try common Python commands
where py >nul 2>&1 && (
    py -3 -m pip install -r requirements.txt
    py -3 -m uvicorn main:app --reload --port 8000
    goto done
)
where python3 >nul 2>&1 && (
    python3 -m pip install -r requirements.txt
    python3 -m uvicorn main:app --reload --port 8000
    goto done
)
where python >nul 2>&1 && (
    python -m pip install -r requirements.txt
    python -m uvicorn main:app --reload --port 8000
    goto done
)

echo ERROR: Python not found.
echo Please install Python 3.10+ from https://www.python.org/downloads/
echo Make sure to check "Add Python to PATH" during installation.
pause
:done
pause
