@echo off
setlocal
set "ROOT=%~dp0"

echo.
echo  SaveUpNow — Build Desktop App
echo  ================================
echo.

echo [1/2] Building frontend...
cd /d "%ROOT%frontend"
npm run build
if errorlevel 1 ( echo Build failed. & pause & exit /b 1 )

echo.
echo [2/2] Packaging Electron app...
cd /d "%ROOT%"
set CSC_IDENTITY_AUTO_DISCOVERY=false
npx electron-builder --win portable
if errorlevel 1 ( echo Package failed. & pause & exit /b 1 )

echo.
echo  Done!  Your app is at:  app-dist\SaveUpNow.exe
echo.
copy /Y "app-dist\SaveUpNow.exe" "%USERPROFILE%\Desktop\SaveUpNow.exe" >nul
echo  Also copied to your Desktop.
echo.
pause
