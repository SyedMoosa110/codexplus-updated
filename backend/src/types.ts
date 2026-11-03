export interface SiteSettingsData {
  id: string;
  siteName: string;
  logoText: string;
  statusBadgeText: string;
  tagline: string;
  heroBadge: string;
  heroTitle: string;
  heroHighlightedWords: string;
  heroSubtitle: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryLink: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryLink: string;
  stats: Array<{ label: string; value: string }>;
  terminalLines: string[];
  techStack: Array<{ name: string; icon: string; color: string }>;
  theme: {
    primary: string;
    indigo: string;
    cyan: string;
    background: string;
    surface: string;
  };
  navLinks: Array<{ label: string; href: string }>;
  footerLinks: Array<{ label: string; href: string }>;
  socialLinks: Array<{ label: string; href: string; icon?: string }>;
  footerText: string;
  copyrightText: string;
  contactEmail: string;
  phone: string;
  address: string;
}

export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  summary: string;
  badge: string;
  features: string[];
  icon: string;
  visualType: "flow" | "theme" | "ecommerce" | "cms" | "finance" | "biometric";
  gridSpan: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: "Web Apps" | "E-Commerce" | "ERP & Attendance" | "UI/UX";
  year: number;
  summary: string;
  client: string;
  coverImage: string;
  tags: string[];
  metrics: Array<{ label: string; value: string }>;
  liveUrl?: string;
  githubUrl?: string;
  description?: string;
  featured?: boolean;
  sortOrder: number;
  isPublished: boolean;
}

export interface ProcessStepData {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface TestimonialData {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
  sortOrder: number;
  isPublished: boolean;
}

export interface LeadData {
  id: string;
  name: string;
  email: string;
  company?: string;
  serviceType?: string;
  budgetRange?: string;
  timeline?: string;
  features?: string[];
  message: string;
  status: "NEW" | "CONTACTED" | "CLOSED" | "ARCHIVED";
  createdAt: string;
}
