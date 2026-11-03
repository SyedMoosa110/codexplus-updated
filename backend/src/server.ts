import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "codexplus_super_secret_jwt_key_2026_change_in_production";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Middlewares & Full CORS Configuration
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "15mb" }));

// Auth Token Verification Middleware
interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string; name?: string };
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Missing or invalid Bearer token." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string; name?: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Session token invalid or expired." });
  }
}

// -------------------------------------------------------------
// 1. Health & Telemetry
// -------------------------------------------------------------
app.get("/api/health", async (_req: Request, res: Response) => {
  let dbStatus = "connected";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (e) {
    dbStatus = "disconnected";
  }

  res.json({
    status: "ok",
    service: "CodeXplus API",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// 2. Authentication
// -------------------------------------------------------------
app.post("/api/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error during authentication." });
  }
});

app.get("/api/auth/me", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: req.user?.id },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) return res.status(404).json({ error: "User not found." });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve user." });
  }
});

// -------------------------------------------------------------
// 3. Site Settings (100% Dynamic Brand & Sections)
// -------------------------------------------------------------
app.get("/api/site", async (_req: Request, res: Response) => {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "main",
          siteName: "CodeXplus",
          logoText: "CX",
          statusBadgeText: "All Systems Operational",
          tagline: "Engineering High-Performance Digital Products & AI Systems",
        },
      });
    }

    return res.json(settings);
  } catch (error: any) {
    console.error("Error reading site settings:", error);
    return res.status(500).json({ error: "Could not fetch site settings." });
  }
});

app.put("/api/site", requireAuth, async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    delete updateData.id;
    delete updateData.updatedAt;

    const updated = await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: updateData,
      create: { id: "main", ...updateData },
    });

    return res.json(updated);
  } catch (error: any) {
    console.error("Error updating site settings:", error);
    return res.status(500).json({ error: "Could not update site settings." });
  }
});

// -------------------------------------------------------------
// 4. Services (Bento Grid)
// -------------------------------------------------------------
app.get("/api/services", async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch services." });
  }
});

app.post("/api/services", requireAuth, async (req: Request, res: Response) => {
  try {
    const newService = await prisma.service.create({
      data: req.body,
    });
    return res.status(201).json(newService);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to create service." });
  }
});

app.put("/api/services/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    const updated = await prisma.service.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to update service." });
  }
});

app.delete("/api/services/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    return res.json({ success: true, id });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to delete service." });
  }
});

// -------------------------------------------------------------
// 5. Projects (Portfolio Showcase)
// -------------------------------------------------------------
app.get("/api/projects", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category && typeof category === "string" && category !== "All") {
      where.category = category;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch projects." });
  }
});

app.post("/api/projects", requireAuth, async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({
      data: req.body,
    });
    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to create project." });
  }
});

app.put("/api/projects/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    const updated = await prisma.project.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to update project." });
  }
});

app.delete("/api/projects/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    return res.json({ success: true, id });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to delete project." });
  }
});

// -------------------------------------------------------------
// 6. Process Timeline Steps (Engineering Blueprint)
// -------------------------------------------------------------
app.get("/api/process-steps", async (_req: Request, res: Response) => {
  try {
    const steps = await prisma.processStep.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return res.json(steps);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch process steps." });
  }
});

app.post("/api/process-steps", requireAuth, async (req: Request, res: Response) => {
  try {
    const step = await prisma.processStep.create({
      data: req.body,
    });
    return res.status(201).json(step);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to create process step." });
  }
});

app.put("/api/process-steps/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    const updated = await prisma.processStep.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to update process step." });
  }
});

app.delete("/api/process-steps/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.processStep.delete({ where: { id } });
    return res.json({ success: true, id });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to delete process step." });
  }
});

// -------------------------------------------------------------
// 7. Testimonials
// -------------------------------------------------------------
app.get("/api/testimonials", async (_req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return res.json(testimonials);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch testimonials." });
  }
});

app.post("/api/testimonials", requireAuth, async (req: Request, res: Response) => {
  try {
    const testimonial = await prisma.testimonial.create({
      data: req.body,
    });
    return res.status(201).json(testimonial);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to create testimonial." });
  }
});

app.put("/api/testimonials/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    const updated = await prisma.testimonial.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to update testimonial." });
  }
});

app.delete("/api/testimonials/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    return res.json({ success: true, id });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to delete testimonial." });
  }
});

// -------------------------------------------------------------
// 8. Leads / Inquiries (Estimator & Contact Form)
// -------------------------------------------------------------
app.post("/api/leads", async (req: Request, res: Response) => {
  try {
    const { name, email, company, serviceType, budgetRange, timeline, features, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company: company || "",
        serviceType: serviceType || "General Engineering Inquiry",
        budgetRange: budgetRange || "Custom Scope",
        timeline: timeline || "Standard",
        features: features || [],
        message,
        status: "NEW",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry received. Our engineering leads will contact you within 24 hours.",
      lead,
    });
  } catch (error: any) {
    console.error("Error saving lead:", error);
    return res.status(500).json({ error: "Could not save inquiry." });
  }
});

app.get("/api/leads", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(leads);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch leads." });
  }
});

app.patch("/api/leads/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.lead.update({
      where: { id },
      data: { status },
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to update lead." });
  }
});

app.delete("/api/leads/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.lead.delete({ where: { id } });
    return res.json({ success: true, id });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Failed to delete lead." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ CodeXplus API Server active on http://localhost:${PORT}`);
  console.log(`📡 Ready for requests from frontend: ${FRONTEND_URL}`);
});
