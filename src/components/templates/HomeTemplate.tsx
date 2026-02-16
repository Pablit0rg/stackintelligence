"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, FileCode, Search, GitGraph, Settings, X, ChevronRight, ChevronDown, 
  Bot, ExternalLink, Cpu, PlayCircle, Layers
} from "lucide-react";
import { generateExplorerTree, ExplorerNode } from "@/utils/explorer-adapter";
import { BrowserWindow } from "@/components/BrowserWindow";

export function HomeTemplate() {
  const [explorerData, setExplorerData] = useState<ExplorerNode[]>(generateExplorerTree());
  const [activeFileId, setActiveFileId] = useState<string>("file-readme");
  const [openTabs, setOpenTabs] = useState<string[]>(["file-readme"]);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false); // Fechado por padrão no mobile

  // ... (Lógica de Helper findNode, toggleFolder, handleFileClick, closeTab IGUAIS à versão anterior) ...
  // Para brevidade, assuma que as funções auxiliares são as mesmas. 
  // Vou replicar o core render logic abaixo.

  const findNode = (nodes: ExplorerNode[], id: string): ExplorerNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeNode = useMemo(() => findNode(explorerData, activeFileId), [explorerData, activeFileId]);

  const toggleFolder = (folderId: string) => {
    const updateNodes = (nodes: ExplorerNode[]): ExplorerNode[] => {
      return nodes.map(node => {
        if (node.id === folderId) return { ...node, isOpen: !node.isOpen };
        if (node.children) return { ...node, children: updateNodes(node.children) };
        return node;
      });
    };
    setExplorerData(updateNodes(explorerData));
  };

  const handleFileClick = (fileId: string) => {
    if (!openTabs.includes(fileId)) {
      setOpenTabs([...openTabs, fileId]);
    }
    setActiveFileId(fileId);
  };

  const closeTab = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(id => id !== fileId);
    setOpenTabs(newTabs);
    if (activeFileId === fileId && newTabs.length > 0) {
      setActiveFileId(newTabs[newTabs.length - 1]);
    } else if (newTabs.length === 0) {
      setActiveFileId("");
    }
  };

  // Componente Recursivo (FileTreeItem) - Mantido igual, apenas atualizando ícones visualmente
  const FileTreeItem = ({ node, level }: { node: ExplorerNode; level: number }) => {
    const isFolder = node.type === "folder";
    const isActive = activeFileId === node.id;
    const isProject = node.id.startsWith("proj-");
    
    return (
      <div>
        <div 
          onClick={() => isFolder ? toggleFolder(node.id) : handleFileClick(node.id)}
          className={`
            flex items-center gap-1 py-1 px-2 cursor-pointer select-none border-l-2
            ${isActive ? "bg-white/10 text-white border-blue-500" : "text-white/60 hover:bg-white/5 border-transparent hover:text-white"}
          `}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
          {isFolder && (
            <span className="text-white/40">
              {node.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
          {!isFolder && <span className="w-4" />}
          
          {isFolder ? (
            <Folder size={14} className={node.id === "folder-projects" ? "text-purple-500" : "text-blue-400"} />
          ) : (
            <FileCode size={14} className={isProject ? "text-yellow-400" : (isActive ? "text-cyan-300" : "text-white/40")} />
          )}
          
          <span className={`text-sm truncate ${isProject ? "font-medium" : ""}`}>{node.name}</span>
        </div>
        
        {isFolder && node.isOpen && node.children && (
          <div>
            {node.children.map(child => (
              <FileTreeItem key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // --- RENDER CONTENT SWITCHER ---
  const renderContent = () => {
    if (!activeNode?.data) {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-white/20">
          <FileCode size={48} className="mb-4 opacity-50" />
          <p>Select a file to view.</p>
        </div>
      );
    }

    const { kind, name, description, techStack, repoUrl, fileName, type } = activeNode.data;

    // 1. PROJECT VIEW (Browser Mode)
    if (kind === "project") {
      const isFrontend = type === "frontend" || type === "fullstack";
      
      return (
        <div className="h-full flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                 {name}
                 <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/50 border border-white/5">
                   {activeNode.data.status}
                 </span>
               </h1>
               <p className="text-white/60 text-sm mt-1">{description}</p>
            </div>
            <div className="flex gap-2">
              {repoUrl && (
                <a href={repoUrl} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-white/60 hover:text-white transition-colors">
                  <GitGraph size={18} />
                </a>
              )}
            </div>
          </div>

          {/* O Browser Window só aparece se for Frontend, se for Backend/AI mostra Código/Terminal */}
          {isFrontend ? (
            <div className="flex-1 min-h-[400px]">
              <BrowserWindow url={`projects/${fileName.toLowerCase()}`}>
                 <div className="p-8 flex flex-col items-center justify-center h-full text-center bg-neutral-50">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-2">{name} Preview</h3>
                    <p className="text-neutral-500 max-w-md mb-6">Esta aplicação está rodando em modo de simulação dentro do portfólio.</p>
                    <button className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-lg">
                      Enter Application
                    </button>
                 </div>
              </BrowserWindow>
            </div>
          ) : (
             <div className="flex-1 min-h-[400px] rounded-lg border border-white/10 bg-[#050505] p-6 font-mono text-sm overflow-auto">
                <div className="flex gap-4 mb-4 border-b border-white/5 pb-2">
                   <span className="text-green-400 text-xs border-b border-green-400">TERMINAL</span>
                   <span className="text-white/30 text-xs">OUTPUT</span>
                </div>
                <div className="space-y-2">
                   <p className="text-white/50">$ python {fileName}</p>
                   <p className="text-blue-400">{`> Initializing ${name} v1.0.0...`}</p>
                   <p className="text-white/80">{`> Loading models: ${techStack.join(", ")}... OK`}</p>
                   {activeNode.data.id === 'nexa' && (
                     <p className="text-purple-400 mt-4">
                       "Olá. Eu sou Nexa. Minha arquitetura é baseada em narrativas afrofuturistas. Como posso auxiliar na sua jornada de código hoje?"
                     </p>
                   )}
                   <span className="animate-pulse inline-block w-2 h-4 bg-white/50 align-middle"></span>
                </div>
             </div>
          )}
        </div>
      );
    }

    // 2. README VIEW
    if (activeNode.data.isReadme) {
      return (
         <div className="prose prose-invert prose-p:text-sm prose-headings:font-normal prose-code:text-xs max-w-none">
           <h1 className="text-4xl font-light tracking-tight text-white mb-6">Pablo Rosa Gomes <span className="text-blue-500">v3.0</span></h1>
           <div className="flex gap-4 mb-8">
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">Full Stack Developer</span>
              <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/20">AI Enthusiast</span>
           </div>
           <p className="text-white/60 text-lg leading-relaxed mb-8">
             Bem-vindo ao <strong>Stack Intelligence</strong>. Este ambiente simula meu fluxo de trabalho real.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                   onClick={() => toggleFolder('folder-projects')}>
                 <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                   <Folder size={16} className="text-purple-500" /> Meus Projetos
                 </h3>
                 <p className="text-white/40 text-xs">Explore aplicações reais rodando no navegador virtual.</p>
              </div>
              <div className="p-4 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                   onClick={() => toggleFolder('folder-src')}>
                 <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                   <Layers size={16} className="text-blue-500" /> Minha Stack
                 </h3>
                 <p className="text-white/40 text-xs">Analise a arquitetura técnica e as ferramentas que domino.</p>
              </div>
           </div>
         </div>
      );
    }

    // 3. TECH STACK VIEW (Fallback)
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <Cpu size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <p className="text-xs font-mono text-white/40">{activeNode.data.category} module</p>
            </div>
          </div>
          <a href={activeNode.data.url} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-lg transition-colors">
            Docs <ExternalLink size={12} />
          </a>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#050505] p-4 font-mono text-sm">
           <p className="text-white/40 mb-2">// {description}</p>
           <p><span className="text-purple-400">import</span> <span className="text-white">{`{ ${activeNode.data.name} }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">"@/stack"</span>;</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#a0a0a0] font-sans overflow-hidden selection:bg-purple-500/30">
      
      {/* 1. SIDEBAR ICONES */}
      <aside className="w-12 flex-none border-r border-white/5 bg-[#000000] flex flex-col items-center py-4 gap-6 z-20">
        <div className="p-2 rounded-md bg-white/10 text-white"><FileCode size={20} /></div>
        <div className="p-2 opacity-40 hover:opacity-100 transition-opacity"><Search size={20} /></div>
        <div className="p-2 opacity-40 hover:opacity-100 transition-opacity"><GitGraph size={20} /></div>
        <div className="mt-auto p-2 opacity-40 hover:opacity-100"><Settings size={20} /></div>
      </aside>

      {/* 2. EXPLORER TREE */}
      <aside className="w-64 flex-none border-r border-white/5 bg-[#050505] flex flex-col hidden md:flex">
        <div className="h-10 flex items-center px-4 text-xs font-bold tracking-widest uppercase text-white/40 bg-[#0a0a0a]">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-white/10">
          {explorerData.map(node => (
            <FileTreeItem key={node.id} node={node} level={0} />
          ))}
        </div>
      </aside>

      {/* 3. MAIN EDITOR */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        
        {/* TABS */}
        <div className="h-10 flex border-b border-white/5 bg-[#000000] overflow-x-auto no-scrollbar">
          {openTabs.map(tabId => {
            const node = findNode(explorerData, tabId);
            if (!node) return null;
            return (
              <div 
                key={tabId}
                onClick={() => setActiveFileId(tabId)}
                className={`
                  group flex items-center gap-2 px-4 min-w-[120px] border-r border-white/5 text-xs cursor-pointer select-none
                  ${activeFileId === tabId ? "bg-[#0a0a0a] text-white border-t-2 border-t-purple-500" : "bg-[#000000] text-white/40 hover:bg-[#0a0a0a] border-t-2 border-t-transparent"}
                `}
              >
                <span className={activeFileId === tabId ? "text-purple-400" : ""}>
                   {node.name.endsWith('tsx') ? <FileCode size={12} /> : <Layers size={12} />}
                </span>
                <span className="truncate">{node.name}</span>
                <span onClick={(e) => closeTab(e, tabId)} className="ml-auto opacity-0 group-hover:opacity-100 hover:text-white"><X size={10} /></span>
              </div>
            );
          })}
        </div>

        {/* BREADCRUMBS */}
        <div className="h-8 flex items-center px-4 border-b border-white/5 bg-[#0a0a0a] text-xs text-white/30 gap-2">
           <span>stack-intelligence</span><span>/</span><span className="text-white/60">{activeNode?.name}</span>
        </div>

        {/* VIEWPORT CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFileId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="h-full max-w-5xl mx-auto"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 4. COPILOT (Collapsed for now) */}
      {isCopilotOpen && (
        <aside className="w-80 border-l border-white/5 bg-[#050505] z-10 hidden lg:flex flex-col">
           {/* Placeholder Copilot */}
           <div className="p-4 text-white/40">AI Copilot Loading...</div>
        </aside>
      )}

      {/* STATUS BAR */}
      <footer className="fixed bottom-0 left-0 right-0 h-6 bg-purple-900 text-white flex items-center px-3 text-[10px] font-mono select-none z-50 justify-between">
        <div className="flex items-center gap-4">
           <span><GitGraph size={10} className="inline mr-1"/> main*</span>
           <span><X size={10} className="inline mr-1"/> 0 errors</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="cursor-pointer hover:underline" onClick={() => setIsCopilotOpen(!isCopilotOpen)}>
             {isCopilotOpen ? "Hide Copilot" : "Show Copilot"}
           </span>
           <span>Project Runtime: Active</span>
        </div>
      </footer>
    </div>
  );
}