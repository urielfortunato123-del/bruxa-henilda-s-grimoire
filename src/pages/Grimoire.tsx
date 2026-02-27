import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Sun, Palette, Sparkles, Leaf, Gem, Shield, Droplets, BookOpen, Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const modules = [
  { icon: Flame, label: "Rituais", desc: "Práticas e cerimônias", color: "text-primary", path: "/grimorio/rituais" },
  { icon: Sun, label: "Altar", desc: "Montagem e consagração", color: "text-primary", path: "/grimorio/altar" },
  { icon: Palette, label: "Cromoterapia", desc: "Cores e intenções", color: "text-primary", path: "/grimorio/cromoterapia" },
  { icon: Sparkles, label: "Tarô", desc: "Tiragens e diário", color: "text-primary", path: "/grimorio/taro" },
  { icon: Leaf, label: "Ervas", desc: "Propriedades e usos", color: "text-accent", path: "/grimorio/ervas" },
  { icon: Gem, label: "Cristais", desc: "Limpeza e energização", color: "text-accent", path: "/grimorio/cristais" },
  { icon: Shield, label: "Amuletos", desc: "Consagração e uso", color: "text-primary", path: "/grimorio/amuletos" },
  { icon: Droplets, label: "Banhos", desc: "Receitas e defumações", color: "text-accent", path: "/grimorio/banhos" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

const Grimoire = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-heading text-gold-gradient">📚 Grimório</h1>
          <p className="text-sm text-muted-foreground">Sua biblioteca mágica pessoal</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar no grimório..."
            className="w-full bg-muted text-foreground rounded-xl pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Modules */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3">
          {modules.map(({ icon: Icon, label, desc, color, path }) => (
            <motion.div key={label} variants={item}>
              <Link
                to={path}
                className="glass-card rounded-xl p-5 flex flex-col items-center gap-3 text-center transition-all hover:gold-border-glow active:scale-95 block"
              >
                <Icon size={28} className={color} strokeWidth={1.5} />
                <div>
                  <p className="font-heading text-sm text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Sabbats shortcut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/grimorio/sabas"
            className="glass-card gold-border-glow rounded-xl p-4 flex items-center gap-4 block"
          >
            <BookOpen size={24} className="text-primary" />
            <div>
              <p className="font-heading text-sm text-foreground">Roda do Ano</p>
              <p className="text-xs text-muted-foreground">8 Sabás — Hemisfério Sul</p>
            </div>
          </Link>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Grimoire;
