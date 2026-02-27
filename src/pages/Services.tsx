import { motion } from "framer-motion";
import { Heart, TrendingUp, Sparkles, Eye, BookOpen, Brain, Phone, Star, Quote } from "lucide-react";
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

        {/* Testimonials */}
        <div className="space-y-3">
          <h2 className="font-heading text-sm text-primary tracking-wide text-center">⭐ Depoimentos</h2>
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {[
              {
                name: "Carla M.",
                text: "A Henilda mudou minha vida! Fiz o trabalho de amor e em menos de um mês meu relacionamento se transformou completamente. Muito grata! 💗",
                service: "Magia para Amor",
                stars: 5,
              },
              {
                name: "Fernanda S.",
                text: "As consultas de tarô são incríveis. Ela tem uma sensibilidade e uma clareza que nunca vi em nenhum outro profissional. Recomendo de olhos fechados.",
                service: "Consulta de Tarô",
                stars: 5,
              },
              {
                name: "Juliana R.",
                text: "Depois do trabalho de prosperidade, consegui o emprego dos meus sonhos e as dívidas começaram a se resolver. A energia mudou completamente!",
                service: "Crescimento Financeiro",
                stars: 5,
              },
              {
                name: "Patrícia L.",
                text: "As aulas são maravilhosas! Aprendi tanto sobre ervas e cristais. A Henilda ensina com paciência e sabedoria. Me sinto mais conectada com minha espiritualidade.",
                service: "Aulas",
                stars: 5,
              },
              {
                name: "Amanda T.",
                text: "A sessão de cura espiritual foi transformadora. Saí leve, renovada, como se tivessem tirado um peso enorme das minhas costas. Obrigada, Henilda! ✨",
                service: "Cura Espiritual",
                stars: 5,
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={item}
                className="glass-card rounded-xl p-4 space-y-2"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={12} className="text-primary fill-primary" />
                  ))}
                </div>
                <div className="flex items-start gap-2">
                  <Quote size={14} className="text-primary shrink-0 mt-0.5 rotate-180" />
                  <p className="text-sm text-foreground leading-relaxed italic">{t.text}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-heading text-foreground">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.service}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

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
