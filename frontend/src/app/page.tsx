import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import BentoServices from "@/components/BentoServices";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import CostEstimatorContact from "@/components/CostEstimatorContact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-slate-100 overflow-x-hidden">
      {/* Interactive Cursor Follower & Grid Background */}
      <CursorGlow />

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Hero Section with Live Auto-Typing macOS Terminal & 3D Glass Cards */}
      <Hero />

      {/* Infinite Scrolling Tech Stack Marquee */}
      <TechMarquee />

      {/* 6-Card Interactive Bento Grid Services */}
      <BentoServices />

      {/* Interactive Portfolio Showcase with Filter Pills & Live Case Study Modal */}
      <PortfolioShowcase />

      {/* Scroll-Linked Process Timeline with Glowing Progress Beam */}
      <ProcessTimeline />

      {/* Client Testimonials Section */}
      <TestimonialsSection />

      {/* Interactive Project Cost Estimator & Contact Form */}
      <CostEstimatorContact />

      {/* Enterprise Footer */}
      <Footer />
    </main>
  );
}
