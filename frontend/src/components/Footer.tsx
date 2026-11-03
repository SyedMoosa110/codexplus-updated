"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowUp, Mail, Phone, MapPin, Globe } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function Footer() {
  const { settings } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = settings.navLinks && settings.navLinks.length > 0
    ? settings.navLinks
    : [
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Estimator", href: "#estimator" },
      ];

  const footerLinks = settings.footerLinks && settings.footerLinks.length > 0
    ? settings.footerLinks
    : [
        { label: "Admin Control Center", href: "/admin" },
        { label: "Operator Login", href: "/admin/login" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ];

  return (
    <footer id="contact" className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1 & 2: Brand & Tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan shadow-md">
                <span className="font-mono font-bold text-white text-sm">
                  {settings.logoText || "CX"}
                </span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                {settings.siteName || "CodeXplus"}
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
              {settings.footerText || settings.tagline ||
                "Engineering High-Performance Digital Products, Biometric Security & Modern Enterprise Platforms."}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{settings.statusBadgeText || "All Systems Operational"} (99.98% Global Uptime)</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform & Admin */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Internal & CMS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-brand-cyan flex items-center gap-1.5 transition-colors"
                  >
                    {link.href.includes("admin") && <Terminal className="w-3.5 h-3.5" />}
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Direct Inquiries */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span className="text-slate-300">{settings.contactEmail || "contact@codexplus.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span className="text-slate-300">{settings.phone || "+1 (800) 555-0199"}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-[11px] leading-tight">
                  {settings.address || "Silicon Valley & New York, USA"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {settings.copyrightText || `${settings.siteName || "CodeXplus"} Studio. All rights reserved.`}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
