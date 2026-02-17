// Este layout se aplica APENAS ao que estiver dentro de /projects
export default function ProjectsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen w-full bg-white text-black overflow-y-auto">
        {/* Removemos as restrições de altura e tema escuro aqui para 
            que o projeto visualizado tenha sua própria "vida". */}
        {children}
      </div>
    );
  }