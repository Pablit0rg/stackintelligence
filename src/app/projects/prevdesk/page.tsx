import React from "react";

export default function PrevDeskPage() {
  return (
    <div className="font-sans">
      {/* Simulação de uma Navbar do Projeto */}
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
        <span className="font-bold text-lg">PrevDesk Jurídico</span>
        <div className="space-x-4 text-sm">
          <a href="#" className="opacity-80 hover:opacity-100">Painel</a>
          <a href="#" className="opacity-80 hover:opacity-100">Processos</a>
          <span className="bg-white/20 px-2 py-1 rounded">Admin</span>
        </div>
      </nav>

      {/* Conteúdo Simulado */}
      <main className="p-8 max-w-4xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Bem-vindo, Dr(a). Jennifer</h1>
          <p className="text-gray-500 mt-2">Resumo diário dos processos previdenciários.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Novos Casos</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
             <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Audiências Hoje</h3>
             <p className="text-3xl font-bold text-orange-500 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
             <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Prazos Fatais</h3>
             <p className="text-3xl font-bold text-red-600 mt-2">1</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h4 className="font-bold text-blue-900 mb-2">Atividade Recente</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
            <li>Processo 001/2026 atualizado para "Em Análise".</li>
            <li>Documentação de Maria Silva anexada.</li>
            <li>Cálculo de benefício gerado automaticamente.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}