"use client";

import React, { useMemo } from "react";
import {
  Code2,
  Database,
  Layers,
  Sparkles,
  Cpu,
  Boxes,
  Terminal,
  Zap,
  Shield,
  Eye,
  Server,
  Workflow,
  Globe,
} from "lucide-react";
import { useData } from "@/lib/data-context";

const iconMap: Record<string, any> = {
  Zap,
  Code2,
  Server,
  Database,
  Terminal,
  Layers,
  Sparkles,
  Eye,
  Shield,
  Cpu,
  Boxes,
  Workflow,
};

export default function TechMarquee() {
  const { settings } = useData();

  const stack = useMemo(() => {
    return settings.techStack && settings.techStack.length > 0
      ? settings.techStack
      : [
          { name: "Next.js 15", icon: "Zap", color: "text-white" },
          { name: "React 19", icon: "Code2", color: "text-cyan-400" },
          { name: "Node.js & Fastify", icon: "Server", color: "text-emerald-400" },
          { name: "PostgreSQL & Prisma", icon: "Database", color: "text-blue-400" },
          { name: "TypeScript 5.7", icon: "Terminal", color: "text-blue-500" },
          { name: "Tailwind CSS", icon: "Layers", color: "text-teal-400" },
          { name: "Framer Motion", icon: "Sparkles", color: "text-purple-400" },
          { name: "UI/UX Pro Max", icon: "Eye", color: "text-pink-400" },
          { name: "Biometric Vision AI", icon: "Shield", color: "text-amber-400" },
          { name: "Distributed Redis", icon: "Cpu", color: "text-rose-400" },
          { name: "Enterprise Microservices", icon: "Boxes", color: "text-indigo-400" },
          { name: "CI/CD & Kubernetes", icon: "Workflow", color: "text-sky-400" },
        ];
  }, [settings.techStack]);

  const doubleStack = [...stack, ...stack];

  return (
    <section className="relative py-8 bg-slate-950/70 border-y border-slate-800/80 overflow-hidden backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {doubleStack.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Globe;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 mx-5 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors group cursor-default"
            >
              <IconComponent className={`w-4 h-4 ${item.color || "text-brand-cyan"} group-hover:scale-110 transition-transform`} />
              <span className="font-mono text-xs font-semibold text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
