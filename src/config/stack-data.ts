import { Monitor, Code2, Cloud, Database } from "lucide-react";
import { StackCategory } from "@/types/stack";

export const STACK_CONFIG: StackCategory[] = [
  {
    id: "frontend",
    label: "Interface & Experience",
    icon: Monitor,
    leadText: "Construindo camadas visuais onde a performance encontra a estética minimalista.",
    items: [
      { id: "r19", name: "React 19", url: "https://react.dev/", category: "framework", description: "Arquitetura baseada em componentes com foco em concorrência e Server Components." },
      { id: "n15", name: "Next.js 15", url: "https://nextjs.org/", category: "framework", description: "Otimização de rotas, caching avançado e core web vitals de elite." },
      { id: "ts", name: "TypeScript", url: "https://www.typescriptlang.org/", category: "language", description: "Segurança estática que elimina classes inteiras de bugs em tempo de execução." },
      { id: "tw", name: "Tailwind CSS", url: "https://tailwindcss.com/", category: "tool", description: "Engine CSS utilitário que permite iteração rápida sem perder a consistência." },
      { id: "fm", name: "Framer Motion", url: "https://www.framer.com/motion/", category: "tool", description: "A magia por trás das micro-interações fluidas e transições de estado." },
    ],
  },
  {
    id: "backend",
    label: "Scalable Systems",
    icon: Code2,
    leadText: "Engine de processamento robusto focado em alta disponibilidade e baixa latência.",
    items: [
      { id: "node", name: "Node.js", url: "https://nodejs.org/", category: "framework", description: "Runtime assíncrono para I/O intensivo e microserviços escaláveis." },
      { id: "go", name: "Go Lang", url: "https://go.dev/", category: "language", description: "Performance de linguagem compilada com simplicidade de desenvolvimento." },
      { id: "grpc", name: "gRPC", url: "https://grpc.io/", category: "tool", description: "Protocolo de comunicação de alto desempenho baseado em HTTP/2." },
      { id: "redis", name: "Redis", url: "https://redis.io/", category: "infra", description: "Cache ultra-rápido para otimização de estados compartilhados." },
    ],
  },
  {
    id: "infrastructure",
    label: "Cloud Architecture",
    icon: Cloud,
    leadText: "Orquestração e resiliência. Onde o código se torna um serviço global.",
    items: [
      { id: "aws", name: "AWS", url: "https://aws.amazon.com/", category: "infra", description: "Ecossistema líder para infraestrutura como serviço e auto-scaling." },
      { id: "docker", name: "Docker", url: "https://www.docker.com/", category: "tool", description: "Isolamento completo e paridade absoluta entre ambientes." },
      { id: "k8s", name: "Kubernetes", url: "https://kubernetes.io/", category: "infra", description: "Orquestração inteligente para containers em larga escala." },
      { id: "tf", name: "Terraform", url: "https://www.terraform.io/", category: "tool", description: "Infraestrutura como Código (IaC) para ambientes auditáveis." },
    ],
  },
  {
    id: "data",
    label: "Data & Intelligence",
    icon: Database,
    leadText: "Modelagem e persistência de dados com integridade absoluta.",
    items: [
      { id: "pg", name: "PostgreSQL", url: "https://www.postgresql.org/", category: "infra", description: "Padrão de ouro em bancos relacionais com suporte a JSON e escalabilidade." },
      { id: "prisma", name: "Prisma", url: "https://www.prisma.io/", category: "tool", description: "ORM moderno que transforma o banco de dados em uma API tipada." },
      { id: "pine", name: "Pinecone", url: "https://www.pinecone.io/", category: "infra", description: "Vector DB para aplicações modernas de IA e busca semântica." },
    ],
  },
];