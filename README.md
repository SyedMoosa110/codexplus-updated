# CodeXplus — Complete Website & CMS

A clean, modern, and production-ready enterprise website and CMS designed with Next.js 15, Framer Motion, Tailwind CSS, Node.js Express, TypeScript, and Prisma ORM with PostgreSQL.

---

## 📁 Repository Structure

```
codexplus/
├── frontend/               # Next.js 15 (App Router, Framer Motion, Tailwind CSS)
│   ├── src/
│   │   ├── app/            # App Router pages (Home, /admin, /admin/login)
│   │   ├── components/     # UI/UX Pro Max animated components
│   │   └── lib/            # Dual-mode API client & rich fallback state
│   ├── public/             # High-resolution demo assets
│   ├── package.json
│   └── README.md
│
└── backend/                # Node.js + Express + Prisma ORM + PostgreSQL
    ├── prisma/             # Clean schema (SiteSettings, Services, Projects, Leads)
    ├── src/
    │   ├── server.ts       # Express REST API on port 4000
    │   ├── seed.ts         # Complete CodeXplus database seeder
    │   └── prisma.ts       # Prisma client singleton
    ├── .env.example
    ├── package.json
    └── README.md
```

---

## 🚀 Running the Project

### 1. Frontend (Next.js 15)
```bash
cd frontend
npm install
npm run dev
```
👉 Open **`http://localhost:3000`** in your browser.

> **💡 Zero-Config Fallback Mode:**  
> The frontend works 100% out-of-the-box even before you start the backend! It automatically loads pre-seeded CodeXplus data from `src/lib/default-data.ts` and persists changes to `localStorage`. You can immediately test the entire website, submit project inquiries in the Cost Estimator, and explore the `/admin` CMS.

---

### 2. Backend (Node.js & PostgreSQL) — Optional for Local Database
```bash
cd backend
npm install

# 1. Set DATABASE_URL in .env (or copy .env.example)
# 2. Push schema to PostgreSQL:
npx prisma db push

# 3. Seed initial data:
npm run seed

# 4. Start API server on port 4000:
npm run dev
```
👉 Server runs on **`http://localhost:4000`**. As soon as this is running, the frontend automatically syncs directly with PostgreSQL!

---

## 🚀 2 Simple Run Commands

### Terminal 1: Backend API
```bash
cd backend && npm run dev
```
*(Runs Express API server on `http://localhost:4000`)*

### Terminal 2: Frontend Website & CMS
```bash
cd frontend && npm run dev
```
*(Runs Next.js 15 app on `http://localhost:3000`)*

---

## 🔑 Admin Control Center

- **URL:** `http://localhost:3000/admin`
- **Default Email:** `admin@codexplus.com`
- **Default Password:** `admin123`

---

## ✨ Dynamic Sections & Architecture
- **UI/UX Pro Max Design:** Radiant gradients, interactive radial cursor glow, glassmorphic capsule navbar.
- **Hero Section:** Staggered animated headline, live auto-typing macOS terminal, and 3D floating glass cards (Biometric face scan, Live ERP revenue sparkline).
- **Infinite Marquee:** Continuous smooth tech stack ticker.
- **6 Bento Grid Services:** Custom mouse-tracking radial spotlight glow + live animated React/SVG indicators for all 6 specialized engineering disciplines.
- **Portfolio Showcase:** Category filter tabs with smooth `AnimatePresence` layout animations and full Case Study interactive drawer.
- **Engineering Process Timeline:** Phased blueprint with scroll-linked glowing gradient beam.
- **Client Testimonials:** Dynamic enterprise client validation and rating cards.
- **Interactive Project Cost Estimator:** Real-time budget bracket calculation with direct lead submission to PostgreSQL and the Admin Panel.
