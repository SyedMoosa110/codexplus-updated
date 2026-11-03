import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_PROJECTS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_LEADS,
} from "./default-data";
import { SiteSettings, Service, Project, ProcessStep, Testimonial, Lead } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

export const api = {
  // Check backend health
  async checkHealth(): Promise<{ isConnected: boolean; database?: string }> {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(`${API_BASE}/api/health`, {
        signal: controller.signal,
      });
      clearTimeout(id);
      if (res.ok) {
        const data = await res.json();
        return { isConnected: true, database: data.database };
      }
      return { isConnected: false };
    } catch {
      return { isConnected: false };
    }
  },

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE}/api/site`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        const data = await res.json();
        setLocalItem("codexplus_site_settings", data);
        return data;
      }
    } catch {}
    return getLocalItem("codexplus_site_settings", DEFAULT_SITE_SETTINGS);
  },

  async updateSiteSettings(settings: Partial<SiteSettings>, token?: string): Promise<SiteSettings> {
    const current = getLocalItem("codexplus_site_settings", DEFAULT_SITE_SETTINGS);
    const updated: SiteSettings = { ...current, ...settings };
    setLocalItem("codexplus_site_settings", updated);

    try {
      if (token) {
        await fetch(`${API_BASE}/api/site`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        });
      }
    } catch {
      console.warn("Backend offline, settings saved locally");
    }
    return updated;
  },

  // Services
  async getServices(): Promise<Service[]> {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE}/api/services`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLocalItem("codexplus_services", data);
          return data;
        }
      }
    } catch {}
    return getLocalItem("codexplus_services", DEFAULT_SERVICES);
  },

  async saveService(service: Service, token?: string): Promise<Service> {
    const services = getLocalItem("codexplus_services", DEFAULT_SERVICES);
    const existingIndex = services.findIndex((s) => s.id === service.id);
    let updatedList: Service[];

    if (existingIndex >= 0) {
      updatedList = [...services];
      updatedList[existingIndex] = service;
    } else {
      updatedList = [...services, service];
    }
    setLocalItem("codexplus_services", updatedList);

    try {
      if (token) {
        const method = existingIndex >= 0 ? "PUT" : "POST";
        const url = existingIndex >= 0 ? `${API_BASE}/api/services/${service.id}` : `${API_BASE}/api/services`;
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(service),
        });
      }
    } catch {}
    return service;
  },

  async deleteService(id: string, token?: string): Promise<void> {
    const services = getLocalItem("codexplus_services", DEFAULT_SERVICES);
    const updated = services.filter((s) => s.id !== id);
    setLocalItem("codexplus_services", updated);

    try {
      if (token) {
        await fetch(`${API_BASE}/api/services/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {}
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE}/api/projects`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLocalItem("codexplus_projects", data);
          return data;
        }
      }
    } catch {}
    return getLocalItem("codexplus_projects", DEFAULT_PROJECTS);
  },

  async saveProject(project: Project, token?: string): Promise<Project> {
    const projects = getLocalItem("codexplus_projects", DEFAULT_PROJECTS);
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    let updatedList: Project[];

    if (existingIndex >= 0) {
      updatedList = [...projects];
      updatedList[existingIndex] = project;
    } else {
      updatedList = [...projects, project];
    }
    setLocalItem("codexplus_projects", updatedList);

    try {
      if (token) {
        const method = existingIndex >= 0 ? "PUT" : "POST";
        const url = existingIndex >= 0 ? `${API_BASE}/api/projects/${project.id}` : `${API_BASE}/api/projects`;
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        });
      }
    } catch {}
    return project;
  },

  async deleteProject(id: string, token?: string): Promise<void> {
    const projects = getLocalItem("codexplus_projects", DEFAULT_PROJECTS);
    const updated = projects.filter((p) => p.id !== id);
    setLocalItem("codexplus_projects", updated);

    try {
      if (token) {
        await fetch(`${API_BASE}/api/projects/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {}
  },

  // Process Timeline Steps
  async getProcessSteps(): Promise<ProcessStep[]> {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE}/api/process-steps`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLocalItem("codexplus_process_steps", data);
          return data;
        }
      }
    } catch {}
    return getLocalItem("codexplus_process_steps", DEFAULT_PROCESS_STEPS);
  },

  async saveProcessStep(step: ProcessStep, token?: string): Promise<ProcessStep> {
    const steps = getLocalItem("codexplus_process_steps", DEFAULT_PROCESS_STEPS);
    const existingIndex = steps.findIndex((s) => s.id === step.id);
    let updatedList: ProcessStep[];

    if (existingIndex >= 0) {
      updatedList = [...steps];
      updatedList[existingIndex] = step;
    } else {
      updatedList = [...steps, step];
    }
    setLocalItem("codexplus_process_steps", updatedList);

    try {
      if (token) {
        const method = existingIndex >= 0 ? "PUT" : "POST";
        const url = existingIndex >= 0 ? `${API_BASE}/api/process-steps/${step.id}` : `${API_BASE}/api/process-steps`;
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(step),
        });
      }
    } catch {}
    return step;
  },

  async deleteProcessStep(id: string, token?: string): Promise<void> {
    const steps = getLocalItem("codexplus_process_steps", DEFAULT_PROCESS_STEPS);
    const updated = steps.filter((s) => s.id !== id);
    setLocalItem("codexplus_process_steps", updated);

    try {
      if (token) {
        await fetch(`${API_BASE}/api/process-steps/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {}
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLocalItem("codexplus_testimonials", data);
          return data;
        }
      }
    } catch {}
    return getLocalItem("codexplus_testimonials", DEFAULT_TESTIMONIALS);
  },

  async saveTestimonial(testimonial: Testimonial, token?: string): Promise<Testimonial> {
    const list = getLocalItem("codexplus_testimonials", DEFAULT_TESTIMONIALS);
    const existingIndex = list.findIndex((t) => t.id === testimonial.id);
    let updatedList: Testimonial[];

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = testimonial;
    } else {
      updatedList = [...list, testimonial];
    }
    setLocalItem("codexplus_testimonials", updatedList);

    try {
      if (token) {
        const method = existingIndex >= 0 ? "PUT" : "POST";
        const url = existingIndex >= 0 ? `${API_BASE}/api/testimonials/${testimonial.id}` : `${API_BASE}/api/testimonials`;
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(testimonial),
        });
      }
    } catch {}
    return testimonial;
  },

  async deleteTestimonial(id: string, token?: string): Promise<void> {
    const list = getLocalItem("codexplus_testimonials", DEFAULT_TESTIMONIALS);
    const updated = list.filter((t) => t.id !== id);
    setLocalItem("codexplus_testimonials", updated);

    try {
      if (token) {
        await fetch(`${API_BASE}/api/testimonials/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {}
  },

  // Leads
  async getLeads(token?: string): Promise<Lead[]> {
    try {
      if (token) {
        const res = await fetch(`${API_BASE}/api/leads`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setLocalItem("codexplus_leads", data);
          return data;
        }
      }
    } catch {}
    return getLocalItem("codexplus_leads", DEFAULT_LEADS);
  },

  async submitLead(lead: Omit<Lead, "id" | "status" | "createdAt">): Promise<Lead> {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    const currentLeads = getLocalItem("codexplus_leads", DEFAULT_LEADS);
    setLocalItem("codexplus_leads", [newLead, ...currentLeads]);

    try {
      await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      console.info("Saved inquiry to local storage fallback mode");
    }
    return newLead;
  },

  async updateLeadStatus(id: string, status: "NEW" | "CONTACTED" | "CLOSED" | "ARCHIVED", token?: string): Promise<void> {
    const leads = getLocalItem("codexplus_leads", DEFAULT_LEADS);
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLocalItem("codexplus_leads", updated);

    try {
      if (token) {
        await fetch(`${API_BASE}/api/leads/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
      }
    } catch {}
  },

  async deleteLead(id: string, token?: string): Promise<void> {
    const leads = getLocalItem("codexplus_leads", DEFAULT_LEADS);
    const updated = leads.filter((l) => l.id !== id);
    setLocalItem("codexplus_leads", updated);

    try {
      if (token) {
        await fetch(`${API_BASE}/api/leads/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {}
  },
};
