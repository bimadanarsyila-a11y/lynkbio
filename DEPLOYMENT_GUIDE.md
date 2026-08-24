# Lynkbio - Push & Deploy Guide
**Date:** 2026-08-24  
**Project:** Lynkbio UI Redesign  
**Repository:** https://github.com/bimadanarsyila-a11y/lynkbio.git  

---

## 🚀 Step 1: Push ke GitHub

### Current Status
```
✅ Git commit berhasil: f9ce5f8
✅ Branch: main
⚠️ Belum ter-push ke GitHub (butuh credentials)
```

### Option A: Push dengan Personal Access Token (PAT) — RECOMMENDED

#### 1. Generate GitHub Token
1. Buka: https://github.com/settings/tokens
2. Click "Generate new token" → "Classic"
3. Nama: `lynkbio-deploy`
4. Centang: `repo` (full control)
5. Generate & copy token

#### 2. Push dengan Token
```bash
cd /home/ubuntu/lynkbio

# Push dengan token (replace YOUR_TOKEN)
git push https://YOUR_TOKEN@github.com/bimadanarsyila-a11y/lynkbio.git main

# Atau save credentials:
git config credential.helper store
git push
# Username: bimadanarsyila-a11y
# Password: YOUR_TOKEN (paste token, bukan password)
```

---

### Option B: SSH Key (Satu kali setup)

```bash
# 1. Generate SSH key
ssh-keygen -t ed25519 -C "bimadanarsyila@gmail.com" -f ~/.ssh/id_ed25519_github
# Press Enter 3x (no passphrase)

# 2. Copy public key
cat ~/.ssh/id_ed25519_github.pub

# 3. Add ke GitHub
# - Buka: https://github.com/settings/keys
# - Click "New SSH key"
# - Title: "Ubuntu VPS Lynkbio"
# - Paste public key
# - Save

# 4. Test koneksi
ssh -T git@github.com

# 5. Change remote ke SSH & push
cd /home/ubuntu/lynkbio
git remote set-url origin git@github.com:bimadanarsyila-a11y/lynkbio.git
git push
```

---

## 🌐 Step 2: Deploy ke Firebase Hosting

### Prerequisites
Project sudah pakai Firebase, tinggal deploy.

### 1. Install Firebase CLI
```bash
# Check apakah sudah installed
firebase --version

# Kalau belum, install:
npm install -g firebase-tools
```

### 2. Login ke Firebase
```bash
firebase login --no-localhost

# Akan muncul URL, buka di browser
# Login dengan akun Google Bos
# Copy kode autentikasi, paste ke terminal
```

### 3. Build Production
```bash
cd /home/ubuntu/lynkbio

# Build untuk production
npm run build

# Cek hasil build
ls -lh dist/
```

### 4. Deploy ke Firebase Hosting
```bash
# Init Firebase (kalau belum setup)
firebase init hosting
# - Select Firebase project
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No

# Deploy
firebase deploy --only hosting

# Akan dapat URL:
# https://lynkbio-xxxxx.web.app
# https://lynkbio-xxxxx.firebaseapp.com
```

---

## 🎯 Alternative: Deploy ke Vercel (Lebih Mudah)

Vercel lebih cepat untuk React/Vite projects.

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy
```bash
cd /home/ubuntu/lynkbio

# Login & deploy (satu command)
vercel

# Ikuti prompt:
# - Set up and deploy: Yes
# - Project name: lynkbio
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist

# Akan dapat URL production:
# https://lynkbio.vercel.app
```

### 3. Link ke Domain Custom (Optional)
```bash
vercel --prod

# Setup domain di Vercel dashboard:
# https://vercel.com/dashboard
```

---

## 🎯 Alternative: Deploy ke Netlify

### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Deploy
```bash
cd /home/ubuntu/lynkbio

# Build
npm run build

# Login & deploy
netlify login
netlify deploy --prod --dir=dist

# Akan dapat URL:
# https://lynkbio.netlify.app
```

---

## 📋 Quick Commands Summary

### Push ke GitHub (with token)
```bash
cd /home/ubuntu/lynkbio
git push https://YOUR_TOKEN@github.com/bimadanarsyila-a11y/lynkbio.git main
```

### Deploy ke Firebase
```bash
cd /home/ubuntu/lynkbio
npm run build
firebase login --no-localhost
firebase deploy --only hosting
```

### Deploy ke Vercel (EASIEST)
```bash
cd /home/ubuntu/lynkbio
npm install -g vercel
vercel
```

---

## ⚠️ Environment Variables

Sebelum deploy, pastikan Firebase credentials aman:

### 1. Cek .env file
```bash
cd /home/ubuntu/lynkbio
ls -la | grep env
```

### 2. Firebase credentials
```bash
# Jangan commit credentials ke git!
# Tambahkan ke .gitignore kalau belum:
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### 3. Setup environment di hosting platform
- **Vercel:** Settings → Environment Variables
- **Netlify:** Site settings → Environment variables
- **Firebase:** firebase.json config atau Remote Config

---

## ✅ Verification After Deploy

### 1. Test Production URL
```bash
# Firebase
curl -I https://lynkbio-xxxxx.web.app

# Vercel
curl -I https://lynkbio.vercel.app

# Netlify
curl -I https://lynkbio.netlify.app
```

### 2. Check Features
- ✅ Landing page loads
- ✅ Firebase auth works
- ✅ Themes apply correctly
- ✅ Links clickable
- ✅ Analytics tracking
- ✅ Mobile responsive

---

## 🎯 Recommended Flow

**Untuk Bos Panji, saya recommend:**

### Step 1: Push ke GitHub dengan Token
```bash
# Generate token di: https://github.com/settings/tokens
cd /home/ubuntu/lynkbio
git push https://YOUR_TOKEN@github.com/bimadanarsyila-a11y/lynkbio.git main
```

### Step 2: Deploy ke Vercel (Paling Mudah)
```bash
npm install -g vercel
vercel
# Ikuti prompt, done dalam 2 menit!
```

### Step 3: Share URL
```
GitHub: https://github.com/bimadanarsyila-a11y/lynkbio
Production: https://lynkbio.vercel.app (atau URL yang didapat)
```

---

## 📞 Need Help?

Kalau ada masalah:
1. Check error message
2. Pastikan token/credentials valid
3. Cek build success dulu (`npm run build`)
4. Test local preview (`npm run preview`)

---

**Bos tinggal pilih mau pakai yang mana, saya bantu eksekusi!** 🚀

1. **GitHub Token** — Bos generate, saya push
2. **SSH Key** — Saya setup, Bos add ke GitHub
3. **Deploy Platform** — Vercel (easiest) / Firebase / Netlify

**Mana yang Bos pilih?** 😊
