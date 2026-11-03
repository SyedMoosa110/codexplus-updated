"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Building,
  Mail,
  User,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { useData } from "@/lib/data-context";

interface FeatureOption {
  id: string;
  name: string;
  price: number;
}

const DEFAULT_FEATURE_OPTIONS: FeatureOption[] = [
  { id: "rbac", name: "Multi-Tenant RBAC & Security Matrix", price: 3500 },
  { id: "websockets", name: "Real-Time WebSockets & Telemetry", price: 4000 },
  { id: "biometrics", name: "Edge AI Biometric Sensor Sync", price: 6500 },
  { id: "payments", name: "Multi-Currency Stripe & Tax Rails", price: 3000 },
  { id: "infra", name: "Automated Multi-Region CI/CD Pipeline", price: 3500 },
  { id: "analytics", name: "Executive BI Analytics & Audit Logs", price: 3200 },
];

const TIMELINE_OPTIONS = [
  { id: "rush", name: "Rapid Sprint (2–4 Weeks)", multiplier: 1.25 },
  { id: "standard", name: "Standard (6–8 Weeks)", multiplier: 1.0 },
  { id: "enterprise", name: "Enterprise Multi-Phase (3–5 Months)", multiplier: 0.95 },
];

export default function CostEstimatorContact() {
  const { services, submitInquiry } = useData();

  // Dynamic Service Options derived from Services database state
  const serviceOptions = useMemo(() => {
    if (services && services.length > 0) {
      return services.map((s, idx) => ({
        id: s.id,
        name: s.title,
        basePrice: 12000 + (idx * 3000),
      }));
    }
    return [
      { id: "web", name: "Custom Web & Full-Stack Applications", basePrice: 15000 },
      { id: "uiux", name: "UI/UX Pro Max Design & Branding", basePrice: 8000 },
      { id: "ecommerce", name: "E-Commerce & Headless Storefronts", basePrice: 18000 },
      { id: "cms", name: "Custom CMS & Dynamic Portals", basePrice: 12000 },
      { id: "erp", name: "Enterprise Accounts & ERP Software", basePrice: 26000 },
      { id: "biometric", name: "Smart Biometric & Facial Attendance", basePrice: 22000 },
    ];
  }, [services]);

  // Estimator States
  const [selectedService, setSelectedService] = useState<string>(
    serviceOptions[0]?.id || "web"
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "rbac",
    "websockets",
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Toggle Feature
  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Live Calculation
  const calculation = useMemo(() => {
    const serviceObj =
      serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0];
    const featuresTotal = selectedFeatures.reduce((acc, featId) => {
      const feat = DEFAULT_FEATURE_OPTIONS.find((f) => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);

    const timelineObj =
      TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline) || TIMELINE_OPTIONS[1];

    const rawTotal =
      ((serviceObj?.basePrice || 15000) + featuresTotal) * timelineObj.multiplier;
    const minPrice = Math.round(rawTotal * 0.9);
    const maxPrice = Math.round(rawTotal * 1.15);

    return {
      serviceName: serviceObj?.name || "Full-Stack Application",
      minPrice,
      maxPrice,
      timelineName: timelineObj.name,
    };
  }, [serviceOptions, selectedService, selectedFeatures, selectedTimeline]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    try {
      const selectedFeatureNames = selectedFeatures.map(
        (id) => DEFAULT_FEATURE_OPTIONS.find((f) => f.id === id)?.name || id
      );

      const lead = await submitInquiry({
        name,
        email,
        company,
        serviceType: calculation.serviceName,
        budgetRange: `$${calculation.minPrice.toLocaleString()} – $${calculation.maxPrice.toLocaleString()}`,
        timeline: calculation.timelineName,
        features: selectedFeatureNames,
        message,
      });

      setSubmittedLeadId(lead.id);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-blue/30 text-xs font-mono text-brand-cyan mb-4">
          <Calculator className="w-3.5 h-3.5" />
          <span>INSTANT SCOPE ESTIMATOR</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Calculate Your Project & Initiate Build
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Select your architectural requirements to generate a transparent price estimate and directly schedule an engineering consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Estimator Controls (7 cols) */}
        <div className="lg:col-span-7 glass-panel bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
          
          {/* Step 1: Service Type Selection */}
          <div className="mb-8">
            <label className="block text-xs font-mono font-semibold text-brand-cyan uppercase tracking-wider mb-3">
              1. Select Primary Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceOptions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedService(s.id)}
                  className={`text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                    selectedService === s.id
                      ? "bg-brand-blue/20 border-brand-blue text-white shadow-md shadow-brand-blue/20 ring-1 ring-brand-blue"
                      : "bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    Base: ${s.basePrice.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Feature Matrix Checkboxes */}
          <div className="mb-8">
            <label className="block text-xs font-mono font-semibold text-brand-cyan uppercase tracking-wider mb-3">
              2. Add Advanced Modules & Infrastructure
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEFAULT_FEATURE_OPTIONS.map((f) => {
                const isChecked = selectedFeatures.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFeature(f.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                      isChecked
                        ? "bg-slate-800/80 border-brand-cyan/60 text-white"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked
                            ? "bg-brand-cyan border-brand-cyan text-slate-950"
                            : "border-slate-700 bg-slate-900"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                      </div>
                      <span className="truncate">{f.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 ml-2">
                      +${f.price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Timeline Delivery */}
          <div>
            <label className="block text-xs font-mono font-semibold text-brand-cyan uppercase tracking-wider mb-3">
              3. Target Delivery Window
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMELINE_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTimeline(t.id)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-center ${
                    selectedTimeline === t.id
                      ? "bg-brand-indigo/20 border-brand-indigo text-white ring-1 ring-brand-indigo"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Estimate Card & Direct Inquiry Form (5 cols) */}
        <div className="lg:col-span-5 glass-nav bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
          
          {/* Top Estimate Price Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-blue/20 via-slate-900 to-brand-indigo/10 border border-brand-blue/40 mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Estimated Budget Bracket:</span>
              <span className="text-emerald-400 font-semibold">Live Calculated</span>
            </div>

            <div className="font-mono font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              ${calculation.minPrice.toLocaleString()}{" "}
              <span className="text-slate-400 text-lg font-normal">—</span>{" "}
              ${calculation.maxPrice.toLocaleString()}
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs font-mono text-brand-cyan">
              <Clock className="w-3.5 h-3.5" />
              <span>Paced for {calculation.timelineName}</span>
            </div>
          </div>

          {/* Form / Submitted Success View */}
          <AnimatePresence mode="wait">
            {submittedLeadId ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center justify-center my-auto"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">
                  Inquiry Dispatched Successfully!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 max-w-sm">
                  Our principal engineering lead will review your scope requirements and contact you at{" "}
                  <span className="text-white font-semibold">{email}</span> within 24 hours.
                </p>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  Lead Reference ID: {submittedLeadId}
                </span>
                <button
                  onClick={() => setSubmittedLeadId(null)}
                  className="mt-6 text-xs text-brand-cyan hover:underline font-mono"
                >
                  Submit Another Scope Request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sarah Jenkins"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Vanguard Capital"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Project Details & Goals *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe what you are looking to engineer..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-blue via-blue-600 to-brand-indigo hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-brand-blue/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Registering Scope Inquiry...</span>
                  ) : (
                    <>
                      <span>Lock Estimate & Request Consultation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Strict NDA Protected • Sub-24h Engineer Response</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
