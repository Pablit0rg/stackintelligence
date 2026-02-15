import { motion } from "framer-motion";

export const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <header className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="h-px w-8 bg-white/20" />
      <span className="mono text-[10px] uppercase tracking-[0.4em] text-white/40">Technical DNA</span>
    </motion.div>
    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
      {title} <span className="text-white/30 italic font-light">{subtitle}</span>
    </h2>
  </header>
);