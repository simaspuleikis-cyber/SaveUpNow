@echo off
setlocal
set "ROOT=%~dp0"

echo.
echo  SaveUpNow — Development mode (hot-reload)
echo  ===========================================
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:5173  (open this one)
echo.

start cmd /k "title SaveUpNow Backend && cd /d %ROOT%backend && python -m uvicorn main:app --reload"
timeout /t 1 /nobreak >nul
start cmd /k "title SaveUpNow Frontend && cd /d %ROOT%frontend && npm run dev"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"
