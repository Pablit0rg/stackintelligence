import { STACK_CONFIG } from "@/config/stack-data";
import { 
  FileCode, 
  FileJson, 
  Database, 
  Cloud, 
  LayoutTemplate, 
  Terminal 
} from "lucide-react";

// Mapeamento de extensões e ícones baseados no ID da categoria
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
  data?: any; // Guarda os dados originais (descrição, url, etc)
  icon?: any;
}

export function generateExplorerTree(): ExplorerNode[] {
  // 1. Cria a estrutura base de pastas (src/...)
  const srcChildren: ExplorerNode[] = STACK_CONFIG.map((category) => {
    const map = CATEGORY_MAP[category.id] || { folder: category.id, ext: "md", icon: FileCode };
    
    // Transforma os itens da categoria em arquivos
    const files: ExplorerNode[] = category.items.map((item) => ({
      id: item.id,
      name: `${item.name.replace(/\s+/g, '')}.${map.ext}`, // Ex: Next.js -> Next.tsx
      type: "file",
      data: { ...item, originalCategory: category.label },
    }));

    return {
      id: `folder-${category.id}`,
      name: map.folder,
      type: "folder",
      isOpen: true, // Pastas abertas por padrão para mostrar "volume" de trabalho
      children: files,
    };
  });

  // 2. Monta a árvore completa
  return [
    {
      id: "root-project",
      name: "stack-intelligence",
      type: "folder",
      isOpen: true,
      children: [
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
          data: { isReadme: true },
        },
        {
          id: "file-package",
          name: "package.json",
          type: "file",
          data: { isPackage: true },
        },
      ],
    },
  ];
}