"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Cpu, Layers, Rocket, ShieldCheck, Workflow, CheckCircle2 } from "lucide-react";
import { useData } from "@/lib/data-context";

const iconMap: Record<string, any> = {
  Compass,
  Layers,
  Cpu,
  Rocket,
  ShieldCheck,
  Workflow,
};

export default function ProcessTimeline() {
  const { processSteps } = useData();

  const steps = useMemo(() => {
    const list = processSteps.filter((s) => s.isPublished !== false);
    return list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }, [processSteps]);

  return (
    <section id="process" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-blue/30 text-xs font-mono text-brand-cyan mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENGINEERING BLUEPRINT</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          How We Ship Enterprise Platforms
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          A disciplined, phased engineering methodology designed for speed, resilience, and measurable business impact.
        </p>
      </div>

      {/* Timeline Container with Glowing Vertical Center Beam */}
      <div className="relative">
        {/* Glowing Center Progress Beam */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-slate-800">
          <motion.div
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-brand-cyan via-brand-blue to-brand-indigo shadow-[0_0_15px_rgba(6,182,212,0.8)]"
          />
        </div>

        {/* Steps Stack */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || Compass;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.id || step.stepNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Box */}
                <div className="w-full md:w-1/2 md:px-8">
                  <div className="p-6 sm:p-8 rounded-3xl glass-card bg-slate-900/60 border border-slate-800/80 hover:border-brand-blue/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-brand-blue/20 text-brand-cyan border border-brand-blue/40">
                        PHASE {step.stepNumber}
                      </span>
                      <IconComponent className="w-5 h-5 text-brand-blue" />
                    </div>

                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {step.bullets && step.bullets.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-slate-800/80">
                        {step.bullets.map((b, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Center Node Badge */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass-panel bg-slate-950 border-2 border-brand-blue items-center justify-center text-white font-mono font-bold text-sm shadow-xl shadow-brand-blue/30 z-10">
                  {step.stepNumber}
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
