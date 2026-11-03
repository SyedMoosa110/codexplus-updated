"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Background Pixel Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Radial Cursor Follower Light */}
      <motion.div
        className="pointer-events-none fixed z-10 hidden md:block rounded-full mix-blend-screen opacity-20 filter blur-3xl transition-opacity duration-300"
        style={{
          width: 500,
          height: 500,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.8) 0%, rgba(79,70,229,0.5) 40%, rgba(6,182,212,0.2) 70%, transparent 80%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
