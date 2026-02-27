import { motion } from "framer-motion";
import { Heart, TrendingUp, Sparkles, Eye, BookOpen, Brain, Phone } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const services = [
  { icon: Heart, label: "Magia para Amor", desc: "Amarração, reconciliação, atração", color: "text-primary" },
  { icon: TrendingUp, label: "Crescimento Financeiro", desc: "Prosperidade, abertura de caminhos", color: "text-primary" },
  { icon: Sparkles, label: "Cura Espiritual", desc: "Limpeza, descarrego, equilíbrio", color: "text-accent" },
  { icon: Eye, label: "Trabalhos de Vingança", desc: "Justiça, retorno, proteção", color: "text-primary" },
  { icon: BookOpen, label: "Aulas", desc: "Aprenda bruxaria natural e tradicional", color: "text-accent" },
  { icon: Brain, label: "Terapias", desc: "Sessões de cura e autoconhecimento", color: "text-accent" },
  { icon: Eye, label: "Consultas de Tarô", desc: "Leituras personalizadas e orientação", color: "text-primary" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const Services = () => {
  const whatsappLink = "https://wa.me/5511972239715?text=Olá%20Bruxa%20Henilda!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20trabalhos.";

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-heading text-gold-gradient">🔮 Trabalhos & Serviços</h1>
          <p className="text-sm text-muted-foreground">Atendimento personalizado com Bruxa Henilda</p>
        </div>

        {/* Services Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {services.map(({ icon: Icon, label, desc, color }) => (
            <motion.div
              key={label}
              variants={item}
              className="glass-card gold-border-glow rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Icon size={22} className={color} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-heading text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl mystical-gradient text-primary-foreground font-heading text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] gold-glow"
          >
            <Phone size={20} />
            Falar no WhatsApp
          </a>

          <div className="glass-card rounded-xl p-4 text-center space-y-2">
            <p className="text-xs text-muted-foreground">Contato direto</p>
            <a href="tel:+5511972239715" className="font-heading text-lg text-primary">
              (11) 97223-9715
            </a>
            <p className="text-xs text-muted-foreground">São Paulo — Zona Leste</p>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Services;
