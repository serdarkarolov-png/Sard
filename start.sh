#!/bin/bash

# Ranglı output uchun
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  🚀 SmartInventory Dasturini Ishga Tushirish${NC}"
echo -e "${BLUE}========================================${NC}"

# Docker o'rnatilganligini tekshirish
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker o'rnatilmagan!${NC}"
    echo -e "${YELLOW}Docker yuklab oling: https://www.docker.com/products/docker-desktop${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker topildi${NC}"

# Docker Compose o'rnatilganligini tekshirish
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose o'rnatilmagan!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker Compose topildi${NC}"

# .env faylini yaratish
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 .env fayli yaratilmoqda...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  .env faylida OPENAI_API_KEY'ni o'rnatish kerak!${NC}"
    echo -e "${YELLOW}   https://platform.openai.com/api-keys${NC}"
fi

echo -e "${BLUE}\n🔨 Docker image'larni build qilmoqda... (Bu 1-2 minut vaqt olishi mumkin)${NC}\n"

# Docker compose'ni ishga tushirish
docker-compose up --build

echo -e "${GREEN}\n✅ Barcha tayyor!${NC}"
echo -e "${BLUE}\nBrowser'da oching:${NC}"
echo -e "${GREEN}  Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}  Backend API: http://localhost:8000${NC}"
echo -e "${GREEN}  API Docs: http://localhost:8000/docs${NC}"
