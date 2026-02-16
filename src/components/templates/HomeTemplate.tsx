"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Github, Twitter, Mail, ExternalLink, ChevronRight, Shield, Terminal
} from "lucide-react";

import { STACK_CONFIG } from "@/config/stack-data";
import { TechBadge } from "@/components/TechBadge";
import { SectionHeader } from "@/components/SectionHeader";

export function HomeTemplate() {
  const [activeTab, setActiveTab] = useState<string>(STACK_CONFIG[0].id);
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);

  const currentCategory = useMemo(() => 
    STACK_CONFIG.find(c => c.id === activeTab) || STACK_CONFIG[0]
  , [activeTab]);

  const handleTechSelect = useCallback((techId: string) => {
    setSelectedTechIds(prev => 
      prev.includes(techId) 
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f0f0f0] selection:bg-white selection:text-black antialiased overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .glass-panel { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); }
      `}} />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Main Container: Alterado para w-full, removendo max-w-6xl e mx-auto */}
      <main className="relative z-10 w-full px-8 py-24">
        <SectionHeader title="Stack" subtitle="Intelligence." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-4 space-y-2">
            {STACK_CONFIG.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border ${
                    isActive ? "bg-white/10 border-white/20 shadow-xl" : "border-transparent hover:bg-white/5 hover:border-white/5"
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${isActive ? "bg-white text-black" : "bg-white/5 text-white/40 group-hover:text-white"}`}>
                    <Icon size={18} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-semibold tracking-tight ${isActive ? "text-white" : "text-white/40"}`}>
                      {cat.label}
                    </p>
                    <p className="text-[10px] mono uppercase tracking-wider text-white/20">
                      {cat.items.length} Modules
                    </p>
                  </div>
                  {isActive && (
                    <motion.div layoutId="active-indicator" className="ml-auto">
                      <ChevronRight size={14} className="text-white/40" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-2xl border border-white/10 glass-panel"
              >
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-8">
                  {currentCategory.leadText}
                </p>

                {/* Grid de Tecnologias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {currentCategory.items.map((item) => {
                    const isSelected = selectedTechIds.includes(item.id);
                    
                    return (
                      <div key={item.id} className="flex flex-col w-full">
                        {/* 1. O Botão (Trigger) */}
                        <button
                          onClick={() => handleTechSelect(item.id)}
                          className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                            isSelected 
                              ? "bg-[#0a0a0a] border-white shadow-xl z-10 scale-[1.02]" 
                              : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-sm font-bold tracking-tight text-white`}>
                              {item.name}
                            </span>
                            <ExternalLink size={12} className={isSelected ? "text-white/40" : "text-white/20 group-hover:text-white/60"} />
                          </div>
                          <TechBadge label={item.category} />
                        </button>

                        {/* 2. A Gaveta (Drawer) */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden w-full z-0"
                            >
                              <div className="p-5 rounded-xl bg-white border border-white/20 shadow-inner">
                                <div className="flex items-center gap-2 mb-3 text-black/40">
                                  <Terminal size={12} />
                                  <span className="mono text-[9px] uppercase tracking-widest">System Log</span>
                                </div>
                                
                                <p className="text-sm leading-relaxed text-black/70 font-medium mb-4">
                                  <span className="text-black/30 mr-2 mono">&gt;</span>
                                  {item.description}
                                </p>

                                <div className="h-px w-full bg-black/5 mb-4" />

                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between group/link w-full py-2 px-3 rounded-lg bg-black hover:bg-neutral-800 transition-colors"
                                >
                                  <span className="text-xs mono uppercase tracking-wider text-white font-bold">
                                    Read Docs
                                  </span>
                                  <ArrowUpRight size={14} className="text-white/60 group-hover/link:text-white transition-colors" />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-8 py-16 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4">
          <Shield size={16} />
          <span className="mono text-[9px] uppercase tracking-[0.4em]">Encrypted Session // Port 443</span>
        </div>
        <div className="flex gap-10">
          <Github size={18} />
          <Twitter size={18} />
          <Mail size={18} />
        </div>
      </footer>
    </div>
  );
}