// src/app/projects/layout.tsx
import React from "react";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-y-auto antialiased selection:bg-blue-200 selection:text-blue-900">
      {/* Este layout "reseta" o estilo do IDE para simular um navegador limpo */}
      {children}
    </div>
  );
}