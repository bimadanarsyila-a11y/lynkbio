# Deploy Lynkbio ke Vercel — Step by Step Guide
**Date:** 2026-08-24  
**Repository:** https://github.com/bimadanarsyila-a11y/lynkbio  
**Status:** ✅ Ready to Deploy  

---

## ✅ Preparation Complete

### Files Ready:
- ✅ vercel.json configuration added
- ✅ Production build tested (dist/)
- ✅ All code pushed to GitHub
- ✅ Firebase config ready

---

## 🚀 **CARA DEPLOY KE VERCEL**

### **Step 1: Buka Vercel**

Klik link ini:
```
🔗 https://vercel.com/new
```

Atau manual:
1. Buka: https://vercel.com
2. Click "Sign Up" atau "Log In"
3. **Sign in dengan GitHub** (recommended)

---

### **Step 2: Import Repository**

Setelah login:

1. Click "Add New..." → "Project"
2. Atau langsung: https://vercel.com/new

3. **Import Git Repository:**
   - Cari: `bimadanarsyila-a11y/lynkbio`
   - Atau paste URL: `https://github.com/bimadanarsyila-a11y/lynkbio`
   - Click "Import"

---

### **Step 3: Configure Project**

Vercel akan auto-detect settings:

```
Project Name: lynkbio
Framework Preset: Vite (auto-detected ✅)
Root Directory: ./ (default ✅)
Build Command: npm run build (auto ✅)
Output Directory: dist (auto ✅)
Install Command: npm install (auto ✅)
```

**Bos tinggal biarkan default, sudah benar semua!**

---

### **Step 4: Environment Variables (PENTING!)**

Kalau Lynkbio pakai Firebase credentials dari .env:

1. Scroll ke "Environment Variables"
2. Click "Add"
3. Tambahkan variable dari file `/home/ubuntu/lynkbio/.env.example`:

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
VITE_FIREBASE_MEASUREMENT_ID=xxx
```

**Kalau gak ada .env, skip step ini (Firebase config mungkin sudah hardcoded).**

---

### **Step 5: Deploy!**

1. Click **"Deploy"** button (besar, hijau)
2. Wait 2-3 menit
3. Vercel akan:
   - ✅ Clone repository
   - ✅ Install dependencies (npm install)
   - ✅ Build production (npm run build)
   - ✅ Deploy ke CDN global
   - ✅ Setup SSL/HTTPS otomatis

---

### **Step 6: Get Production URL**

Setelah deploy selesai, Bos akan dapat:

```
✅ Production URL:
   https://lynkbio.vercel.app
   
✅ atau:
   https://lynkbio-xxxxx.vercel.app
```

**Copy URL ini dan test!**

---

## 🌐 **After Deploy: Setup Custom Domain (Optional)**

Kalau Bos punya domain sendiri (misal: `lynkbio.com`):

### **Di Vercel Dashboard:**

1. Buka project: https://vercel.com/dashboard
2. Click "lynkbio" project
3. Tab "Settings" → "Domains"
4. Click "Add"
5. Masukkan domain: `lynkbio.com`
6. Vercel akan kasih DNS records

### **Di Domain Provider (Namecheap/GoDaddy/dll):**

Tambahkan DNS records dari Vercel:

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

Wait 5-30 menit, domain ready dengan SSL otomatis!

---

## 🔄 **Auto-Deploy untuk Update Selanjutnya**

Setelah deploy pertama kali, setiap `git push` akan otomatis deploy!

```bash
# Di laptop/VPS:
cd /home/ubuntu/lynkbio
git add .
git commit -m "update: fitur baru"
git push

# Vercel otomatis:
# ✅ Detect git push
# ✅ Build production
# ✅ Deploy ke CDN
# ✅ Update live dalam 2 menit
```

**Gak perlu login Vercel lagi!**

---

## 📊 **Check Deployment Status**

### **Di Vercel Dashboard:**

1. https://vercel.com/dashboard
2. Click project "lynkbio"
3. Tab "Deployments" → lihat history
4. Tab "Analytics" → lihat traffic
5. Tab "Logs" → lihat build logs

---

## ✅ **Verification Checklist**

Setelah deploy, test ini:

### **Basic:**
- [ ] Production URL accessible (https://lynkbio.vercel.app)
- [ ] HTTPS/SSL working (padlock icon)
- [ ] Landing page load
- [ ] Images load
- [ ] No console errors

### **Features:**
- [ ] Sign up form works
- [ ] Firebase auth works
- [ ] Demo presets interactive
- [ ] Studio editor accessible
- [ ] Links tab works
- [ ] Appearance tab works
- [ ] Public bio page renders

### **Performance:**
- [ ] First load < 3 seconds
- [ ] Page transitions smooth
- [ ] Mobile responsive
- [ ] No broken links

---

## 🔧 **Troubleshooting**

### **Build Failed:**

Check Vercel logs:
1. Vercel dashboard → Deployments
2. Click failed deployment
3. Tab "Build Logs"
4. Lihat error message

Common fixes:
```bash
# Missing dependencies
npm install --legacy-peer-deps

# Build errors
npm run build
# Fix errors di local dulu
```

### **Firebase Not Working:**

1. Check environment variables di Vercel
2. Settings → Environment Variables
3. Pastikan semua VITE_FIREBASE_* ada
4. Redeploy

### **404 on Routes:**

- ✅ vercel.json sudah ada (rewrites configured)
- Kalau masih 404, contact Miyu

---

## 🎯 **Expected Result**

**Before (VPS):**
```
URL: http://43.134.120.127:3000
SSL: ❌ No HTTPS
CDN: ❌ Single location
Deploy: Manual (SSH, build, restart)
```

**After (Vercel):**
```
URL: https://lynkbio.vercel.app ✅
SSL: ✅ HTTPS otomatis
CDN: ✅ Global (100+ locations)
Deploy: ✅ Auto git push
Speed: ✅ Loading < 1s globally
```

---

## 📞 **Quick Commands Summary**

### **Deploy via Vercel Web UI:**
```
1. https://vercel.com/new
2. Import: bimadanarsyila-a11y/lynkbio
3. Click Deploy
4. Done!
```

### **Future Updates:**
```bash
cd /home/ubuntu/lynkbio
# Edit files...
git add .
git commit -m "update: ..."
git push
# ✅ Auto-deploy to Vercel!
```

---

## 💡 **Pro Tips**

### **1. Preview Deployments:**
- Setiap branch dapat preview URL
- Test before merge to main

### **2. Rollback:**
- Vercel dashboard → Deployments
- Click old deployment → "Promote to Production"
- Instant rollback!

### **3. Analytics:**
- Vercel dashboard → Analytics
- Lihat traffic, page views, top pages

### **4. Custom Domain:**
- Free SSL otomatis
- DNS setup mudah

---

## 🎉 **Summary**

**Repository:** ✅ https://github.com/bimadanarsyila-a11y/lynkbio  
**Config:** ✅ vercel.json ready  
**Build:** ✅ Tested  

**Next:**
1. Bos buka: https://vercel.com/new
2. Import repository
3. Click Deploy
4. Done dalam 3 menit!

**Miyu standby kalau ada trouble!** 🚀😊

---

**End of Vercel Deployment Guide**
