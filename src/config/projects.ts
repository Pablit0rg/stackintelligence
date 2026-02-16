import { Layers, Box, Bot, Zap } from "lucide-react";

export interface ProjectItem {
  id: string;
  name: string;
  type: "frontend" | "backend" | "ai" | "fullstack";
  fileName: string; // Ex: PrevDesk.tsx
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  status: "live" | "building" | "archived";
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "smartleads",
    name: "SmartLeads AI",
    type: "ai",
    fileName: "SmartLeads.py",
    description: "Automação inteligente de CRM utilizando IA para qualificação de leads e enriquecimento de dados.",
    techStack: ["Python", "OpenAI API", "Pandas", "FastAPI"],
    repoUrl: "https://github.com/pablit0rg/smartleads-ai",
    status: "building"
  },
  {
    id: "prevdesk",
    name: "PrevDesk",
    type: "frontend",
    fileName: "PrevDesk.tsx",
    description: "Dashboard jurídico SPA focado em performance e UX para gestão de processos previdenciários.",
    techStack: ["React", "Tailwind", "Vite", "Framer Motion"],
    status: "live"
  },
  {
    id: "nexa",
    name: "Project Nexa",
    type: "ai",
    fileName: "Nexa_Character.json",
    description: "Definição de personalidade e lore para agente de IA com estética Afrofuturista.",
    techStack: ["JSON", "Prompt Engineering", "LLM"],
    status: "building"
  },
  {
    id: "darafa",
    name: "DaRafa Backend",
    type: "backend",
    fileName: "firebase_config.ts",
    description: "Infraestrutura serverless para e-commerce, gerenciando autenticação e banco de dados em tempo real.",
    techStack: ["Firebase", "TypeScript", "Node.js"],
    status: "live"
  }
];