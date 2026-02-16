import { STACK_CONFIG } from "@/config/stack-data";
import { PROJECTS_DATA } from "@/config/projects"; // Importar os projetos
import { 
  FileCode, 
  FileJson, 
  Database, 
  Cloud, 
  LayoutTemplate, 
  Terminal,
  FolderGit2,
  Box
} from "lucide-react";

// ... (Mantenha o CATEGORY_MAP e a interface ExplorerNode iguais) ...
// Vou reescrever a função generateExplorerTree completa para facilitar o copy-paste

const CATEGORY_MAP: Record<string, { folder: string; ext: string; icon: any }> = {
  frontend: { folder: "interface", ext: "tsx", icon: LayoutTemplate },
  backend: { folder: "systems", ext: "ts", icon: Terminal },
  infrastructure: { folder: "cloud", ext: "tf", icon: Cloud },
  data: { folder: "database", ext: "prisma", icon: Database },
};

export interface ExplorerNode {
  id: string;
  name: string;
  type: "folder" | "file";
  isOpen?: boolean;
  children?: ExplorerNode[];
  data?: any;
  icon?: any;
}

export function generateExplorerTree(): ExplorerNode[] {
  // 1. Árvore de Stack (Src)
  const srcChildren: ExplorerNode[] = STACK_CONFIG.map((category) => {
    const map = CATEGORY_MAP[category.id] || { folder: category.id, ext: "md", icon: FileCode };
    const files: ExplorerNode[] = category.items.map((item) => ({
      id: item.id,
      name: `${item.name.replace(/\s+/g, '')}.${map.ext}`,
      type: "file",
      data: { ...item, originalCategory: category.label, kind: "stack" },
    }));

    return {
      id: `folder-${category.id}`,
      name: map.folder,
      type: "folder",
      isOpen: false, // Fechado por padrão para focar nos projetos
      children: files,
    };
  });

  // 2. Árvore de Projetos (Novo!)
  const projectFiles: ExplorerNode[] = PROJECTS_DATA.map((proj) => ({
    id: `proj-${proj.id}`,
    name: proj.fileName,
    type: "file",
    data: { ...proj, kind: "project" },
  }));

  // 3. Montagem Final
  return [
    {
      id: "root-project",
      name: "stack-intelligence",
      type: "folder",
      isOpen: true,
      children: [
        {
          id: "folder-projects",
          name: "projects",
          type: "folder",
          isOpen: true, // Projetos abertos em destaque
          children: projectFiles,
        },
        {
          id: "folder-src",
          name: "src",
          type: "folder",
          isOpen: true,
          children: srcChildren,
        },
        {
          id: "file-readme",
          name: "README.md",
          type: "file",
          data: { isReadme: true, kind: "doc" },
        },
      ],
    },
  ];
}