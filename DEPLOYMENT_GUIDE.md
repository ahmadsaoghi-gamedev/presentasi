# 🚀 Panduan Deploy ke GitHub dengan API yang Aman

## 📋 **PILIHAN DEPLOY**

### **Opsi 1: GitHub Pages (Gratis)**

- ✅ Gratis selamanya
- ✅ Custom domain support
- ✅ HTTPS otomatis
- ❌ Tidak support environment variables
- ❌ API key harus di-hardcode (tidak aman)

### **Opsi 2: Vercel (Recommended)**

- ✅ Gratis dengan limit
- ✅ Environment variables support
- ✅ API key aman
- ✅ Auto-deploy dari GitHub
- ✅ Custom domain

### **Opsi 3: Netlify**

- ✅ Gratis dengan limit
- ✅ Environment variables support
- ✅ API key aman
- ✅ Auto-deploy dari GitHub

## 🔐 **KONFIGURASI API KEY YANG AMAN**

### **Untuk Vercel:**

1. **Buat akun Vercel** di [vercel.com](https://vercel.com)

2. **Connect GitHub repository** ke Vercel

3. **Set Environment Variables:**

   ```bash
   # Di dashboard Vercel, go to Settings > Environment Variables
   GEMINI_API_KEY = your_actual_api_key_here
   ```

4. **Deploy otomatis** - setiap push ke GitHub akan auto-deploy

### **Untuk Netlify:**

1. **Buat akun Netlify** di [netlify.com](https://netlify.com)

2. **Connect GitHub repository** ke Netlify

3. **Set Environment Variables:**

   ```bash
   # Di dashboard Netlify, go to Site Settings > Environment Variables
   GEMINI_API_KEY = your_actual_api_key_here
   ```

4. **Deploy otomatis** - setiap push ke GitHub akan auto-deploy

## 📁 **STRUKTUR FILE YANG SUDAH DISIAPKAN**

```
presentasi/
├── index.html          # File utama
├── script.js           # JavaScript dengan API integration
├── styles.css          # CSS styling
├── config.js           # Konfigurasi environment variables
├── vercel.json         # Konfigurasi Vercel
├── .github/workflows/  # GitHub Actions
├── .gitignore          # File yang diabaikan Git
├── SECURITY.md         # Dokumentasi keamanan
└── env.example         # Contoh environment variables
```

## 🛠️ **LANGKAH DEPLOY**

### **1. Persiapan Repository**

```bash
# Clone repository
git clone https://github.com/username/presentasi.git
cd presentasi

# Add semua file
git add .

# Commit perubahan
git commit -m "Add secure API integration with environment variables"

# Push ke GitHub
git push origin main
```

### **2. Deploy ke Vercel (Recommended)**

1. **Buka [vercel.com](https://vercel.com)**
2. **Login dengan GitHub**
3. **Click "New Project"**
4. **Import repository** dari GitHub
5. **Set Environment Variables:**
   - `GEMINI_API_KEY` = `your_actual_api_key`
6. **Click "Deploy"**

### **3. Deploy ke Netlify**

1. **Buka [netlify.com](https://netlify.com)**
2. **Login dengan GitHub**
3. **Click "New site from Git"**
4. **Choose GitHub** dan select repository
5. **Set Environment Variables:**
   - `GEMINI_API_KEY` = `your_actual_api_key`
6. **Click "Deploy site"**

## 🔧 **KONFIGURASI API KEY**

### **Cara Mendapatkan Gemini API Key:**

1. **Buka [Google AI Studio](https://aistudio.google.com)**
2. **Login dengan Google account**
3. **Click "Get API Key"**
4. **Create new API key**
5. **Copy API key**

### **Set Environment Variable:**

```bash
# Di Vercel Dashboard
GEMINI_API_KEY = AIzaSy...your_actual_key_here

# Di Netlify Dashboard
GEMINI_API_KEY = AIzaSy...your_actual_key_here
```

## ✅ **FITUR KEAMANAN YANG SUDAH DITERAPKAN**

1. **API Key tidak ter-expose** di source code
2. **Environment variables** untuk konfigurasi aman
3. **Fallback system** jika API tidak tersedia
4. **Input validation** untuk semua user input
5. **HTTPS only** untuk semua external resources
6. **XSS protection** melalui proper escaping

## 🚨 **TROUBLESHOOTING**

### **API tidak bekerja:**

- ✅ Check environment variable sudah di-set
- ✅ Check API key valid
- ✅ Check network connection
- ✅ Aplikasi akan otomatis menggunakan fallback messages

### **Deploy gagal:**

- ✅ Check file .gitignore
- ✅ Check semua file sudah di-commit
- ✅ Check environment variables sudah di-set
- ✅ Check build logs di dashboard

### **API key ter-expose:**

- ❌ **JANGAN** commit file .env
- ❌ **JANGAN** hardcode API key di source code
- ✅ Gunakan environment variables
- ✅ Check file .gitignore

## 📊 **MONITORING**

### **Vercel:**

- Dashboard Vercel > Analytics
- Real-time logs
- Performance metrics

### **Netlify:**

- Dashboard Netlify > Analytics
- Real-time logs
- Performance metrics

## 🔄 **AUTO-DEPLOY**

Setelah setup, setiap kali Anda:

1. **Push ke GitHub** → Auto-deploy ke Vercel/Netlify
2. **Update environment variables** → Restart deployment
3. **Merge pull request** → Auto-deploy

## 🎉 **HASIL AKHIR**

- ✅ **Aplikasi online** dengan URL custom
- ✅ **API bekerja** dengan environment variables
- ✅ **Aman** - tidak ada API key ter-expose
- ✅ **Auto-deploy** dari GitHub
- ✅ **HTTPS** otomatis
- ✅ **Custom domain** (optional)

## 📞 **SUPPORT**

Jika ada masalah:

1. Check dokumentasi platform (Vercel/Netlify)
2. Check GitHub Issues
3. Check environment variables
4. Check build logs

---

**Selamat! Aplikasi Anda sekarang aman dan siap production! 🚀**
