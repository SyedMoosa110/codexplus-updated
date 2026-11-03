"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Palette,
  ShoppingBag,
  LayoutDashboard,
  BarChart3,
  ScanFace,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Server,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import { useData } from "@/lib/data-context";
import { Service } from "@/types";

// Individual Card with Mouse-Tracking Spotlight Glow
function BentoCard({
  service,
  index,
  children,
}: {
  service: Service;
  index: number;
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl p-6 sm:p-8 glass-card bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        service.gridSpan || "col-span-1"
      }`}
    >
      {/* Mouse Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.18), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header with Icon, Badge and Order Tag */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-brand-cyan group-hover:text-white group-hover:bg-brand-blue/30 group-hover:border-brand-blue/60 transition-all duration-300 shadow-inner">
              {getIconComponent(service.icon)}
            </div>
            {service.badge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-brand-blue/20 text-brand-cyan border border-brand-blue/40 uppercase font-semibold">
                {service.badge}
              </span>
            )}
          </div>
          <span className="font-mono text-xs font-semibold text-slate-500 group-hover:text-slate-400 transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2.5 group-hover:text-brand-cyan transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {service.summary}
        </p>

        {/* Custom Visual Interactive Widget for each Service */}
        <div className="my-4">{children}</div>
      </div>

      {/* Feature Bullet Points & Action */}
      <div className="relative z-10 pt-4 mt-auto border-t border-slate-800/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {service.features?.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0" />
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>

        <a
          href="#estimator"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-white transition-colors"
        >
          <span>Calculate Service Scope</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

function getIconComponent(iconName: string) {
  switch (iconName) {
    case "Code":
      return <Code className="w-6 h-6" />;
    case "Palette":
      return <Palette className="w-6 h-6" />;
    case "ShoppingBag":
      return <ShoppingBag className="w-6 h-6" />;
    case "LayoutDashboard":
      return <LayoutDashboard className="w-6 h-6" />;
    case "BarChart3":
      return <BarChart3 className="w-6 h-6" />;
    case "ScanFace":
      return <ScanFace className="w-6 h-6" />;
    default:
      return <Sparkles className="w-6 h-6" />;
  }
}

// -------------------------------------------------------------
// Visual 1: Animated Node Flow Diagram (Web Apps)
// -------------------------------------------------------------
function FlowDiagramVisual() {
  return (
    <div className="relative h-28 bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between overflow-hidden">
      <div className="flex flex-col items-center z-10">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400">
          <Layers className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 mt-1">Client Edge</span>
      </div>

      <div className="flex-1 mx-2 relative h-1 bg-slate-800 rounded">
        <motion.div
          className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-brand-cyan to-transparent rounded"
          animate={{ x: ["-10%", "150%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col items-center z-10">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
          <Server className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 mt-1">API Cluster</span>
      </div>

      <div className="flex-1 mx-2 relative h-1 bg-slate-800 rounded">
        <motion.div
          className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-brand-blue to-transparent rounded"
          animate={{ x: ["-10%", "150%"] }}
          transition={{ duration: 2, delay: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col items-center z-10">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
          <Database className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 mt-1">Postgres Pool</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visual 2: Live Color/Theme Switcher Preview (UI/UX)
// -------------------------------------------------------------
function ThemeSwitcherVisual() {
  const [selectedTheme, setSelectedTheme] = useState<"cyan" | "indigo" | "emerald" | "amber">("cyan");

  const themes = {
    cyan: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/50", light: "bg-cyan-500/20" },
    indigo: { bg: "bg-indigo-500", text: "text-indigo-400", border: "border-indigo-500/50", light: "bg-indigo-500/20" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/50", light: "bg-emerald-500/20" },
    amber: { bg: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/50", light: "bg-amber-500/20" },
  };

  const current = themes[selectedTheme];

  return (
    <div className="relative h-28 bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">Design Token Preview:</span>
        <div className="flex items-center gap-1.5">
          {(["cyan", "indigo", "emerald", "amber"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTheme(t)}
              className={`w-4 h-4 rounded-full transition-transform ${themes[t].bg} ${
                selectedTheme === t ? "scale-125 ring-2 ring-white" : "opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>

      <div className={`p-2.5 rounded-xl border ${current.border} ${current.light} flex items-center justify-between transition-colors duration-300`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${current.bg}`} />
          <span className={`text-xs font-semibold ${current.text}`}>
            Interactive Design System
          </span>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${current.bg} text-slate-950 font-bold uppercase`}>
          Active Token
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visual 3: Storefront & Conversion Counter (E-Commerce)
// -------------------------------------------------------------
function EcommerceVisual() {
  return (
    <div className="relative h-28 bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-slate-400">Live Global Storefront</span>
        <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> +46% Lift
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">Daily GMV</span>
          <span className="text-sm font-bold font-mono text-white">$48,920.00</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">Conversion Rate</span>
          <span className="text-sm font-bold font-mono text-brand-cyan">4.82%</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
        <span>Cart Checkout: &lt;320ms</span>
        <span className="text-emerald-400">● 14 Orders in Flight</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visual 4: Live Toggle Animation (Custom CMS)
// -------------------------------------------------------------
function CmsToggleVisual() {
  const [isPublished, setIsPublished] = useState(true);

  return (
    <div className="relative h-28 bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">Content Synchronization:</span>
        <button
          onClick={() => setIsPublished(!isPublished)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 p-0.5 ${
            isPublished ? "bg-emerald-500" : "bg-slate-700"
          }`}
        >
          <motion.div
            layout
            className="w-5 h-5 rounded-full bg-white shadow-md"
            style={{ marginLeft: isPublished ? "20px" : "0px" }}
          />
        </button>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isPublished ? "bg-emerald-400 animate-ping" : "bg-amber-400"
            }`}
          />
          <span className="text-xs font-mono text-slate-200">
            {isPublished ? "Live Production CDN" : "Draft Staging Preview"}
          </span>
        </div>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
            isPublished
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
          }`}
        >
          {isPublished ? "PUBLISHED" : "DRAFT"}
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visual 5: Animated Financial Bar Chart (Enterprise ERP)
// -------------------------------------------------------------
function FinancialBarChartVisual() {
  const bars = [
    { label: "Q1", height: "45%", val: "$1.2M" },
    { label: "Q2", height: "65%", val: "$1.8M" },
    { label: "Q3", height: "80%", val: "$2.4M" },
    { label: "Q4", height: "95%", val: "$3.1M" },
    { label: "Target", height: "100%", val: "$3.5M" },
  ];

  return (
    <div className="relative h-28 bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">Quarterly Ledger Reconciliation</span>
        <span className="text-brand-blue font-bold">100% Balanced</span>
      </div>

      <div className="flex items-end justify-between gap-3 h-14 px-2">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: b.height }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`w-full rounded-t-md transition-colors ${
                i === 4
                  ? "bg-gradient-to-t from-brand-indigo to-brand-cyan"
                  : "bg-slate-700 group-hover/bar:bg-brand-blue"
              }`}
            />
            <span className="text-[9px] font-mono text-slate-400">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visual 6: Face-Scan Bounding Box & Payroll (Biometric Attendance)
// -------------------------------------------------------------
function BiometricScannerVisual() {
  return (
    <div className="relative h-28 bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex items-center justify-between overflow-hidden">
      <div className="relative w-20 h-20 rounded-xl border-2 border-emerald-500/60 bg-emerald-500/5 flex items-center justify-center">
        <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-400 animate-scan-line" />
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-emerald-400" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-emerald-400" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-emerald-400" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-emerald-400" />
        <ScanFace className="w-8 h-8 text-emerald-400/80" />
      </div>

      <div className="flex-1 pl-3 flex flex-col justify-between h-full py-0.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400">Match Accuracy</span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">99.96%</span>
        </div>
        <div className="text-xs font-mono font-semibold text-slate-200">
          Timestamp: 08:59:42 AM
        </div>
        <div className="p-1 px-2 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
          Automated Payroll Sync: OK
        </div>
      </div>
    </div>
  );
}

function renderServiceVisual(type: string, index: number) {
  switch (type) {
    case "flow":
      return <FlowDiagramVisual />;
    case "theme":
      return <ThemeSwitcherVisual />;
    case "ecommerce":
      return <EcommerceVisual />;
    case "cms":
      return <CmsToggleVisual />;
    case "finance":
      return <FinancialBarChartVisual />;
    case "biometric":
      return <BiometricScannerVisual />;
    default:
      if (index === 0) return <FlowDiagramVisual />;
      if (index === 1) return <ThemeSwitcherVisual />;
      if (index === 2) return <EcommerceVisual />;
      if (index === 3) return <CmsToggleVisual />;
      if (index === 4) return <FinancialBarChartVisual />;
      return <BiometricScannerVisual />;
  }
}

export default function BentoServices() {
  const { services } = useData();

  const publishedServices = services.filter((s) => s.isPublished !== false);

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-blue/30 text-xs font-mono text-brand-cyan mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SPECIALIZED CAPABILITIES</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Engineering Architecture & Product Solutions
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Specialized engineering divisions delivering high-performance full-stack applications, biometric security, and enterprise infrastructure.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {publishedServices.map((service, index) => (
          <BentoCard key={service.id || index} service={service} index={index}>
            {renderServiceVisual(service.visualType, index)}
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
