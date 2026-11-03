"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Quote, Building2 } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function TestimonialsSection() {
  const { testimonials } = useData();

  const published = useMemo(() => {
    return testimonials.filter((t) => t.isPublished !== false);
  }, [testimonials]);

  if (published.length === 0) return null;

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-blue/30 text-xs font-mono text-brand-cyan mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CLIENT VALIDATION</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Trusted by Engineering Leaders
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          How our high-frequency architectures and biometric solutions deliver tangible outcomes for enterprise partners.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {published.map((t, index) => (
          <motion.div
            key={t.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="p-8 rounded-3xl glass-card bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <Quote className="w-8 h-8 text-brand-blue/40 mb-3" />
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                &quot;{t.quote}&quot;
              </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-sm text-white">{t.clientName}</div>
                <div className="text-xs text-brand-cyan">{t.role}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 justify-end">
                  <Building2 className="w-3 h-3 text-slate-500" />
                  {t.company}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
