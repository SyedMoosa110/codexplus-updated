import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting CodeXplus dynamic database seeding...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@codexplus.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: "CodeXplus Administrator",
    },
    create: {
      email: adminEmail,
      name: "CodeXplus Administrator",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✓ Admin user configured: ${admin.email}`);

  // 2. Seed Dynamic Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      siteName: "CodeXplus",
      logoText: "CX",
      statusBadgeText: "All Systems Operational",
      tagline: "Engineering High-Performance Digital Products & AI Systems",
      heroBadge: "ENTERPRISE SOFTWARE & PRODUCT LAB",
      heroTitle: "We Build Scalable Software, AI Systems & Modern Web Platforms",
      heroHighlightedWords: "Software, AI, Platforms",
      heroSubtitle:
        "CodeXplus is an elite digital engineering studio crafting bespoke full-stack applications, biometric attendance ecosystems, enterprise ERPs, and conversion-engineered digital platforms.",
      heroCtaPrimaryText: "Launch Cost Estimator",
      heroCtaPrimaryLink: "#estimator",
      heroCtaSecondaryText: "Explore Showcase",
      heroCtaSecondaryLink: "#work",
      stats: [
        { label: "Enterprise Deployments", value: "150+" },
        { label: "Production Uptime", value: "99.98%" },
        { label: "Average API Latency", value: "<50ms" },
        { label: "Processed Transactions", value: "$2.4B+" },
      ],
      terminalLines: [
        "npx create-codexplus-app@latest enterprise-suite",
        "✔ Initialized Next.js 15, PostgreSQL & Fastify architecture",
        "✔ Biometric Facial Authentication pipeline active (99.94% precision)",
        "✔ Compiling high-frequency telemetry engine... Done in 32ms",
        "⚡ Ready on http://localhost:3000 — 0 vulnerabilities found",
      ],
      techStack: [
        { name: "Next.js 15", icon: "Zap", color: "text-white" },
        { name: "React 19", icon: "Code2", color: "text-cyan-400" },
        { name: "Node.js & Fastify", icon: "Server", color: "text-emerald-400" },
        { name: "PostgreSQL & Prisma", icon: "Database", color: "text-blue-400" },
        { name: "TypeScript 5.7", icon: "Terminal", color: "text-blue-500" },
        { name: "Tailwind CSS", icon: "Layers", color: "text-teal-400" },
        { name: "Framer Motion", icon: "Sparkles", color: "text-purple-400" },
        { name: "UI/UX Pro Max", icon: "Eye", color: "text-pink-400" },
        { name: "Biometric Vision AI", icon: "Shield", color: "text-amber-400" },
        { name: "Distributed Redis", icon: "Cpu", color: "text-rose-400" },
        { name: "Enterprise Microservices", icon: "Boxes", color: "text-indigo-400" },
        { name: "CI/CD & Kubernetes", icon: "Workflow", color: "text-sky-400" },
      ],
      theme: {
        primary: "#2563EB",
        indigo: "#4F46E5",
        cyan: "#06B6D4",
        background: "#0B0F19",
        surface: "#1E293B",
      },
      navLinks: [
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Estimator", href: "#estimator" },
        { label: "Contact", href: "#contact" },
      ],
      footerLinks: [
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#work" },
        { label: "Cost Estimator", href: "#estimator" },
        { label: "Client Portal", href: "/admin" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
      socialLinks: [
        { label: "GitHub", href: "https://github.com", icon: "Github" },
        { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
        { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
      ],
      footerText:
        "Engineering High-Performance Digital Products, Biometric Security & Modern Enterprise Platforms.",
      copyrightText: "CodeXplus Studio. All rights reserved.",
      contactEmail: "contact@codexplus.com",
      phone: "+1 (800) 555-0199",
      address: "100 Innovation Way, Suite 800, San Francisco, CA 94105",
    },
    create: {
      id: "main",
      siteName: "CodeXplus",
      logoText: "CX",
      statusBadgeText: "All Systems Operational",
      tagline: "Engineering High-Performance Digital Products & AI Systems",
      heroBadge: "ENTERPRISE SOFTWARE & PRODUCT LAB",
      heroTitle: "We Build Scalable Software, AI Systems & Modern Web Platforms",
      heroHighlightedWords: "Software, AI, Platforms",
      heroSubtitle:
        "CodeXplus is an elite digital engineering studio crafting bespoke full-stack applications, biometric attendance ecosystems, enterprise ERPs, and conversion-engineered digital platforms.",
      heroCtaPrimaryText: "Launch Cost Estimator",
      heroCtaPrimaryLink: "#estimator",
      heroCtaSecondaryText: "Explore Showcase",
      heroCtaSecondaryLink: "#work",
      stats: [
        { label: "Enterprise Deployments", value: "150+" },
        { label: "Production Uptime", value: "99.98%" },
        { label: "Average API Latency", value: "<50ms" },
        { label: "Processed Transactions", value: "$2.4B+" },
      ],
      terminalLines: [
        "npx create-codexplus-app@latest enterprise-suite",
        "✔ Initialized Next.js 15, PostgreSQL & Fastify architecture",
        "✔ Biometric Facial Authentication pipeline active (99.94% precision)",
        "✔ Compiling high-frequency telemetry engine... Done in 32ms",
        "⚡ Ready on http://localhost:3000 — 0 vulnerabilities found",
      ],
      techStack: [
        { name: "Next.js 15", icon: "Zap", color: "text-white" },
        { name: "React 19", icon: "Code2", color: "text-cyan-400" },
        { name: "Node.js & Fastify", icon: "Server", color: "text-emerald-400" },
        { name: "PostgreSQL & Prisma", icon: "Database", color: "text-blue-400" },
        { name: "TypeScript 5.7", icon: "Terminal", color: "text-blue-500" },
        { name: "Tailwind CSS", icon: "Layers", color: "text-teal-400" },
        { name: "Framer Motion", icon: "Sparkles", color: "text-purple-400" },
        { name: "UI/UX Pro Max", icon: "Eye", color: "text-pink-400" },
        { name: "Biometric Vision AI", icon: "Shield", color: "text-amber-400" },
        { name: "Distributed Redis", icon: "Cpu", color: "text-rose-400" },
        { name: "Enterprise Microservices", icon: "Boxes", color: "text-indigo-400" },
        { name: "CI/CD & Kubernetes", icon: "Workflow", color: "text-sky-400" },
      ],
      theme: {
        primary: "#2563EB",
        indigo: "#4F46E5",
        cyan: "#06B6D4",
        background: "#0B0F19",
        surface: "#1E293B",
      },
      navLinks: [
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Estimator", href: "#estimator" },
        { label: "Contact", href: "#contact" },
      ],
      footerLinks: [
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#work" },
        { label: "Cost Estimator", href: "#estimator" },
        { label: "Client Portal", href: "/admin" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
      socialLinks: [
        { label: "GitHub", href: "https://github.com", icon: "Github" },
        { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
        { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
      ],
      footerText:
        "Engineering High-Performance Digital Products, Biometric Security & Modern Enterprise Platforms.",
      copyrightText: "CodeXplus Studio. All rights reserved.",
      contactEmail: "contact@codexplus.com",
      phone: "+1 (800) 555-0199",
      address: "100 Innovation Way, Suite 800, San Francisco, CA 94105",
    },
  });
  console.log("✓ Dynamic site settings seeded");

  // 3. Seed Services (Bento Grid)
  const services = [
    {
      title: "Custom Web & Full-Stack Applications",
      slug: "custom-web-fullstack",
      summary:
        "High-performance distributed web architectures built with Next.js, Node.js, TypeScript, and microservice backends engineered for massive scale.",
      badge: "ARCHITECTURE",
      features: [
        "Server-Driven Micro-frontends",
        "Sub-50ms Global Edge Caching",
        "Type-Safe GraphQL & REST APIs",
        "High-Availability SQL & NoSQL Stores",
      ],
      icon: "Code",
      visualType: "flow",
      gridSpan: "col-span-1",
      sortOrder: 1,
    },
    {
      title: "UI/UX Pro Max Design & Branding",
      slug: "ui-ux-pro-max-design",
      summary:
        "Ultra-modern interactive design systems, motion choreography, and brand identities tailored to maximize emotional resonance and conversion.",
      badge: "INTERACTION",
      features: [
        "Figma Enterprise Token Systems",
        "Dynamic Dark/Light HSL Palettes",
        "Framer Motion Micro-Interactions",
        "WCAG AA Accessibility Compliance",
      ],
      icon: "Palette",
      visualType: "theme",
      gridSpan: "col-span-1",
      sortOrder: 2,
    },
    {
      title: "E-Commerce Platforms & Headless Stores",
      slug: "ecommerce-platforms",
      summary:
        "Headless commerce engines with lightning-fast cart experiences, multi-currency checkout, and automated inventory sync across global channels.",
      badge: "CONVERSION",
      features: [
        "Sub-second Checkout Funnels",
        "Stripe, PayPal & Crypto Gateways",
        "Real-Time Inventory Streaming",
        "Algolia-Powered Instant Search",
      ],
      icon: "ShoppingBag",
      visualType: "ecommerce",
      gridSpan: "col-span-1",
      sortOrder: 3,
    },
    {
      title: "Custom CMS & Dynamic Portals",
      slug: "custom-cms-dynamic-portals",
      summary:
        "Tailored content management systems and multi-tenant client portals with instant visual live preview, granular role-based permissions, and audit logs.",
      badge: "CONTROL",
      features: [
        "Live Inline WYSIWYG Previews",
        "Granular RBAC Permissions",
        "Asset Transcoding & CDN Delivery",
        "Instant Webhook Automations",
      ],
      icon: "LayoutDashboard",
      visualType: "cms",
      gridSpan: "col-span-1",
      sortOrder: 4,
    },
    {
      title: "Enterprise Accounts & ERP Software",
      slug: "enterprise-accounts-erp",
      summary:
        "Comprehensive enterprise resource planning, financial accounting, automated invoice reconciliation, and operational reporting modules.",
      badge: "ENTERPRISE",
      features: [
        "Real-Time Financial Ledgers",
        "Multi-Entity Tax & Compliance",
        "Automated AP/AR Workflows",
        "Executive BI Analytics Dashboards",
      ],
      icon: "BarChart3",
      visualType: "finance",
      gridSpan: "col-span-1",
      sortOrder: 5,
    },
    {
      title: "Smart Biometric & Facial Attendance Systems",
      slug: "smart-biometric-facial-attendance",
      summary:
        "Next-generation edge computer vision attendance hardware and software with liveness detection, 0.2s facial recognition, and direct payroll sync.",
      badge: "EDGE AI",
      features: [
        "0.2s Facial Recognition Match",
        "Anti-Spoofing Liveness Detection",
        "Direct Automated Payroll Engine",
        "Offline-Capable Hardware Edge Node",
      ],
      icon: "ScanFace",
      visualType: "biometric",
      gridSpan: "col-span-1",
      sortOrder: 6,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✓ ${services.length} services seeded`);

  // 4. Seed Process Steps (Engineering Timeline)
  const processSteps = [
    {
      stepNumber: "01",
      title: "Discovery & High-Fidelity Architecture",
      description:
        "We dissect your technical goals, design distributed PostgreSQL/Prisma schemas, establish latency budgets, and define end-to-end data contracts before writing production code.",
      bullets: [
        "Distributed Schema Modeling",
        "Sub-50ms Latency Budgeting",
        "Security & Threat Matrix",
      ],
      icon: "Compass",
      sortOrder: 1,
    },
    {
      stepNumber: "02",
      title: "Interactive Prototyping & Design Systems",
      description:
        "Figma token architectures combined with Framer Motion physics. We validate every micro-interaction and screen state with WCAG AA compliance to guarantee maximum user conversion.",
      bullets: [
        "Token-Based Design Architecture",
        "Physics Micro-Interactions",
        "Conversion Funnel Validation",
      ],
      icon: "Layers",
      sortOrder: 2,
    },
    {
      stepNumber: "03",
      title: "Full-Stack Engineering & Vision AI",
      description:
        "Rapid, test-driven implementation using Next.js 15 App Router, Node.js Fastify/Express, hardware biometric APIs, and real-time WebSockets with zero boilerplate bloat.",
      bullets: [
        "Type-Safe TypeScript Pipelines",
        "0.2s Biometric Hardware Sync",
        "PostgreSQL Connection Pooling",
      ],
      icon: "Cpu",
      sortOrder: 3,
    },
    {
      stepNumber: "04",
      title: "Enterprise Deployment & Continuous Telemetry",
      description:
        "Zero-downtime rolling deploys, edge caching, continuous telemetry alerts, and automated backups ensuring 99.98% production uptime from day one.",
      bullets: [
        "Automated CI/CD Workflows",
        "High-Frequency Telemetry",
        "Instant Fallback Safeguards",
      ],
      icon: "Rocket",
      sortOrder: 4,
    },
  ];

  for (const ps of processSteps) {
    const existing = await prisma.processStep.findFirst({
      where: { stepNumber: ps.stepNumber },
    });
    if (existing) {
      await prisma.processStep.update({
        where: { id: existing.id },
        data: ps,
      });
    } else {
      await prisma.processStep.create({
        data: ps,
      });
    }
  }
  console.log(`✓ ${processSteps.length} process timeline steps seeded`);

  // 5. Seed Projects
  const projects = [
    {
      title: "NovaPay Global Banking Engine",
      slug: "novapay-banking-engine",
      category: "Web Apps",
      year: 2025,
      summary:
        "Next-generation financial infrastructure handling over 40,000 real-time payment transactions per second with sub-50ms global settlement latency.",
      client: "Nova Financial Technologies, Zurich",
      coverImage: "/demo/project-1.webp",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Kafka", "Tailwind CSS"],
      metrics: [
        { label: "Transaction Speed", value: "38ms" },
        { label: "Daily Volume", value: "$42M+" },
        { label: "System Availability", value: "99.999%" },
      ],
      liveUrl: "https://example.com/novapay",
      featured: true,
      sortOrder: 1,
    },
    {
      title: "ChronoShield Biometric & Attendance Suite",
      slug: "chronoshield-biometrics",
      category: "ERP & Attendance",
      year: 2025,
      summary:
        "AI-driven optical facial biometric recognition and multi-location employee workforce management engine with automated payroll calculation.",
      client: "Aegis Industrial Systems, Munich",
      coverImage: "/demo/project-2.webp",
      tags: ["Computer Vision", "Fastify", "PostgreSQL", "WebSockets", "Prisma"],
      metrics: [
        { label: "Scan Velocity", value: "0.18s" },
        { label: "Precision Rate", value: "99.96%" },
        { label: "Active Employees", value: "18,400" },
      ],
      liveUrl: "https://example.com/chronoshield",
      featured: true,
      sortOrder: 2,
    },
    {
      title: "ApexERP Enterprise Supply Chain",
      slug: "apexerp-supply-chain",
      category: "ERP & Attendance",
      year: 2024,
      summary:
        "Unified global logistics and warehouse telemetry platform synchronizing multi-country customs, inventory ledgering, and procurement pipelines.",
      client: "Apex Global Logistics, Singapore",
      coverImage: "/demo/project-3.webp",
      tags: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Redis"],
      metrics: [
        { label: "Warehouses Connected", value: "64" },
        { label: "Efficiency Gain", value: "+34%" },
        { label: "Error Reduction", value: "98.2%" },
      ],
      liveUrl: "https://example.com/apexerp",
      featured: true,
      sortOrder: 3,
    },
    {
      title: "AuraCommerce Headless Luxury Storefront",
      slug: "auracommerce-luxury-storefront",
      category: "E-Commerce",
      year: 2025,
      summary:
        "Ultra-high performance headless storefront delivering cinematic micro-interactions, 3D product previews, and instant multi-currency checkout.",
      client: "Maison de Luxe, Paris",
      coverImage: "/demo/project-4.webp",
      tags: ["Next.js App Router", "Stripe", "Framer Motion", "Tailwind CSS"],
      metrics: [
        { label: "Conversion Lift", value: "+46%" },
        { label: "Page Speed Score", value: "100/100" },
        { label: "Bounce Rate", value: "-28%" },
      ],
      liveUrl: "https://example.com/auracommerce",
      featured: true,
      sortOrder: 4,
    },
    {
      title: "Synthetix Enterprise AI Studio",
      slug: "synthetix-ai-studio",
      category: "Web Apps",
      year: 2025,
      summary:
        "Collaborative intelligence workspace enabling real-time multi-agent workflows, vector database exploration, and dynamic code synthesis.",
      client: "Synthetix Labs, San Francisco",
      coverImage: "/demo/project-5.webp",
      tags: ["React", "Node.js", "Python AI Bridge", "Tailwind CSS", "WebSockets"],
      metrics: [
        { label: "Model Latency", value: "<120ms" },
        { label: "Active Researchers", value: "12,000+" },
        { label: "Compute Saved", value: "41%" },
      ],
      liveUrl: "https://example.com/synthetix",
      featured: true,
      sortOrder: 5,
    },
    {
      title: "Lumina Kinetic Design System",
      slug: "lumina-design-system",
      category: "UI/UX",
      year: 2024,
      summary:
        "A multi-platform enterprise design token ecosystem supporting 200+ accessible components with fluid physics-based micro-interactions.",
      client: "Lumina Digital Holding, London",
      coverImage: "/demo/project-6.webp",
      tags: ["Figma Tokens", "Tailwind CSS", "Framer Motion", "Storybook"],
      metrics: [
        { label: "Token Adoptions", value: "100%" },
        { label: "Design Velocity", value: "3.5x Faster" },
        { label: "Accessibility", value: "WCAG AAA" },
      ],
      liveUrl: "https://example.com/lumina",
      featured: true,
      sortOrder: 6,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✓ ${projects.length} portfolio projects seeded`);

  // 6. Seed Testimonials
  const testimonials = [
    {
      clientName: "David Vance",
      role: "Chief Technology Officer",
      company: "Nova Financial Technologies",
      quote:
        "CodeXplus engineered our core banking telemetry architecture from scratch. Their performance-first engineering and flawless attention to micro-interactions set a new benchmark for fintech applications.",
      rating: 5,
      sortOrder: 1,
    },
    {
      clientName: "Elena Rostova",
      role: "VP of Digital Operations",
      company: "Aegis Industrial Systems",
      quote:
        "The ChronoShield biometric attendance platform transformed our 18,000-employee workforce management. Sub-second recognition accuracy and seamless payroll calculation saved hundreds of administrative hours monthly.",
      rating: 5,
      sortOrder: 2,
    },
    {
      clientName: "Marc Fontaine",
      role: "Head of Product",
      company: "Maison de Luxe",
      quote:
        "Their UI/UX design is simply without peer. Our e-commerce conversion jumped by 46% within the first thirty days of launching the new headless platform.",
      rating: 5,
      sortOrder: 3,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { clientName: t.clientName },
    });
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: t,
      });
    } else {
      await prisma.testimonial.create({
        data: t,
      });
    }
  }
  console.log(`✓ ${testimonials.length} testimonials seeded`);

  // 7. Seed Sample Leads
  const leads = [
    {
      name: "Alexander Wright",
      email: "alexander@horizonventures.io",
      company: "Horizon Ventures",
      serviceType: "Enterprise Accounts & ERP Software",
      budgetRange: "$50,000 – $100,000",
      timeline: "6-8 weeks",
      features: ["Multi-tenant Auth", "Real-Time Financial Ledgers", "BI Analytics"],
      message:
        "Looking to engineer a custom ERP suite for our logistics portfolio companies with real-time financial reconciliation.",
      status: "NEW",
    },
    {
      name: "Dr. Maya Lin",
      email: "maya.lin@biocrest.com",
      company: "BioCrest Healthcare",
      serviceType: "Smart Biometric & Facial Attendance Systems",
      budgetRange: "$25,000 – $50,000",
      timeline: "2-4 weeks",
      features: ["Face-Scan Bounding Box", "Anti-Spoofing", "Automated Payroll Sync"],
      message:
        "Need contactless facial attendance for 6 hospital wings with high security and zero false positives.",
      status: "CONTACTED",
    },
  ];

  for (const l of leads) {
    const existing = await prisma.lead.findFirst({
      where: { email: l.email },
    });
    if (!existing) {
      await prisma.lead.create({
        data: l,
      });
    }
  }
  console.log("✓ Sample inquiries seeded");

  console.log("✨ CodeXplus database seeding complete!");
}

main()
  .catch((e) => {
    if (e.message?.includes("Can't reach database server") || e.code === "P1001") {
      console.log("\n⚠️  PostgreSQL server is not reachable at localhost:5432.");
      console.log("👉 Please make sure PostgreSQL is installed and running, or verify DATABASE_URL in backend/.env.");
      console.log("💡 The frontend website works 100% out-of-the-box even before you start PostgreSQL!\n");
    } else {
      console.error("❌ Seeding error:", e);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
