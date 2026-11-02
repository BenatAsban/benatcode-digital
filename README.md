# BenatCode — Digital Products & Software Solutions Storefront

> Production-grade personal developer portfolio and digital product management platform by **Benat Asban S**. Designed for high performance, modern typography, mobile-first responsiveness, and unified catalog management across **SuperProfile** (India / UPI) and **Payhip** (Global / PayPal & Cards).

---

## 🚀 Live Demo & Brand Information

- **Founder & Developer:** Benat Asban S
- **Brand:** BenatCode
- **Location:** Madurai, Tamil Nadu, India
- **WhatsApp:** [+91 84283 41029](https://wa.me/918428341029)
- **Email:** [benatasban@gmail.com](mailto:benatasban@gmail.com)
- **Selling Platforms:** [SuperProfile](https://superprofile.bio) (UPI/INR) & [Payhip](https://payhip.com) (Global Cards/USD)

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons
- **Bundler & Tooling:** Vite 8, PostCSS, Autoprefixer
- **Backend:** Node.js, Express 4, TypeScript (`tsx`)
- **Persistence:** Dual-layer storage (Persistent JSON datastore in `data/products.json` + client-side fallback cache in `localStorage`)
- **Hosting Targets:** Render (Full-Stack Web Service), Netlify, Vercel

---

## 📦 Features

- 💼 **Digital Products Showcase:** Filter by platform (*All*, *SuperProfile*, *Payhip*) and categories (*Business & Accounting*, *Compliance*, *Productivity & AI*, *Developer Templates*).
- 🔍 **Real-Time Search:** Instant filtering across title, tagline, description, and keywords.
- 🧮 **Interactive Project Scope & Cost Estimator:** Real-time quote calculation with 1-click WhatsApp inquiry handoff.
- 🛡️ **Secure Admin Console:**
  - Login at `#admin` (e.g. `https://your-domain.com/#admin` or click the lock icon in the navbar).
  - Credentials:
    - **Username:** `admin`
    - **Password:** `Benatcode2026` *(configurable via `ADMIN_PASSWORD` env var)*
  - Features: Full Product CRUD (Create, Read, Update, Delete), Live/Draft visibility toggles, catalogue JSON backup & restore, platform direct URL integration.
- 📱 **Zero Horizontal Overflow:** Verified across mobile devices (320px–430px), tablets, and ultra-wide displays.
- 🩺 **Health Check Endpoint:** `/api/health` for automated uptime monitors and Render zero-downtime deploys.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js `v18.0.0` or higher (Node 20+ recommended)
- `npm` (comes with Node.js) or `bun` / `pnpm`

### Step 1: Clone Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/benatcode.git
cd benatcode
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Render Deployment Guide (Step-by-Step)

BenatCode is fully configured for zero-configuration deployment on **Render**.

### Option A: 1-Click Blueprint Deployment (Recommended)

1. Push your repository to **GitHub**.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** and select **Blueprint**.
4. Connect your GitHub repository `benatcode`.
5. Render will automatically detect `render.yaml` and configure:
   - **Service Type:** Web Service
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Health Check Path:** `/api/health`
6. Click **Apply**. Render will build and deploy your app in ~2 minutes!

---

### Option B: Manual Web Service Setup on Render

1. Push your repository to **GitHub**.
2. In the Render Dashboard, click **New +** -> **Web Service**.
3. Select your `benatcode` GitHub repository.
4. Fill in the following settings:
   - **Name:** `benatcode` (or any custom name)
   - **Region:** Any (e.g., Oregon, Frankfurt, Singapore)
   - **Branch:** `main` (or `master`)
   - **Runtime:** `Node`
   - **Build Command:**
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**
     ```bash
     npm run start
     ```
   - **Plan:** `Free` (or Starter)
5. Expand **Advanced** -> **Health Check Path**:
   - Set to: `/api/health`
6. In **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `ADMIN_USERNAME` = `admin` *(or your custom username)*
   - `ADMIN_PASSWORD` = `Benatcode2026` *(or your strong private password)*
7. Click **Create Web Service**.

Your site will be live at `https://<your-service-name>.onrender.com`!

---

## 📤 Step-by-Step GitHub Upload Instructions

If you are uploading this project to GitHub for the first time:

1. Create a new repository on [GitHub](https://github.com/new):
   - Repository name: `benatcode`
   - Visibility: Public or Private
   - **Do NOT** initialize with README or .gitignore (they are already included in this project).

2. In your local terminal, navigate to the extracted project folder:
   ```bash
   cd benatcode
   ```

3. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: BenatCode production storefront and management system"
   ```

4. Link and push to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/benatcode.git
   git push -u origin main
   ```

---

## 🔑 Environment Variables Reference

| Variable Name | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `PORT` | Auto | `3000` | Port assigned by Render or local environment |
| `NODE_ENV` | Optional | `production` | Set to `production` in live environments |
| `ADMIN_USERNAME` | Optional | `admin` | Admin login username |
| `ADMIN_PASSWORD` | Optional | `Benatcode2026` | Admin login password |
| `APP_URL` | Optional | `""` | Public canonical base URL (e.g., `https://benatcode.onrender.com`) |
| `GEMINI_API_KEY` | Optional | `""` | Optional Google Gemini key if AI tools are invoked |

---

## 📁 Project Structure

```
├── data/
│   ├── products.json          # Persistent catalogue datastore
│   └── settings.json          # Store & platform settings
├── public/
│   ├── _redirects             # Netlify SPA redirect rules
│   └── assets/                # Public media & photos
├── src/
│   ├── assets/images/         # High-resolution product mockups
│   ├── components/            # React UI components (Hero, Products, Navbar, Modals...)
│   │   └── admin/             # Admin console, form builder, and API guides
│   ├── data/                  # Built-in catalogue data & fallback items
│   ├── services/              # API and client caching service
│   ├── types/                 # TypeScript interfaces
│   ├── App.tsx                # Main SPA orchestrator
│   └── main.tsx               # Client entry point
├── .env.example               # Safe environment variable template
├── .gitignore                 # GitHub ignore rules (no secrets/node_modules)
├── index.html                 # HTML shell with SEO & OpenGraph meta
├── netlify.toml               # Netlify deployment configuration
├── package.json               # Dependencies and scripts (Express + Vite + tsx)
├── render.yaml                # Render Blueprint automated deployment spec
├── server.ts                  # Production Express server + Vite dev middleware
├── tsconfig.json              # TypeScript compilation rules
├── vercel.json                # Vercel deployment & rewrite rules
└── vite.config.ts             # Vite build pipeline
```

---

## 📄 License & Credits

Built with precision by **Benat Asban S** ([BenatCode](https://benatcode.onrender.com)).  
All rights reserved © 2026.
