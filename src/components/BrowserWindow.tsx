import React from "react";
import { RefreshCw, Lock, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface BrowserWindowProps {
  url: string;
  children: React.ReactNode;
}

export function BrowserWindow({ url, children }: BrowserWindowProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-2xl border border-white/10">
      {/* Browser Toolbar */}
      <div className="h-10 bg-[#f0f0f0] border-b border-[#e0e0e0] flex items-center px-3 gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
        </div>
        
        <div className="flex gap-2 text-gray-400">
          <ChevronLeft size={16} />
          <ChevronRight size={16} />
        </div>

        {/* Address Bar */}
        <div className="flex-1 h-7 bg-white rounded border border-[#e0e0e0] flex items-center px-3 text-xs text-gray-600 font-mono gap-2 shadow-sm">
          <Lock size={10} className="text-green-600" />
          <span className="opacity-80">localhost:3000/{url}</span>
          <RefreshCw size={10} className="ml-auto opacity-50" />
        </div>
      </div>

      {/* Browser Content (Viewport) */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {/* Grid Pattern para simular 'Loading' ou 'Empty State' se não tiver iframe */}
        <div className="absolute inset-0 z-0 opacity-[0.05] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative z-10 w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}