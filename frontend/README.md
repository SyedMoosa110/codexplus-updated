# CodeXplus — Next.js 15 Frontend

Ultra-modern, high-performance animated website and CMS built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

The frontend launches on **`http://localhost:3000`**.

---

## 🛡️ Built-in Zero-Config Fallback Mode

If the Node.js backend is not yet started or running on another port, the frontend:
- **Never crashes or shows broken pages.**
- Automatically loads complete pre-seeded data from `src/lib/default-data.ts`.
- Persists `/admin` edits and contact inquiries directly to `localStorage`.
- Automatically connects and syncs directly to the backend PostgreSQL database as soon as `http://localhost:4000` is active.
- Fully deployable on **Vercel** with zero extra setup!

---

## 🔑 Admin Control Center

Visit **`http://localhost:3000/admin`** to manage:
- Hero headline, badges, stats, and terminal lines
- 6 Bento Grid services with interactive SVG animations
- Filterable portfolio case studies
- Real-time client scope inquiries submitted from the Cost Estimator
- Studio branding and contact details

> **Default Admin Login:**
> - Email: `admin@codexplus.com`
> - Password: `admin123`
