# 🚀 SmartInventory - Tez Boshlash

## ⚡ 30 Sekundga Boshlash

### **Windows Uchun:**
```bash
start.bat
```

### **Mac/Linux Uchun:**
```bash
chmod +x start.sh
./start.sh
```

---

## 📋 Talab Qiladigan Narsalar

✅ **Docker** - [Yuklab oling](https://www.docker.com/products/docker-desktop)  
✅ **OpenAI API Kaliti** - [Oling](https://platform.openai.com/api-keys)  
✅ **Internet ulanish**

---

## 🔑 OpenAI API Kalitini O'rnatish

1. **Yuqoridagi scriptni jarangizdan keyin** `.env` fayli yaratiladi
2. `.env` faylini ilovada oching (text editor bilan)
3. Quyidagini qo'shing:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

4. Saqlang va qayta ishga tushiring

---

## 🌐 Browser'da Oching

Scriptdan keyin:

| Qism | URL |
|------|-----|
| **Frontend (Sayt)** | http://localhost:3000 |
| **Backend API** | http://localhost:8000 |
| **API Dokumentatsiya** | http://localhost:8000/docs |

---

## 🧪 Test Qilish

1. **Dashboard**'ga kiring
2. **➕ Mahsulot qo'shish**'ni bosing
3. Test ma'lumotni qo'shing:
   - Nomi: "Paxta"
   - Miqdori: 100
   - Narxi: 50000
   - Kategoriya: "Xomashyo"
4. **📊 Narx Yangilash**'da narx kiritib, AI tahlilini ko'ring
5. **🤖 AI Maslahatchi**'ga savol bering

---

## ❌ Agar Xato Bo'lsa

### Docker port already in use
```bash
# Port o'chiring (macOS/Linux)
lsof -i :3000
kill -9 <PID>

# yoki port'ni o'zgartiring docker-compose.yml'da
ports:
  - "3001:3000"  # 3000 o'rniga 3001
```

### OpenAI API xatosi
- API kalitingiz to'g'ri ekanligini tekshiring
- API account'da pul borligini tekshiring
- https://status.openai.com/'ni tekshiring

### Container ishlamayotgan bo'lsa
```bash
# Barcha containerlarni to'xtating
docker-compose down

# Qayta ishga tushiring
docker-compose up --build
```

---

## 📚 Foydalanish

### Dashboard
- Ombarning umumiy statistikasini ko'ring
- Mahsulotlar bo'yicha qiymat taqsimotini grafiklarda ko'ring
- Jami qiymatni real-time kuzating

### Mahsulot Qo'shish
- Ombarning barcha mahsulotlarini qo'shing
- Har bir mahsulot avtomatik token'ga aylanadi
- Tarix saqlanadi

### Narx Yangilash
- Bozar narxini kiritib, AI tahlilni oling
- Risk darajasini bilish
- Tavsiyalarni o'qish

### AI Maslahatchi
- Tadbirkorlik savollaring uchun javob oling
- Uzbek tilida gapiradi
- Ombar ma'lumotlariga qarab maslahat beradi

---

## 🎓 Hakatonda Foydalanish

Bu loyiha Jizzakh AI Hakaton uchun:
- ✅ MVP tayyor
- ✅ Real muammo hal
- ✅ AI integrasiyasi
- ✅ Uzbek tilida

---

## 📞 Yordam

Xato bo'lsa:
1. Terminal'ni qayta oching
2. `./start.sh` qayta jarangiz
3. 5 minut kuting (build vaqti)
4. Browser refresh qiling

**Boshqa savol bo'lsa gapirib ber!** 🚀
