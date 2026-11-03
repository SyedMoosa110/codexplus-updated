"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ScanFace,
  BarChart2,
  Terminal,
} from "lucide-react";
import { useData } from "@/lib/data-context";

export default function Hero() {
  const { settings } = useData();

  // Terminal Auto-Typing Simulation
  const terminalCommands = useMemo(() => {
    return settings.terminalLines && settings.terminalLines.length > 0
      ? settings.terminalLines
      : [
          "npx create-codexplus-app@latest enterprise-suite",
          "✔ Initialized Next.js 15, PostgreSQL & Fastify architecture",
          "✔ Biometric Facial Authentication pipeline active (99.94% precision)",
          "✔ Compiling high-frequency telemetry engine... Done in 32ms",
          "⚡ Ready on http://localhost:3000 — 0 vulnerabilities found",
        ];
  }, [settings.terminalLines]);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentLine = terminalCommands[currentLineIndex] || "";
    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText(currentLine.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => (prev + 1) % terminalCommands.length);
        }, 2200);
        return () => clearTimeout(timeout);
      }
    }, 38);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, terminalCommands]);

  // Words for staggered headline animation & dynamic highlighting
  const headlineWords = (
    settings.heroTitle ||
    "We Build Scalable Software, AI Systems & Modern Web Platforms"
  ).split(" ");

  const highlightedKeywords = useMemo(() => {
    const raw = settings.heroHighlightedWords || "Software, AI, Platforms";
    return raw
      .split(",")
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  }, [settings.heroHighlightedWords]);

  const stats = settings.stats && settings.stats.length > 0
    ? settings.stats
    : [
        { label: "Enterprise Deployments", value: "150+" },
        { label: "Production Uptime", value: "99.98%" },
        { label: "Average API Latency", value: "<50ms" },
        { label: "Processed Transactions", value: "$2.4B+" },
      ];

  const ctaPrimaryText = settings.heroCtaPrimaryText || "Launch Cost Estimator";
  const ctaPrimaryLink = settings.heroCtaPrimaryLink || "#estimator";
  const ctaSecondaryText = settings.heroCtaSecondaryText || "Explore Showcase";
  const ctaSecondaryLink = settings.heroCtaSecondaryLink || "#work";

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-brand-blue/20 via-brand-indigo/15 to-brand-cyan/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-brand-blue/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-blue/30 bg-slate-900/80 mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-wider text-slate-200 uppercase">
                {settings.heroBadge || "ENTERPRISE SOFTWARE & PRODUCT LAB"}
              </span>
            </motion.div>

            {/* Staggered Word-by-Word Animated Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12] mb-6">
              {headlineWords.map((word, i) => {
                const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
                const isHighlighted = highlightedKeywords.some((kw) => cleanWord.includes(kw));

                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 * i, ease: "easeOut" }}
                    className={
                      isHighlighted
                        ? "text-gradient-brand inline-block mr-2.5"
                        : "inline-block mr-2.5"
                    }
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>

            {/* High-Contrast Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8"
            >
              {settings.heroSubtitle ||
                "CodeXplus is an elite digital engineering studio crafting bespoke full-stack applications, biometric attendance ecosystems, enterprise ERPs, and conversion-engineered digital platforms."}
            </motion.p>

            {/* Dynamic CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href={ctaPrimaryLink}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-brand-blue via-blue-600 to-brand-indigo hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all duration-200 active:scale-95"
              >
                <span>{ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={ctaSecondaryLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm text-slate-300 hover:text-white glass-panel hover:bg-slate-800/80 border border-slate-700/70 transition-all duration-200"
              >
                <span>{ctaSecondaryText}</span>
              </a>
            </motion.div>

            {/* Animated Counter Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8 border-t border-slate-800/80"
            >
              {stats.map((s, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-mono font-bold text-2xl sm:text-3xl text-gradient-brand">
                    {s.value}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 font-medium">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Tilt Visual Stage with Live Terminal & Floating Glass Cards */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Live Auto-Typing macOS Terminal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full rounded-2xl glass-card bg-slate-950/80 border border-slate-700/80 shadow-2xl overflow-hidden relative z-20 backdrop-blur-xl"
            >
              {/* macOS Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                  <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>codexplus-core ~ zsh</span>
                </div>
                <div className="w-12 text-right">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 min-h-[190px] flex flex-col justify-between">
                <div>
                  <div className="text-slate-500 mb-2"># Live Telemetry & Microservices Engine</div>
                  
                  {/* Previous Commands History */}
                  <div className="space-y-1.5 opacity-70">
                    <div className="text-slate-400">
                      <span className="text-emerald-400">➜</span>{" "}
                      <span className="text-brand-cyan">codexplus</span> deploy --prod --region us-east
                    </div>
                    <div className="text-slate-400 text-xs">
                      [INFO] 12 services synchronized across multi-region cluster
                    </div>
                  </div>

                  {/* Active Auto-Typing Line */}
                  <div className="mt-3 text-slate-100 flex items-center flex-wrap">
                    <span className="text-emerald-400 mr-2">➜</span>
                    <span className="text-slate-100 font-semibold">{displayedText}</span>
                    <span
                      className={`inline-block w-2 h-4 ml-1 bg-brand-cyan ${
                        isTyping ? "opacity-100" : "animate-pulse"
                      }`}
                    />
                  </div>
                </div>

                {/* Terminal Footer Status */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>0 CVE Vulnerabilities</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">Latency: 18ms</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass Card 1: Facial Biometric Scanner Simulation */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -top-10 -right-4 sm:-right-8 w-64 glass-panel bg-slate-900/90 border border-brand-cyan/40 rounded-2xl p-3.5 shadow-2xl z-30 hidden sm:block animate-float-slow"
            >
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ScanFace className="w-4 h-4 text-brand-cyan" />
                  <span className="text-xs font-semibold text-slate-200">FaceID Sensor</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  MATCHED
                </span>
              </div>

              {/* Viewport simulation */}
              <div className="relative h-20 bg-slate-950/80 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/10 via-transparent to-brand-blue/10 pointer-events-none" />
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-0.5 bg-brand-cyan/40 animate-scan-line" />
                
                {/* Simulated Facial Mesh Markers */}
                <div className="w-12 h-12 border border-brand-cyan/60 rounded-xl relative flex items-center justify-center">
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-brand-cyan" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-brand-cyan" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-brand-cyan" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-brand-cyan" />
                  <ScanFace className="w-6 h-6 text-brand-cyan/70" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-slate-400">
                <span>Confidence: 99.94%</span>
                <span className="text-emerald-400 font-medium">0.18s Sync</span>
              </div>
            </motion.div>

            {/* Floating Glass Card 2: Live ERP Financial Revenue Graph */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -bottom-10 -left-4 sm:-left-8 w-64 glass-panel bg-slate-900/90 border border-brand-blue/40 rounded-2xl p-3.5 shadow-2xl z-30 hidden sm:block animate-float-slow"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-semibold text-slate-200">ERP Revenue Stream</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400">+34.8%</span>
              </div>

              <div className="text-lg font-bold font-mono text-white mb-1.5">
                $4,892,100 <span className="text-xs font-normal text-slate-400">/mo</span>
              </div>

              {/* Animated Mini SVG Sparkline */}
              <div className="h-10 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                  <defs>
                    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 25 Q 15 28 30 18 T 60 14 T 80 8 L 100 4 L 100 30 L 0 30 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M 0 25 Q 15 28 30 18 T 60 14 T 80 8 L 100 4"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="4" r="3" fill="#38BDF8" className="animate-ping" />
                  <circle cx="100" cy="4" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>

              <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-slate-400">
                <span>Direct Ledger Sync</span>
                <span className="text-brand-cyan">Active</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
