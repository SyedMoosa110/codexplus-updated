"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, Shield, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, backendStatus } = useData();

  const [email, setEmail] = useState("admin@codexplus.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    try {
      // Attempt backend auth if active
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token, data.user);
        router.push("/admin");
        return;
      }
    } catch {
      // Backend not running; fallback mode check
    }

    // Local Fallback Authentication
    if (
      (email.toLowerCase() === "admin@codexplus.com" && password === "admin123") ||
      password === "admin123"
    ) {
      const mockToken = `local_token_${Date.now()}`;
      const mockUser = {
        id: "usr-admin",
        email: email.toLowerCase(),
        name: "CodeXplus Administrator",
        role: "ADMIN",
      };
      login(mockToken, mockUser);
      router.push("/admin");
    } else {
      setError("Invalid credentials. Please use admin@codexplus.com / admin123");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg shadow-brand-blue/30">
              <span className="font-mono font-bold text-white text-base">CX</span>
            </div>
            <span className="font-heading font-bold text-2xl text-white">CodeXplus</span>
          </Link>
          <p className="text-xs font-mono text-slate-400">
            ENTERPRISE CMS & OPERATOR CONTROL CENTER
          </p>
        </div>

        {/* Card */}
        <div className="glass-nav bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-cyan" />
              <h2 className="font-heading font-semibold text-base text-white">
                Admin Authentication
              </h2>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {backendStatus.isConnected ? "API ONLINE" : "LOCAL ENGINE"}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-brand-blue/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? "Verifying..." : "Access Control Center"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              Default Credentials:
            </span>
            <div className="text-xs font-mono text-brand-cyan">
              admin@codexplus.com <span className="text-slate-500">/</span> admin123
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
