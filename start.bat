@echo off
setlocal
set "ROOT=%~dp0"

echo.
echo  SaveUpNow — Production mode
echo  =============================
echo  Backend serves the built frontend.
echo  Visit: http://localhost:8000
echo.

cd /d "%ROOT%backend"
start "" "http://localhost:8000"
python -m uvicorn main:app --host 0.0.0.0 --port 8000
