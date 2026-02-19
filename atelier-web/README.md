# 🎀 Keyword Atelier — Web App
### Deploy to Vercel in 10 minutes. Open on iPhone. Add to Home Screen. Done.

---

## ✦ Deploy in 3 Steps

### Step 1 — Push to GitHub
1. Go to [github.com](https://github.com) → click **New repository**
2. Name it `pinduoduo-atelier` → click **Create repository**
3. On your computer, open Terminal in this folder and run:

```bash
git init
git add .
git commit -m "✦ Initial commit — Keyword Atelier"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pinduoduo-atelier.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **Sign up with GitHub** (free)
2. Click **Add New Project**
3. Import your `pinduoduo-atelier` repository
4. Click **Deploy** — that's it! ✦

Vercel will give you a URL like: `https://pinduoduo-atelier.vercel.app`

### Step 3 — Install on your iPhone 📱
1. Open your Vercel URL in **Safari** on your iPhone
2. Tap the **Share button** (the box with an arrow ↑)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it **"Atelier"** → tap **Add**

It now lives on your home screen like a real app — with its own icon! ✨

---

## ✦ Features

- 👗 **Fashion** — 25 clothing types × 22 aesthetic styles
- 🏡 **Home** — rooms + items + home styles
- ✨ **Characters** — Disney, Pixar, Sanrio
- 🎨 **26 color swatches** — visual selector
- 🔗 **Open in 拼多多** — taps straight to Pinduoduo search
- ♥ **Wishlist** — saves to your device locally
- ↑ **Share** — native iOS Share Sheet
- 📱 **PWA** — installs to home screen, works offline

---

## ✦ Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## ✦ Adding Keywords

Edit `lib/keywords.ts`:
1. Add the English term to the right group array
2. Add Chinese translation to `KEY_MAP`

```typescript
KEY_MAP['Trench Coat'] = '风衣外套'
```

---

*Made with ✦ for shopping on 拼多多 in style*
