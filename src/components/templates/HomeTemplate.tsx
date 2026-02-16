"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  FileCode, 
  Search, 
  GitGraph, 
  Settings, 
  X, 
  ChevronRight,
  ChevronDown,
  Bot,
  MessageSquare,
  ExternalLink,
  Cpu
} from "lucide-react";
import { generateExplorerTree, ExplorerNode } from "@/utils/explorer-adapter";

export function HomeTemplate() {
  // Estado inicial gerado pelo Adapter
  const [explorerData, setExplorerData] = useState<ExplorerNode[]>(generateExplorerTree());
  const [activeFileId, setActiveFileId] = useState<string>("file-readme");
  const [openTabs, setOpenTabs] = useState<string[]>(["file-readme"]);
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);

  // Helper recursivo para achar um nó pelo ID
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

  // Toggle Folder Open/Close
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

  // Handle File Click
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

  // Componente Recursivo para Renderizar a Árvore
  const FileTreeItem = ({ node, level }: { node: ExplorerNode; level: number }) => {
    const isFolder = node.type === "folder";
    const isActive = activeFileId === node.id;
    
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
          {!isFolder && <span className="w-4" />} {/* Spacer for indentation */}
          
          {isFolder ? (
            <Folder size={14} className={node.id === "folder-src" ? "text-green-500" : "text-blue-400"} />
          ) : (
            <FileCode size={14} className={isActive ? "text-cyan-300" : "text-white/40"} />
          )}
          
          <span className="text-sm truncate">{node.name}</span>
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

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#a0a0a0] font-sans overflow-hidden selection:bg-blue-500/30">
      
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
        
        {/* TABS HEADER */}
        <div className="h-10 flex border-b border-white/5 bg-[#000000] overflow-x-auto no-scrollbar">
          {openTabs.map(tabId => {
            const node = findNode(explorerData, tabId);
            if (!node) return null;
            return (
              <div 
                key={tabId}
                onClick={() => setActiveFileId(tabId)}
                className={`
                  group flex items-center gap-2 px-4 min-w-[120px] max-w-[200px] border-r border-white/5 text-xs cursor-pointer select-none
                  ${activeFileId === tabId ? "bg-[#0a0a0a] text-white border-t-2 border-t-blue-500" : "bg-[#000000] text-white/40 hover:bg-[#0a0a0a] border-t-2 border-t-transparent"}
                `}
              >
                <FileCode size={12} className={activeFileId === tabId ? "text-cyan-400" : ""} />
                <span className="truncate">{node.name}</span>
                <span 
                  onClick={(e) => closeTab(e, tabId)}
                  className={`ml-auto opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/20 rounded ${activeFileId === tabId ? "opacity-100" : ""}`}
                >
                  <X size={10} />
                </span>
              </div>
            );
          })}
        </div>

        {/* BREADCRUMBS */}
        <div className="h-8 flex items-center px-4 border-b border-white/5 bg-[#0a0a0a] text-xs text-white/30 gap-2">
          <span>stack-intelligence</span>
          <span>/</span>
          {activeNode?.data?.originalCategory && <span>src / {activeNode.data.originalCategory.toLowerCase()} / </span>}
          <span className="text-white/60">{activeNode?.name}</span>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFileId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="max-w-4xl mx-auto"
            >
              {activeNode?.data?.isReadme ? (
                 // README VIEW
                 <div className="prose prose-invert prose-p:text-sm prose-headings:font-normal prose-code:text-xs">
                   <h1 className="text-4xl font-light tracking-tight text-white mb-6">Pablo Rosa Gomes <span className="text-blue-500">v3.0</span></h1>
                   <div className="flex gap-4 mb-8">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">Full Stack Developer</span>
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Available for Hire</span>
                   </div>
                   <p className="text-white/60 text-lg leading-relaxed">
                     Engenheiro de Software focado em construir sistemas escaláveis e interfaces imersivas. 
                     Este portfólio é uma <strong className="text-white">IDE interativa</strong>. Explore a árvore de arquivos à esquerda para ver meus conhecimentos em código.
                   </p>
                 </div>
              ) : activeNode?.data?.category ? (
                // TECH SPEC VIEW (Code-like Visualization)
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <Cpu size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{activeNode.data.name}</h2>
                        <p className="text-xs font-mono text-white/40">{activeNode.data.category} module</p>
                      </div>
                    </div>
                    <a 
                      href={activeNode.data.url} 
                      target="_blank" 
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Documentation <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Code Block Simulation */}
                  <div className="rounded-lg border border-white/10 bg-[#050505] p-4 font-mono text-sm overflow-x-auto">
                    <div className="flex gap-4 mb-4 border-b border-white/5 pb-2">
                       <span className="text-white/30 text-xs">PROBLEMS</span>
                       <span className="text-white/30 text-xs">OUTPUT</span>
                       <span className="text-blue-400 text-xs border-b border-blue-400">DEBUG CONSOLE</span>
                    </div>
                    <div className="space-y-1">
                      <p><span className="text-purple-400">const</span> <span className="text-yellow-200">techConfig</span> = <span className="text-blue-400">{`{`}</span></p>
                      <p className="pl-4"><span className="text-sky-300">id</span>: <span className="text-green-400">"{activeNode.data.id}"</span>,</p>
                      <p className="pl-4"><span className="text-sky-300">name</span>: <span className="text-green-400">"{activeNode.data.name}"</span>,</p>
                      <p className="pl-4"><span className="text-sky-300">description</span>: <span className="text-orange-300">"{activeNode.data.description}"</span>,</p>
                      <p className="pl-4"><span className="text-sky-300">proficiency</span>: <span className="text-blue-400">"Principal"</span>,</p>
                      <p><span className="text-blue-400">{`}`}</span>;</p>
                      <br />
                      <p className="text-white/40">// {activeNode.data.leadText}</p>
                      <p className="text-white/40">// Initializing module...</p>
                      <p className="text-green-400/80">{`> Module loaded successfully in 45ms.`}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // EMPTY / GENERIC STATE
                <div className="flex flex-col items-center justify-center h-[50vh] text-white/20">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <FileCode size={32} />
                  </div>
                  <p>Selecione um arquivo para visualizar seus detalhes.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 4. COPILOT (Placeholder - Mantido igual para não quebrar o layout) */}
      {isCopilotOpen && (
        <aside className="w-80 flex-none border-l border-white/5 bg-[#050505] flex flex-col z-10 hidden lg:flex">
          <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-[#000000]">
             <span className="text-xs font-bold tracking-widest uppercase text-white/40 flex items-center gap-2">
               <Bot size={14} /> AI Copilot
             </span>
             <button onClick={() => setIsCopilotOpen(false)}><X size={14} className="text-white/20 hover:text-white" /></button>
          </div>
          <div className="flex-1 p-4 text-sm text-white/40 text-center flex items-center justify-center">
             Chatbot v2 (n8n Integration) Coming Soon...
          </div>
          <div className="p-4 border-t border-white/5">
             <div className="h-8 bg-white/5 rounded border border-white/10"></div>
          </div>
        </aside>
      )}

      {/* STATUS BAR */}
      <footer className="fixed bottom-0 left-0 right-0 h-6 bg-[#007acc] text-white flex items-center px-3 text-[10px] font-mono select-none z-50 justify-between">
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-1"><GitGraph size={10} /> main*</span>
           <span className="flex items-center gap-1"><X size={10} /> 0 errors</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="cursor-pointer" onClick={() => setIsCopilotOpen(!isCopilotOpen)}>Copilot</span>
           <span>TypeScript React</span>
        </div>
      </footer>
    </div>
  );
}