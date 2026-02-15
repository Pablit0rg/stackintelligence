"use client"; // <--- Isso habilita animações e hooks

import { SectionHeader } from "@/components/SectionHeader";
import { TechBadge } from "@/components/TechBadge";
// Importe outros componentes necessários aqui

export function HomeTemplate() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#000000] text-white">
      {/* Cole aqui todo o JSX que estava no seu page.tsx antigo */}
      
      <SectionHeader title="Bem-vindo" subtitle="Portfólio Premium" />
      
      {/* Exemplo de uso dos seus componentes */}
      <div className="flex gap-4">
        <TechBadge name="Next.js 15" />
        <TechBadge name="TypeScript" />
      </div>

    </main>
  );
}