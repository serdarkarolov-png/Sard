@echo off
REM Windows uchun script

echo.
echo ========================================
echo   SmartInventory Dasturini Ishga Tushirish
echo ========================================
echo.

REM Docker tekshirish
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker o'rnatilmagan!
    echo Docker yuklab oling: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo [OK] Docker topildi

REM .env yaratish
if not exist .env (
    echo [INFO] .env fayli yaratilmoqda...
    copy .env.example .env
    echo [WARNING] .env faylida OPENAI_API_KEY'ni o'rnatish kerak!
)

echo.
echo [INFO] Docker image'larni build qilmoqda... (1-2 minut vaqt olishi mumkin)
echo.

REM Docker compose'ni ishga tushirish
docker-compose up --build

echo.
echo [SUCCESS] Barcha tayyor!
echo.
echo Browser'da oching:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
pause
