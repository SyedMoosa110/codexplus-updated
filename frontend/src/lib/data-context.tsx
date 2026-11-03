"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { SiteSettings, Service, Project, ProcessStep, Testimonial, Lead } from "@/types";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_PROJECTS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_LEADS,
} from "./default-data";
import { api } from "./api-client";

interface DataContextType {
  settings: SiteSettings;
  services: Service[];
  projects: Project[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  leads: Lead[];
  backendStatus: { isConnected: boolean; database?: string; checked: boolean };
  isLoading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  saveService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveProcessStep: (step: ProcessStep) => Promise<void>;
  deleteProcessStep: (id: string) => Promise<void>;
  saveTestimonial: (testimonial: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  submitInquiry: (inquiry: Omit<Lead, "id" | "status" | "createdAt">) => Promise<Lead>;
  updateLeadStatus: (id: string, status: "NEW" | "CONTACTED" | "CLOSED" | "ARCHIVED") => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(DEFAULT_PROCESS_STEPS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [leads, setLeads] = useState<Lead[]>(DEFAULT_LEADS);
  const [backendStatus, setBackendStatus] = useState<{ isConnected: boolean; database?: string; checked: boolean }>({
    isConnected: false,
    checked: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth token from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("codexplus_admin_token");
      if (storedToken) setToken(storedToken);
    }
  }, []);

  const loadAll = useCallback(async () => {
    setIsLoading(true);
    const health = await api.checkHealth();
    setBackendStatus({ ...health, checked: true });

    const [
      loadedSettings,
      loadedServices,
      loadedProjects,
      loadedProcessSteps,
      loadedTestimonials,
      loadedLeads,
    ] = await Promise.all([
      api.getSiteSettings(),
      api.getServices(),
      api.getProjects(),
      api.getProcessSteps(),
      api.getTestimonials(),
      api.getLeads(token || undefined),
    ]);

    setSettings(loadedSettings);
    setServices(loadedServices);
    setProjects(loadedProjects);
    setProcessSteps(loadedProcessSteps);
    setTestimonials(loadedTestimonials);
    setLeads(loadedLeads);
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const login = (newToken: string, user: any) => {
    setToken(newToken);
    if (typeof window !== "undefined") {
      localStorage.setItem("codexplus_admin_token", newToken);
      localStorage.setItem("codexplus_admin_user", JSON.stringify(user));
    }
  };

  const logout = () => {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("codexplus_admin_token");
      localStorage.removeItem("codexplus_admin_user");
    }
  };

  const updateSettings = async (partial: Partial<SiteSettings>) => {
    const updated = await api.updateSiteSettings(partial, token || undefined);
    setSettings(updated);
  };

  const saveService = async (service: Service) => {
    await api.saveService(service, token || undefined);
    const updated = await api.getServices();
    setServices(updated);
  };

  const deleteService = async (id: string) => {
    await api.deleteService(id, token || undefined);
    const updated = await api.getServices();
    setServices(updated);
  };

  const saveProject = async (project: Project) => {
    await api.saveProject(project, token || undefined);
    const updated = await api.getProjects();
    setProjects(updated);
  };

  const deleteProject = async (id: string) => {
    await api.deleteProject(id, token || undefined);
    const updated = await api.getProjects();
    setProjects(updated);
  };

  const saveProcessStep = async (step: ProcessStep) => {
    await api.saveProcessStep(step, token || undefined);
    const updated = await api.getProcessSteps();
    setProcessSteps(updated);
  };

  const deleteProcessStep = async (id: string) => {
    await api.deleteProcessStep(id, token || undefined);
    const updated = await api.getProcessSteps();
    setProcessSteps(updated);
  };

  const saveTestimonial = async (testimonial: Testimonial) => {
    await api.saveTestimonial(testimonial, token || undefined);
    const updated = await api.getTestimonials();
    setTestimonials(updated);
  };

  const deleteTestimonial = async (id: string) => {
    await api.deleteTestimonial(id, token || undefined);
    const updated = await api.getTestimonials();
    setTestimonials(updated);
  };

  const submitInquiry = async (inquiry: Omit<Lead, "id" | "status" | "createdAt">) => {
    const newLead = await api.submitLead(inquiry);
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = async (id: string, status: "NEW" | "CONTACTED" | "CLOSED" | "ARCHIVED") => {
    await api.updateLeadStatus(id, status, token || undefined);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = async (id: string) => {
    await api.deleteLead(id, token || undefined);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        services,
        projects,
        processSteps,
        testimonials,
        leads,
        backendStatus,
        isLoading,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        updateSettings,
        saveService,
        deleteService,
        saveProject,
        deleteProject,
        saveProcessStep,
        deleteProcessStep,
        saveTestimonial,
        deleteTestimonial,
        submitInquiry,
        updateLeadStatus,
        deleteLead,
        refresh: loadAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
