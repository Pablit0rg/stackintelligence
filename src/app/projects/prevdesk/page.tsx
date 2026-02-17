// src/app/projects/prevdesk/page.tsx
import React from "react";
import { Scale, Users, FileText, Bell, Search, LayoutDashboard, Settings } from "lucide-react";

export default function PrevDeskPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      
      {/* Sidebar do Projeto */}
      <aside className="w-64 bg-slate-900 text-white flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 font-bold text-lg tracking-wide">
          <Scale className="mr-2 text-amber-500" /> PrevDesk
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-900/50">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Users size={18} /> Clientes
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <FileText size={18} /> Processos
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Settings size={18} /> Configurações
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold">J</div>
            <div className="text-sm">
              <p className="font-medium">Dra. Jennifer</p>
              <p className="text-xs text-slate-500">Advogada Jr.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-slate-800">Visão Geral</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Buscar processo..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-blue-500 w-64" />
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Novos Casos (Semana)</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-1">12</h3>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></div>
              </div>
              <span className="text-xs text-green-600 font-medium">+15% vs semana passada</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Audiências Hoje</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-1">03</h3>
                </div>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Scale size={20} /></div>
              </div>
              <span className="text-xs text-amber-600 font-medium">Próxima em 2 horas</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Prazos Fatais</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-1">01</h3>
                </div>
                <div className="p-2 bg-red-50 text-red-600 rounded-lg"><Bell size={20} /></div>
              </div>
              <span className="text-xs text-red-600 font-medium">Atenção requerida</span>
            </div>
          </div>

          {/* Tabela Recente */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Movimentações Recentes</h3>
              <button className="text-sm text-blue-600 font-medium hover:underline">Ver tudo</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Processo</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">0012345-88.2025.8.16.0001</td>
                  <td className="px-6 py-4">Maria da Silva</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Deferido</span></td>
                  <td className="px-6 py-4 text-slate-500">Hoje, 09:30</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">0054321-22.2025.8.16.0001</td>
                  <td className="px-6 py-4">João dos Santos</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Em Análise</span></td>
                  <td className="px-6 py-4 text-slate-500">Ontem, 16:45</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">0098765-11.2025.8.16.0001</td>
                  <td className="px-6 py-4">Ana Paula Oliveira</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Audiência</span></td>
                  <td className="px-6 py-4 text-slate-500">15/02/2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}