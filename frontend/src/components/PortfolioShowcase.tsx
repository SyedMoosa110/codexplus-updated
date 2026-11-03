"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  X,
  Calendar,
  Building,
} from "lucide-react";
import { useData } from "@/lib/data-context";
import { Project } from "@/types";

export default function PortfolioShowcase() {
  const { projects } = useData();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const publishedProjects = useMemo(() => {
    return projects.filter((p) => p.isPublished !== false);
  }, [projects]);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    publishedProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [publishedProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return publishedProjects;
    return publishedProjects.filter((p) => p.category === activeCategory);
  }, [publishedProjects, activeCategory]);

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-brand-blue/30 text-xs font-mono text-brand-cyan mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SELECTED CASE STUDIES</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Engineered for Scale & Conversion
          </h2>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 relative ${
                activeCategory === cat
                  ? "text-white font-semibold shadow-md shadow-brand-blue/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-blue to-brand-indigo -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filterable Project Cards Grid with Layout Animations */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl glass-card bg-slate-900/70 border border-slate-800 hover:border-brand-blue/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-brand-blue/15"
            >
              {/* Cover Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <Image
                  src={project.coverImage || "/demo/project-1.webp"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                {/* Category & Year Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white bg-slate-900/80 backdrop-blur-md border border-slate-700/80">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur-md border border-slate-800">
                    {project.year}
                  </span>
                </div>

                {/* Quick View Button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-brand-blue transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Metrics Overlay Chips */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-[11px] font-mono text-slate-200"
                      >
                        <span className="text-brand-cyan font-bold mr-1">{m.value}</span>
                        <span className="text-slate-400">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-brand-cyan transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">{project.client}</p>
                  <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {project.tags?.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 bg-slate-800/60 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags && project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Modal / Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-nav bg-slate-950/95 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full glass-panel hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-white bg-brand-blue/30 border border-brand-blue/60">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {selectedProject.year}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> {selectedProject.client}
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
                {selectedProject.title}
              </h2>

              {/* Cover Image in Modal */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-6 border border-slate-800">
                <Image
                  src={selectedProject.coverImage || "/demo/project-1.webp"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* High-Impact Metrics Grid */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col text-center">
                      <span className="font-mono font-bold text-xl sm:text-2xl text-gradient-brand">
                        {m.value}
                      </span>
                      <span className="text-xs text-slate-400 mt-1">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architectural Overview */}
              <div className="mb-6">
                <h4 className="font-heading font-semibold text-base text-white mb-2">
                  System Architecture & Solution
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.description || selectedProject.summary}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="mb-8">
                <h4 className="font-heading font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2.5">
                  Core Engineering Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono text-slate-200 bg-slate-800/80 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-blue-500 hover:to-indigo-500 transition-colors shadow-md"
                  >
                    <span>Launch Demonstration</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs text-slate-300 glass-panel hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                <a
                  href="#estimator"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-xs text-slate-300 glass-panel hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  <span>Build Similar System</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
