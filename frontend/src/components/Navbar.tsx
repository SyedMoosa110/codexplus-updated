"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function Navbar() {
  const { settings, backendStatus } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = settings.navLinks && settings.navLinks.length > 0
    ? settings.navLinks
    : [
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Estimator", href: "#estimator" },
        { label: "Contact", href: "#contact" },
      ];

  const logoText = settings.logoText || "CX";
  const statusBadgeText = settings.statusBadgeText || "All Systems Operational";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex items-center justify-between gap-4 md:gap-8 rounded-full px-5 py-2.5 transition-all duration-300 ${
            scrolled
              ? "glass-nav shadow-2xl shadow-black/60 border border-slate-700/80 bg-slate-950/85 backdrop-blur-xl"
              : "glass-panel border border-slate-800/80 bg-slate-900/60 backdrop-blur-md"
          }`}
          style={{ maxWidth: "1080px", width: "100%" }}
        >
          {/* Logo with Dynamic Text & Glowing Mark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-indigo to-brand-cyan shadow-md shadow-brand-blue/30 group-hover:shadow-brand-cyan/50 transition-all duration-300">
              <span className="font-mono font-bold text-white text-base tracking-tighter">
                {logoText}
              </span>
              <div className="absolute inset-0 rounded-xl bg-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-white group-hover:text-brand-cyan transition-colors">
                {settings.siteName || "CodeXplus"}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                {settings.tagline ? settings.tagline.slice(0, 24) : "Software Lab"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950/40 border border-slate-800/60 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150 rounded-full hover:bg-slate-800/60"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Status Badge & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Operational Status Badge */}
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-300"
              title={
                backendStatus.isConnected
                  ? `Node.js Backend & PostgreSQL Active (${backendStatus.database || "Connected"})`
                  : "Client-Side Fallback Engine Active (Zero-Latency LocalStorage)"
              }
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-200">
                {backendStatus.isConnected ? "Live API Connected" : statusBadgeText}
              </span>
            </div>

            {/* Admin Dashboard Pill */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Admin</span>
            </Link>

            {/* Magnetic Gradient CTA Button */}
            <a
              href={settings.heroCtaPrimaryLink || "#estimator"}
              className="relative group inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-medium text-xs text-white bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all duration-200 active:scale-95"
            >
              <span>{settings.heroCtaPrimaryText || "Get Estimate"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/admin"
              className="px-2.5 py-1 text-xs font-mono text-slate-400 bg-slate-800/60 rounded-full border border-slate-700"
            >
              Admin
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl p-6 glass-nav bg-slate-950/95 border border-slate-800 shadow-2xl flex flex-col gap-4 sm:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-3">
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-mono text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>● {statusBadgeText}</span>
              </div>
              <a
                href={settings.heroCtaPrimaryLink || "#estimator"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-brand-blue to-brand-indigo"
              >
                {settings.heroCtaPrimaryText || "Project Cost Estimator"}
              </a>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-mono text-xs text-slate-300 bg-slate-900 border border-slate-800"
              >
                Open Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
