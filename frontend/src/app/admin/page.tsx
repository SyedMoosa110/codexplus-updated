"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Clock,
  Mail,
  Building,
  Quote,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import { useData } from "@/lib/data-context";
import { Service, Project, ProcessStep, Testimonial, Lead } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    settings,
    services,
    projects,
    processSteps,
    testimonials,
    leads,
    backendStatus,
    isAuthenticated,
    logout,
    updateSettings,
    saveService,
    deleteService,
    saveProject,
    deleteProject,
    saveProcessStep,
    deleteProcessStep,
    saveTestimonial,
    deleteTestimonial,
    updateLeadStatus,
    deleteLead,
    refresh,
  } = useData();

  // Tab State
  const [activeTab, setActiveTab] = useState<
    "overview" | "hero" | "services" | "projects" | "timeline" | "testimonials" | "leads" | "settings"
  >("overview");

  // Save Notification Banner
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const showBanner = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Auth Protection
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // ---------------------------------------------------------
  // 1. Hero Section Form State
  // ---------------------------------------------------------
  const [heroBadge, setHeroBadge] = useState(settings.heroBadge || "");
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle || "");
  const [heroHighlightedWords, setHeroHighlightedWords] = useState(settings.heroHighlightedWords || "");
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle || "");
  const [heroCtaPrimaryText, setHeroCtaPrimaryText] = useState(settings.heroCtaPrimaryText || "");
  const [heroCtaPrimaryLink, setHeroCtaPrimaryLink] = useState(settings.heroCtaPrimaryLink || "");
  const [heroCtaSecondaryText, setHeroCtaSecondaryText] = useState(settings.heroCtaSecondaryText || "");
  const [heroCtaSecondaryLink, setHeroCtaSecondaryLink] = useState(settings.heroCtaSecondaryLink || "");
  const [stat0Val, setStat0Val] = useState(settings.stats?.[0]?.value || "150+");
  const [stat0Label, setStat0Label] = useState(settings.stats?.[0]?.label || "Enterprise Deployments");
  const [stat1Val, setStat1Val] = useState(settings.stats?.[1]?.value || "99.98%");
  const [stat1Label, setStat1Label] = useState(settings.stats?.[1]?.label || "Production Uptime");
  const [stat2Val, setStat2Val] = useState(settings.stats?.[2]?.value || "<50ms");
  const [stat2Label, setStat2Label] = useState(settings.stats?.[2]?.label || "Average API Latency");
  const [stat3Val, setStat3Val] = useState(settings.stats?.[3]?.value || "$2.4B+");
  const [stat3Label, setStat3Label] = useState(settings.stats?.[3]?.label || "Processed Transactions");
  const [terminalLinesText, setTerminalLinesText] = useState((settings.terminalLines || []).join("\n"));

  useEffect(() => {
    setHeroBadge(settings.heroBadge || "");
    setHeroTitle(settings.heroTitle || "");
    setHeroHighlightedWords(settings.heroHighlightedWords || "Software, AI, Platforms");
    setHeroSubtitle(settings.heroSubtitle || "");
    setHeroCtaPrimaryText(settings.heroCtaPrimaryText || "Launch Cost Estimator");
    setHeroCtaPrimaryLink(settings.heroCtaPrimaryLink || "#estimator");
    setHeroCtaSecondaryText(settings.heroCtaSecondaryText || "Explore Showcase");
    setHeroCtaSecondaryLink(settings.heroCtaSecondaryLink || "#work");
    if (settings.stats) {
      if (settings.stats[0]) {
        setStat0Val(settings.stats[0].value);
        setStat0Label(settings.stats[0].label);
      }
      if (settings.stats[1]) {
        setStat1Val(settings.stats[1].value);
        setStat1Label(settings.stats[1].label);
      }
      if (settings.stats[2]) {
        setStat2Val(settings.stats[2].value);
        setStat2Label(settings.stats[2].label);
      }
      if (settings.stats[3]) {
        setStat3Val(settings.stats[3].value);
        setStat3Label(settings.stats[3].label);
      }
    }
    if (settings.terminalLines) {
      setTerminalLinesText(settings.terminalLines.join("\n"));
    }
  }, [settings]);

  const handleSaveHero = async () => {
    const updatedStats = [
      { value: stat0Val, label: stat0Label },
      { value: stat1Val, label: stat1Label },
      { value: stat2Val, label: stat2Label },
      { value: stat3Val, label: stat3Label },
    ];
    const lines = terminalLinesText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    await updateSettings({
      heroBadge,
      heroTitle,
      heroHighlightedWords,
      heroSubtitle,
      heroCtaPrimaryText,
      heroCtaPrimaryLink,
      heroCtaSecondaryText,
      heroCtaSecondaryLink,
      stats: updatedStats,
      terminalLines: lines,
    });
    showBanner("Hero Content & Terminal Telemetry Updated Live!");
  };

  // ---------------------------------------------------------
  // 2. Services Form State
  // ---------------------------------------------------------
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const [serviceSummary, setServiceSummary] = useState("");
  const [serviceBadge, setServiceBadge] = useState("CORE CAPABILITY");
  const [serviceIcon, setServiceIcon] = useState("Code");
  const [serviceVisualType, setServiceVisualType] = useState<any>("flow");
  const [serviceGridSpan, setServiceGridSpan] = useState("col-span-1");
  const [serviceFeaturesText, setServiceFeaturesText] = useState("");

  const startEditService = (s?: Service) => {
    if (s) {
      setEditingService(s);
      setServiceTitle(s.title);
      setServiceSlug(s.slug);
      setServiceSummary(s.summary);
      setServiceBadge(s.badge || "CORE CAPABILITY");
      setServiceIcon(s.icon);
      setServiceVisualType(s.visualType);
      setServiceGridSpan(s.gridSpan || "col-span-1");
      setServiceFeaturesText((s.features || []).join("\n"));
    } else {
      const newId = `srv-${Date.now()}`;
      setEditingService({
        id: newId,
        title: "",
        slug: `service-${Date.now()}`,
        summary: "",
        badge: "CORE CAPABILITY",
        features: [],
        icon: "Code",
        visualType: "flow",
        gridSpan: "col-span-1",
        sortOrder: services.length + 1,
        isPublished: true,
      });
      setServiceTitle("");
      setServiceSlug(`service-${Date.now()}`);
      setServiceSummary("");
      setServiceBadge("CORE CAPABILITY");
      setServiceIcon("Code");
      setServiceVisualType("flow");
      setServiceGridSpan("col-span-1");
      setServiceFeaturesText("");
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    const feats = serviceFeaturesText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    await saveService({
      ...editingService,
      title: serviceTitle,
      slug: serviceSlug || `service-${Date.now()}`,
      summary: serviceSummary,
      badge: serviceBadge,
      icon: serviceIcon,
      visualType: serviceVisualType,
      gridSpan: serviceGridSpan,
      features: feats,
    });
    setEditingService(null);
    showBanner("Service updated successfully!");
  };

  // ---------------------------------------------------------
  // 3. Projects Form State
  // ---------------------------------------------------------
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState<any>("Web Apps");
  const [projectYear, setProjectYear] = useState(2025);
  const [projectClient, setProjectClient] = useState("");
  const [projectCoverImage, setProjectCoverImage] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTagsText, setProjectTagsText] = useState("");
  const [projectLiveUrl, setProjectLiveUrl] = useState("");
  const [projectGithubUrl, setProjectGithubUrl] = useState("");

  const startEditProject = (p?: Project) => {
    if (p) {
      setEditingProject(p);
      setProjectTitle(p.title);
      setProjectCategory(p.category);
      setProjectYear(p.year);
      setProjectClient(p.client);
      setProjectCoverImage(p.coverImage);
      setProjectSummary(p.summary);
      setProjectDescription(p.description || "");
      setProjectTagsText((p.tags || []).join(", "));
      setProjectLiveUrl(p.liveUrl || "");
      setProjectGithubUrl(p.githubUrl || "");
    } else {
      const newId = `proj-${Date.now()}`;
      setEditingProject({
        id: newId,
        title: "",
        slug: `project-${Date.now()}`,
        category: "Web Apps",
        year: 2025,
        summary: "",
        client: "",
        coverImage: "/demo/project-1.webp",
        tags: [],
        metrics: [{ label: "Impact", value: "+100%" }],
        liveUrl: "",
        githubUrl: "",
        sortOrder: projects.length + 1,
        isPublished: true,
      });
      setProjectTitle("");
      setProjectCategory("Web Apps");
      setProjectYear(2025);
      setProjectClient("");
      setProjectCoverImage("/demo/project-1.webp");
      setProjectSummary("");
      setProjectDescription("");
      setProjectTagsText("Next.js, TypeScript, Tailwind");
      setProjectLiveUrl("");
      setProjectGithubUrl("");
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;
    const tags = projectTagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await saveProject({
      ...editingProject,
      title: projectTitle,
      category: projectCategory,
      year: Number(projectYear),
      client: projectClient,
      coverImage: projectCoverImage || "/demo/project-1.webp",
      summary: projectSummary,
      description: projectDescription,
      tags,
      liveUrl: projectLiveUrl,
      githubUrl: projectGithubUrl,
    });
    setEditingProject(null);
    showBanner("Project saved successfully!");
  };

  // ---------------------------------------------------------
  // 4. Process Timeline Form State
  // ---------------------------------------------------------
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [stepNumber, setStepNumber] = useState("01");
  const [stepTitle, setStepTitle] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [stepBulletsText, setStepBulletsText] = useState("");
  const [stepIcon, setStepIcon] = useState("Compass");

  const startEditStep = (step?: ProcessStep) => {
    if (step) {
      setEditingStep(step);
      setStepNumber(step.stepNumber);
      setStepTitle(step.title);
      setStepDescription(step.description);
      setStepBulletsText((step.bullets || []).join("\n"));
      setStepIcon(step.icon);
    } else {
      const nextNum = String(processSteps.length + 1).padStart(2, "0");
      setEditingStep({
        id: `step-${Date.now()}`,
        stepNumber: nextNum,
        title: "",
        description: "",
        bullets: [],
        icon: "Compass",
        sortOrder: processSteps.length + 1,
        isPublished: true,
      });
      setStepNumber(nextNum);
      setStepTitle("");
      setStepDescription("");
      setStepBulletsText("");
      setStepIcon("Compass");
    }
  };

  const handleSaveStep = async () => {
    if (!editingStep) return;
    const bullets = stepBulletsText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    await saveProcessStep({
      ...editingStep,
      stepNumber,
      title: stepTitle,
      description: stepDescription,
      bullets,
      icon: stepIcon,
    });
    setEditingStep(null);
    showBanner("Process Step saved!");
  };

  // ---------------------------------------------------------
  // 5. Testimonials Form State
  // ---------------------------------------------------------
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testClientName, setTestClientName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testCompany, setTestCompany] = useState("");
  const [testQuote, setTestQuote] = useState("");
  const [testRating, setTestRating] = useState(5);

  const startEditTestimonial = (t?: Testimonial) => {
    if (t) {
      setEditingTestimonial(t);
      setTestClientName(t.clientName);
      setTestRole(t.role);
      setTestCompany(t.company);
      setTestQuote(t.quote);
      setTestRating(t.rating);
    } else {
      setEditingTestimonial({
        id: `test-${Date.now()}`,
        clientName: "",
        role: "",
        company: "",
        quote: "",
        rating: 5,
        sortOrder: testimonials.length + 1,
        isPublished: true,
      });
      setTestClientName("");
      setTestRole("");
      setTestCompany("");
      setTestQuote("");
      setTestRating(5);
    }
  };

  const handleSaveTestimonial = async () => {
    if (!editingTestimonial) return;
    await saveTestimonial({
      ...editingTestimonial,
      clientName: testClientName,
      role: testRole,
      company: testCompany,
      quote: testQuote,
      rating: Number(testRating),
    });
    setEditingTestimonial(null);
    showBanner("Testimonial saved!");
  };

  // ---------------------------------------------------------
  // 6. Site Branding & Settings State
  // ---------------------------------------------------------
  const [siteName, setSiteName] = useState(settings.siteName || "CodeXplus");
  const [logoText, setLogoText] = useState(settings.logoText || "CX");
  const [statusBadgeText, setStatusBadgeText] = useState(settings.statusBadgeText || "All Systems Operational");
  const [tagline, setTagline] = useState(settings.tagline || "");
  const [contactEmail, setContactEmail] = useState(settings.contactEmail || "");
  const [phone, setPhone] = useState(settings.phone || "");
  const [address, setAddress] = useState(settings.address || "");
  const [footerText, setFooterText] = useState(settings.footerText || "");
  const [copyrightText, setCopyrightText] = useState(settings.copyrightText || "");

  useEffect(() => {
    setSiteName(settings.siteName || "CodeXplus");
    setLogoText(settings.logoText || "CX");
    setStatusBadgeText(settings.statusBadgeText || "All Systems Operational");
    setTagline(settings.tagline || "");
    setContactEmail(settings.contactEmail || "");
    setPhone(settings.phone || "");
    setAddress(settings.address || "");
    setFooterText(settings.footerText || "");
    setCopyrightText(settings.copyrightText || "");
  }, [settings]);

  const handleSaveSettings = async () => {
    await updateSettings({
      siteName,
      logoText,
      statusBadgeText,
      tagline,
      contactEmail,
      phone,
      address,
      footerText,
      copyrightText,
    });
    showBanner("Site Branding & System Settings Updated!");
  };

  // Leads Filter
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("ALL");
  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter === "ALL") return true;
    return l.status === leadStatusFilter;
  });

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-5">
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center shadow-md">
              <span className="font-mono font-bold text-white text-sm">
                {settings.logoText || "CX"}
              </span>
            </div>
            <div>
              <div className="font-heading font-bold text-base text-white">
                {settings.siteName || "CodeXplus"}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-brand-cyan">
                CMS CONTROL CENTER
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5 font-medium text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "overview"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "hero"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Hero & Terminal</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "services"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Services (Bento)</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "projects"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Portfolio Showcase</span>
            </button>

            <button
              onClick={() => setActiveTab("timeline")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "timeline"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Process Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "testimonials"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Quote className="w-4 h-4" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "leads"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Client Inquiries</span>
              </div>
              {leads.filter((l) => l.status === "NEW").length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-blue text-white font-bold">
                  {leads.filter((l) => l.status === "NEW").length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === "settings"
                  ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Branding</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-900 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus.isConnected ? "bg-emerald-500 animate-pulse" : "bg-cyan-500"
                }`}
              />
              <span className="text-white font-semibold">
                {backendStatus.isConnected ? "PostgreSQL Active" : "Local Engine Mode"}
              </span>
            </div>
            <div className="text-slate-400 text-[10px]">
              {backendStatus.isConnected
                ? "Syncing directly to database"
                : "Syncing in zero-latency local state"}
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-mono text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-mono text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-h-screen overflow-y-auto">
        
        {/* Banner */}
        {saveMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-xl text-emerald-300 font-mono text-xs flex items-center gap-2 shadow-2xl">
            <Check className="w-4 h-4" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 1: OVERVIEW
        ------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-8 max-w-5xl">
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Platform Operations Overview
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time CMS content synchronization and telemetry management.
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Active Services
                </span>
                <span className="font-mono font-bold text-2xl text-white">
                  {services.length}
                </span>
                <span className="text-[10px] text-brand-cyan block mt-1">
                  Bento Grid Interactive
                </span>
              </div>

              <div className="p-5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Portfolio Projects
                </span>
                <span className="font-mono font-bold text-2xl text-white">
                  {projects.length}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1">
                  Published on Showcase
                </span>
              </div>

              <div className="p-5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Client Inquiries
                </span>
                <span className="font-mono font-bold text-2xl text-white">
                  {leads.length}
                </span>
                <span className="text-[10px] text-amber-400 block mt-1">
                  {leads.filter((l) => l.status === "NEW").length} Awaiting Review
                </span>
              </div>

              <div className="p-5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Process Steps
                </span>
                <span className="font-mono font-bold text-2xl text-white">
                  {processSteps.length}
                </span>
                <span className="text-[10px] text-brand-blue block mt-1">
                  Engineering Blueprint
                </span>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="p-6 rounded-3xl glass-card bg-slate-900/40 border border-slate-800">
              <h3 className="font-heading font-semibold text-sm text-white mb-4">
                Fast Configuration Shortcuts
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("hero")}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Edit Hero Text & Metrics →
                </button>
                <button
                  onClick={() => {
                    setActiveTab("services");
                    startEditService();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-brand-blue/20 hover:bg-brand-blue/30 text-brand-cyan border border-brand-blue/40 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Bento Service</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("projects");
                    startEditProject();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-brand-indigo/20 hover:bg-brand-indigo/30 text-indigo-300 border border-brand-indigo/40 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish New Project</span>
                </button>
                <button
                  onClick={refresh}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 ml-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh State</span>
                </button>
              </div>
            </div>

            {/* Recent Inquiries Preview */}
            <div className="p-6 rounded-3xl glass-panel bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-sm text-white">
                  Latest Inquiries from Cost Estimator
                </h3>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs font-mono text-brand-cyan hover:underline"
                >
                  View All ({leads.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {leads.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{lead.name}</div>
                      <div className="text-xs text-slate-400">
                        {lead.company ? `${lead.company} • ` : ""}
                        {lead.email}
                      </div>
                      <div className="text-[11px] font-mono text-brand-cyan mt-1">
                        Scope: {lead.serviceType} ({lead.budgetRange})
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold ${
                        lead.status === "NEW"
                          ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                          : lead.status === "CONTACTED"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: HERO & TERMINAL EDITOR
        ------------------------------------------------------------- */}
        {activeTab === "hero" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Hero Section & Terminal Editor
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Updates headline, highlighted gradient keywords, CTAs, counters, and terminal lines.
                </p>
              </div>
              <button
                onClick={handleSaveHero}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs font-mono bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Hero Changes</span>
              </button>
            </div>

            <div className="glass-panel bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Hero Top Pill Badge
                </label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Main Headline (Stagger Animated)
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue focus:outline-none font-heading font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Highlighted Gradient Words (Comma-separated words to highlight in gradient)
                </label>
                <input
                  type="text"
                  value={heroHighlightedWords}
                  onChange={(e) => setHeroHighlightedWords(e.target.value)}
                  placeholder="Software, AI, Platforms"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-brand-cyan focus:border-brand-blue focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* CTAs Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-brand-cyan uppercase">
                    Primary CTA Button
                  </label>
                  <input
                    type="text"
                    value={heroCtaPrimaryText}
                    onChange={(e) => setHeroCtaPrimaryText(e.target.value)}
                    placeholder="Button Text"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={heroCtaPrimaryLink}
                    onChange={(e) => setHeroCtaPrimaryLink(e.target.value)}
                    placeholder="Link Target (e.g. #estimator)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-brand-cyan uppercase">
                    Secondary CTA Button
                  </label>
                  <input
                    type="text"
                    value={heroCtaSecondaryText}
                    onChange={(e) => setHeroCtaSecondaryText(e.target.value)}
                    placeholder="Button Text"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={heroCtaSecondaryLink}
                    onChange={(e) => setHeroCtaSecondaryLink(e.target.value)}
                    placeholder="Link Target (e.g. #work)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono"
                  />
                </div>
              </div>

              {/* 4 Stats Counters */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-mono text-brand-cyan uppercase tracking-wider mb-3">
                  Animated Counter Stats (4 slots)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <input
                      type="text"
                      value={stat0Val}
                      onChange={(e) => setStat0Val(e.target.value)}
                      placeholder="Stat Value (e.g. 150+)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                    <input
                      type="text"
                      value={stat0Label}
                      onChange={(e) => setStat0Label(e.target.value)}
                      placeholder="Stat Label"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <input
                      type="text"
                      value={stat1Val}
                      onChange={(e) => setStat1Val(e.target.value)}
                      placeholder="Stat Value (e.g. 99.98%)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                    <input
                      type="text"
                      value={stat1Label}
                      onChange={(e) => setStat1Label(e.target.value)}
                      placeholder="Stat Label"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <input
                      type="text"
                      value={stat2Val}
                      onChange={(e) => setStat2Val(e.target.value)}
                      placeholder="Stat Value (e.g. <50ms)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                    <input
                      type="text"
                      value={stat2Label}
                      onChange={(e) => setStat2Label(e.target.value)}
                      placeholder="Stat Label"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <input
                      type="text"
                      value={stat3Val}
                      onChange={(e) => setStat3Val(e.target.value)}
                      placeholder="Stat Value (e.g. $2.4B+)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white"
                    />
                    <input
                      type="text"
                      value={stat3Label}
                      onChange={(e) => setStat3Label(e.target.value)}
                      placeholder="Stat Label"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Terminal Auto-Typing Commands */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
                  Auto-Typing Terminal Commands (One command per line)
                </label>
                <textarea
                  rows={5}
                  value={terminalLinesText}
                  onChange={(e) => setTerminalLinesText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:border-brand-blue focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: SERVICES (BENTO GRID)
        ------------------------------------------------------------- */}
        {activeTab === "services" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Bento Grid Services
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage services, badges, grid layouts, and visual animations.
                </p>
              </div>
              <button
                onClick={() => startEditService()}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-brand-blue text-white flex items-center gap-1.5 hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {/* Editing Service Drawer/Card */}
            {editingService && (
              <div className="p-6 rounded-3xl glass-card bg-slate-900 border border-brand-blue/50 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-heading font-bold text-base text-white">
                    {editingService.id.startsWith("srv-") && !services.find((s) => s.id === editingService.id)
                      ? "Create New Service"
                      : "Edit Service Card"}
                  </h3>
                  <button
                    onClick={() => setEditingService(null)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={serviceTitle}
                      onChange={(e) => setServiceTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={serviceSlug}
                      onChange={(e) => setServiceSlug(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={serviceBadge}
                      onChange={(e) => setServiceBadge(e.target.value)}
                      placeholder="CORE CAPABILITY"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-brand-cyan uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Summary Description
                  </label>
                  <textarea
                    rows={2}
                    value={serviceSummary}
                    onChange={(e) => setServiceSummary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Visual Animation Type
                    </label>
                    <select
                      value={serviceVisualType}
                      onChange={(e) => setServiceVisualType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    >
                      <option value="flow">Flow (Animated Node Diagram)</option>
                      <option value="theme">Theme (Interactive Color Switcher)</option>
                      <option value="ecommerce">Ecommerce (Live Conversion Counter)</option>
                      <option value="cms">CMS (Live Toggle Switch)</option>
                      <option value="finance">Finance (Quarterly Bar Chart)</option>
                      <option value="biometric">Biometric (Face-Scan & Payroll)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Icon Component
                    </label>
                    <select
                      value={serviceIcon}
                      onChange={(e) => setServiceIcon(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    >
                      <option value="Code">Code (Full-Stack)</option>
                      <option value="Palette">Palette (UI/UX)</option>
                      <option value="ShoppingBag">ShoppingBag (E-Commerce)</option>
                      <option value="LayoutDashboard">LayoutDashboard (CMS)</option>
                      <option value="BarChart3">BarChart3 (ERP Finance)</option>
                      <option value="ScanFace">ScanFace (Biometrics)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Grid Column Span
                    </label>
                    <select
                      value={serviceGridSpan}
                      onChange={(e) => setServiceGridSpan(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    >
                      <option value="col-span-1">Single Column (col-span-1)</option>
                      <option value="col-span-1 md:col-span-2">Wide Column (col-span-2)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Features (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={serviceFeaturesText}
                    onChange={(e) => setServiceFeaturesText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <button
                  onClick={handleSaveService}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs font-mono bg-brand-blue text-white"
                >
                  Save Service
                </button>
              </div>
            )}

            {/* Services List Table */}
            <div className="space-y-3">
              {services.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500">0{idx + 1}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{s.title}</span>
                        {s.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-blue/20 text-brand-cyan border border-brand-blue/30 uppercase">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{s.summary}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Visual: <span className="text-brand-cyan">{s.visualType}</span> • Span: {s.gridSpan}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        saveService({ ...s, isPublished: !s.isPublished });
                        showBanner(`Service ${s.isPublished ? "hidden" : "published"}`);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title={s.isPublished ? "Hide from website" : "Publish to website"}
                    >
                      {s.isPublished !== false ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                    <button
                      onClick={() => startEditService(s)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service: ${s.title}?`)) {
                          deleteService(s.id);
                          showBanner("Service deleted.");
                        }
                      }}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: PROJECTS (PORTFOLIO)
        ------------------------------------------------------------- */}
        {activeTab === "projects" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Portfolio Showcase Projects
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage projects, category filters, GitHub links, and metrics.
                </p>
              </div>
              <button
                onClick={() => startEditProject()}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-brand-blue text-white flex items-center gap-1.5 hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Project Edit Card */}
            {editingProject && (
              <div className="p-6 rounded-3xl glass-card bg-slate-900 border border-brand-blue/50 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-heading font-bold text-base text-white">
                    {editingProject.id.startsWith("proj-") && !projects.find((p) => p.id === editingProject.id)
                      ? "Add New Portfolio Project"
                      : "Edit Project Details"}
                  </h3>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    >
                      <option value="Web Apps">Web Apps</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="ERP & Attendance">ERP & Attendance</option>
                      <option value="UI/UX">UI/UX</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      value={projectYear}
                      onChange={(e) => setProjectYear(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Client Name & City
                    </label>
                    <input
                      type="text"
                      value={projectClient}
                      onChange={(e) => setProjectClient(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Cover Image Path / URL
                    </label>
                    <input
                      type="text"
                      value={projectCoverImage}
                      onChange={(e) => setProjectCoverImage(e.target.value)}
                      placeholder="/demo/project-1.webp"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Summary & Problem Solved
                  </label>
                  <textarea
                    rows={2}
                    value={projectSummary}
                    onChange={(e) => setProjectSummary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Full Architectural Solution (Case Study Modal)
                  </label>
                  <textarea
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Tech Stack Tags
                    </label>
                    <input
                      type="text"
                      value={projectTagsText}
                      onChange={(e) => setProjectTagsText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Live Project / Demo Link
                    </label>
                    <input
                      type="text"
                      value={projectLiveUrl}
                      onChange={(e) => setProjectLiveUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="text"
                      value={projectGithubUrl}
                      onChange={(e) => setProjectGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveProject}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs font-mono bg-brand-blue text-white"
                >
                  Save Project
                </button>
              </div>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-brand-cyan">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{p.year}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-white">{p.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.summary}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.tags?.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[9px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        saveProject({ ...p, isPublished: !p.isPublished });
                        showBanner(`Project ${p.isPublished ? "hidden" : "published"}`);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title={p.isPublished ? "Hide from website" : "Publish to website"}
                    >
                      {p.isPublished !== false ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                    <button
                      onClick={() => startEditProject(p)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project: ${p.title}?`)) {
                          deleteProject(p.id);
                          showBanner("Project deleted.");
                        }
                      }}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 5: PROCESS TIMELINE
        ------------------------------------------------------------- */}
        {activeTab === "timeline" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Engineering Process Timeline
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage the phased engineering roadmap and technical milestones.
                </p>
              </div>
              <button
                onClick={() => startEditStep()}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-brand-blue text-white flex items-center gap-1.5 hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Process Step</span>
              </button>
            </div>

            {/* Editing Step Drawer */}
            {editingStep && (
              <div className="p-6 rounded-3xl glass-card bg-slate-900 border border-brand-blue/50 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-heading font-bold text-base text-white">
                    {processSteps.find((s) => s.id === editingStep.id) ? "Edit Step" : "New Process Step"}
                  </h3>
                  <button
                    onClick={() => setEditingStep(null)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Step Number (e.g. 01)
                    </label>
                    <input
                      type="text"
                      value={stepNumber}
                      onChange={(e) => setStepNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={stepTitle}
                      onChange={(e) => setStepTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Icon
                    </label>
                    <select
                      value={stepIcon}
                      onChange={(e) => setStepIcon(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    >
                      <option value="Compass">Compass (Discovery)</option>
                      <option value="Layers">Layers (Prototyping)</option>
                      <option value="Cpu">Cpu (Full-Stack & AI)</option>
                      <option value="Rocket">Rocket (Deploy & Scale)</option>
                      <option value="Workflow">Workflow (Automation)</option>
                      <option value="ShieldCheck">ShieldCheck (Security)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Step Description
                  </label>
                  <textarea
                    rows={2}
                    value={stepDescription}
                    onChange={(e) => setStepDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Key Bullet Deliverables (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={stepBulletsText}
                    onChange={(e) => setStepBulletsText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                  />
                </div>

                <button
                  onClick={handleSaveStep}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs font-mono bg-brand-blue text-white"
                >
                  Save Process Step
                </button>
              </div>
            )}

            {/* Steps List */}
            <div className="space-y-3">
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-cyan">
                        PHASE {step.stepNumber}
                      </span>
                      <span className="font-heading font-bold text-sm text-white">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditStep(step)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete step ${step.stepNumber}?`)) {
                          deleteProcessStep(step.id);
                          showBanner("Step deleted.");
                        }
                      }}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 6: TESTIMONIALS
        ------------------------------------------------------------- */}
        {activeTab === "testimonials" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Client Testimonials
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage executive feedback and partner endorsements.
                </p>
              </div>
              <button
                onClick={() => startEditTestimonial()}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-brand-blue text-white flex items-center gap-1.5 hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            {/* Testimonial Form */}
            {editingTestimonial && (
              <div className="p-6 rounded-3xl glass-card bg-slate-900 border border-brand-blue/50 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-heading font-bold text-base text-white">
                    {testimonials.find((t) => t.id === editingTestimonial.id) ? "Edit Testimonial" : "New Testimonial"}
                  </h3>
                  <button
                    onClick={() => setEditingTestimonial(null)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={testClientName}
                      onChange={(e) => setTestClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={testRole}
                      onChange={(e) => setTestRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={testCompany}
                      onChange={(e) => setTestCompany(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Rating (1-5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={testRating}
                      onChange={(e) => setTestRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Quote Statement
                  </label>
                  <textarea
                    rows={3}
                    value={testQuote}
                    onChange={(e) => setTestQuote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleSaveTestimonial}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs font-mono bg-brand-blue text-white"
                >
                  Save Testimonial
                </button>
              </div>
            )}

            {/* Testimonials List */}
            <div className="space-y-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{t.clientName}</span>
                      <span className="text-xs text-brand-cyan">({t.role}, {t.company})</span>
                      <div className="flex items-center gap-0.5 ml-2">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 italic mt-1">&quot;{t.quote}&quot;</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditTestimonial(t)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete testimonial from ${t.clientName}?`)) {
                          deleteTestimonial(t.id);
                          showBanner("Testimonial deleted.");
                        }
                      }}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 7: LEADS & INQUIRIES
        ------------------------------------------------------------- */}
        {activeTab === "leads" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Client Scope Inquiries
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Inquiries submitted directly via the Project Cost Estimator and Contact form.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                {["ALL", "NEW", "CONTACTED", "CLOSED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      leadStatusFilter === st
                        ? "bg-brand-blue text-white font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs glass-panel rounded-3xl">
                  No inquiries match the &apos;{leadStatusFilter}&apos; filter.
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 sm:p-6 rounded-3xl glass-panel bg-slate-900/70 border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-base text-white">
                            {lead.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                              lead.status === "NEW"
                                ? "bg-brand-blue/20 text-brand-cyan border border-brand-blue/40"
                                : lead.status === "CONTACTED"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : lead.status === "CLOSED"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />
                            {lead.email}
                          </span>
                          {lead.company && (
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3 text-slate-500" />
                              {lead.company}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status Buttons */}
                      <div className="flex items-center gap-2">
                        {lead.status !== "NEW" && (
                          <button
                            onClick={() => {
                              updateLeadStatus(lead.id, "NEW");
                              showBanner("Inquiry marked as NEW");
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700"
                          >
                            Mark New
                          </button>
                        )}
                        {lead.status !== "CONTACTED" && (
                          <button
                            onClick={() => {
                              updateLeadStatus(lead.id, "CONTACTED");
                              showBanner("Inquiry marked as CONTACTED");
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                          >
                            Contacted
                          </button>
                        )}
                        {lead.status !== "CLOSED" && (
                          <button
                            onClick={() => {
                              updateLeadStatus(lead.id, "CLOSED");
                              showBanner("Inquiry marked as CLOSED");
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                          >
                            Closed
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Delete lead from ${lead.name}?`)) {
                              deleteLead(lead.id);
                              showBanner("Lead deleted.");
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Scope details */}
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Architecture:</span>
                        <span className="text-brand-cyan">{lead.serviceType}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Estimated Range:</span>
                        <span className="text-white font-bold">{lead.budgetRange}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Timeline:</span>
                        <span className="text-slate-300">{lead.timeline}</span>
                      </div>
                    </div>

                    {lead.features && lead.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {lead.features.map((f, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                      &quot;{lead.message}&quot;
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 8: SITE BRANDING SETTINGS
        ------------------------------------------------------------- */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white">
                  Site Branding & Theme Settings
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Global studio names, status badge, theme tokens, and direct contact endpoints.
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs font-mono bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Branding</span>
              </button>
            </div>

            <div className="glass-panel bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Studio Brand Name
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Logo Monogram (2-3 Chars)
                  </label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Live System Status Pill Text (Navbar & Footer)
                </label>
                <input
                  type="text"
                  value={statusBadgeText}
                  onChange={(e) => setStatusBadgeText(e.target.value)}
                  placeholder="All Systems Operational"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Global Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Footer Description
                </label>
                <textarea
                  rows={2}
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Direct Phone Line
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Studio Headquarters Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={copyrightText}
                  onChange={(e) => setCopyrightText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
