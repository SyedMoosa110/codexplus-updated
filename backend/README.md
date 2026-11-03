# CodeXplus — Backend API

Clean, high-performance Node.js & Express REST API powered by TypeScript and Prisma ORM with PostgreSQL.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Copy `.env.example` to `.env` and set your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/codexplus?schema=public"
PORT=4000
JWT_SECRET="your_secure_secret_key"
FRONTEND_URL="http://localhost:3000"
```

### 3. Push Database Schema & Seed Data
```bash
npx prisma db push
npm run seed
```
> **Default Admin Credentials:**
> - Email: `admin@codexplus.com`
> - Password: `admin123`

### 4. Start Development Server
```bash
npm run dev
```
Server runs on: **`http://localhost:4000`**

---

## 📡 API Endpoints

- `GET /api/health` — Service health & database connectivity
- `POST /api/auth/login` — Admin login (returns JWT token)
- `GET /api/auth/me` — Verify session
- `GET /api/site` & `PUT /api/site` — Site settings & hero content
- `GET /api/services` & `POST/PUT/DELETE /api/services/:id` — Bento grid services
- `GET /api/projects` & `POST/PUT/DELETE /api/projects/:id` — Portfolio showcase
- `GET /api/testimonials` — Client testimonials
- `POST /api/leads` — Public submission from Project Cost Estimator & Contact Form
- `GET /api/leads` & `PATCH/DELETE /api/leads/:id` — Admin lead management
