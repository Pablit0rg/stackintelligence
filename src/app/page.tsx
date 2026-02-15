"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Github, Twitter, Mail, ExternalLink, ChevronRight, Shield, Zap 
} from "lucide-react";

import { STACK_CONFIG } from "@/config/stack-data";
import { TechItem } from "@/types/stack";
import { TechBadge } from "@/components/TechBadge";
import { SectionHeader } from "@/components/SectionHeader";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(STACK_CONFIG[0].id);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const currentCategory = useMemo(() => 
    STACK_CONFIG.find(c => c.id === activeTab) || STACK_CONFIG[0]
  , [activeTab]);

  const handleTechSelect = useCallback((tech: TechItem) => {
    setSelectedTech(prev => prev?.id === tech.id ? null : tech);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f0f0f0] selection:bg-white selection:text-black antialiased overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .glass-panel { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); }
      `}} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        <SectionHeader title="Stack" subtitle="Intelligence." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <nav className="lg:col-span-4 space-y-2">
            {STACK_CONFIG.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveTab(cat.id); setSelectedTech(null); }}
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

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="p-8 rounded-2xl border border-white/10 glass-panel">
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-8">
                    {currentCategory.leadText}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentCategory.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleTechSelect(item)}
                        className={`text-left p-5 rounded-xl border transition-all duration-500 group relative overflow-hidden ${
                          selectedTech?.id === item.id ? "bg-white border-white" : "bg-white/5 border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-sm font-bold tracking-tight ${selectedTech?.id === item.id ? "text-black" : "text-white"}`}>
                            {item.name}
                          </span>
                          <ExternalLink size={12} className={selectedTech?.id === item.id ? "text-black/40" : "text-white/20 group-hover:text-white/60"} />
                        </div>
                        <TechBadge label={item.category} />
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {selectedTech && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 rounded-2xl bg-white text-black border border-white">
                        <div className="flex items-center gap-2 mb-4">
                          <Zap size={14} fill="black" />
                          <span className="mono text-[10px] uppercase tracking-[0.3em] font-bold">Deep Dive</span>
                        </div>
                        <h4 className="text-3xl font-bold mb-4 tracking-tight">{selectedTech.name}</h4>
                        <p className="text-lg leading-snug font-medium mb-8 text-black/70 italic">
                          &quot;{selectedTech.description}&quot;
                        </p>
                        <a
                          href={selectedTech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full text-xs mono uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                          Official Docs <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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