import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Star, Leaf, Gem, Sun, MessageCircle, Phone } from "lucide-react";
import { getMoonPhase, getMoonSign, getAstralClimate, getGreeting } from "@/lib/moon";
import BottomNav from "@/components/BottomNav";
import altarRitual from "@/assets/altar-ritual.jpg";

const quickActions = [
  { icon: Flame, label: "Rituais", path: "/grimorio/rituais", color: "text-primary" },
  { icon: Sparkles, label: "Tarô", path: "/grimorio/taro", color: "text-primary" },
  { icon: Star, label: "Astrologia", path: "/grimorio/sabas", color: "text-primary" },
  { icon: Leaf, label: "Ervas", path: "/grimorio/ervas", color: "text-accent" },
  { icon: Gem, label: "Cristais", path: "/grimorio/cristais", color: "text-accent" },
  { icon: Sun, label: "Altar", path: "/grimorio/altar", color: "text-primary" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  const moon = getMoonPhase();
  const sign = getMoonSign();
  const climate = getAstralClimate(moon.name);
  const greeting = getGreeting();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={altarRitual} alt="Altar místico com velas e ervas" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-lg mx-auto px-4 -mt-8 relative z-10 space-y-5"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-1">
          <p className="text-muted-foreground text-sm">{greeting}, querida</p>
          <h1 className="text-2xl font-heading text-gold-gradient">Bruxa Henilda</h1>
        </motion.div>

        {/* Moon Card */}
        <motion.div variants={item} className="glass-card gold-border-glow rounded-xl p-5 text-center space-y-3">
          <div className="text-5xl animate-float moon-glow inline-block">{moon.emoji}</div>
          <div>
            <h2 className="font-heading text-lg text-primary">Lua {moon.name}</h2>
            <p className="text-sm text-muted-foreground">
              em {sign.name} {sign.emoji} · {moon.illumination}% iluminada
            </p>
          </div>
        </motion.div>

        {/* Astral Climate */}
        <motion.div variants={item} className="glass-card rounded-xl p-4 space-y-2">
          <h3 className="font-heading text-sm text-primary tracking-wide">✨ Clima Astral</h3>
          <p className="text-sm text-foreground leading-relaxed">{climate}</p>
        </motion.div>

        {/* Talk to Henilda */}
        <motion.div variants={item}>
          <Link
            to="/chat"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl mystical-gradient text-primary-foreground font-heading text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] gold-glow"
          >
            <MessageCircle size={20} />
            Falar com Bruxa Henilda
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          {quickActions.map(({ icon: Icon, label, path, color }) => (
            <Link
              key={label}
              to={path}
              className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300 hover:gold-border-glow active:scale-95"
            >
              <Icon size={24} className={color} strokeWidth={1.5} />
              <span className="text-xs text-foreground">{label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Services CTA */}
        <motion.div variants={item}>
          <Link
            to="/servicos"
            className="glass-card gold-border-glow rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-full mystical-gradient flex items-center justify-center shrink-0 gold-glow">
              <Phone size={20} className="text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading text-sm text-foreground">Trabalhos & Consultas</p>
              <p className="text-xs text-muted-foreground">Amor · Finanças · Cura · Tarô · Aulas</p>
            </div>
          </Link>
        </motion.div>

        {/* Next Events */}
        <motion.div variants={item} className="glass-card rounded-xl p-4 space-y-3">
          <h3 className="font-heading text-sm text-primary tracking-wide">🔮 Próximos Eventos</h3>
          <div className="space-y-2">
            {[
              { date: "21 Mar", event: "Mabon (Equinócio de Outono)", emoji: "🍂" },
              { date: "29 Mar", event: "Lua Nova em Áries", emoji: "🌑" },
              { date: "01 Mai", event: "Samhain", emoji: "🎃" },
            ].map((e) => (
              <div key={e.event} className="flex items-center gap-3 text-sm">
                <span className="text-lg">{e.emoji}</span>
                <div>
                  <p className="text-foreground">{e.event}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Index;
