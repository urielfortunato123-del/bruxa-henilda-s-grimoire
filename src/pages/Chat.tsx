import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Flame, Moon, Star, Sparkles, Leaf, Gem, Sun, Palette } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickChips = [
  { icon: Flame, label: "Ritual" },
  { icon: Moon, label: "Lua" },
  { icon: Star, label: "Astrologia" },
  { icon: Sparkles, label: "Tarô" },
  { icon: Leaf, label: "Ervas" },
  { icon: Gem, label: "Cristais" },
  { icon: Sun, label: "Altar" },
  { icon: Palette, label: "Cores" },
];

const RESPONSES: Record<string, string> = {
  ritual: "🕯️ Ritual de Limpeza Simples\n\n👉 Intenção: Limpar energias estagnadas do seu espaço.\n\n👉 Preparos:\n• 1 vela branca\n• Alecrim seco ou incenso\n• Sal grosso\n\n👉 Passo a passo:\n1. Abra janelas para circulação de ar\n2. Acenda a vela branca com intenção clara\n3. Defume os cômodos no sentido anti-horário\n4. Coloque pitadas de sal grosso nos cantos\n5. Agradeça e encerre\n\n👉 Cuidados:\n• Nunca deixe vela acesa sem supervisão\n• Ventile bem após a defumação\n\n👉 Alternativas:\nSe não tiver alecrim, use louro ou lavanda seca.",
  lua: "🌙 A Lua é nossa grande companheira nos ciclos.\n\n👉 Intenção: Conectar-se com a energia lunar do momento.\n\n👉 Preparos:\n• Observe a fase atual no app\n• Escolha um local tranquilo\n\n👉 Passo a passo:\n1. Sente-se em silêncio por 5 minutos\n2. Visualize a luz da lua envolvendo você\n3. Pergunte internamente: \"O que preciso liberar?\"\n4. Anote suas impressões no Diário\n\n👉 Cuidados:\n• Não force respostas — confie no processo\n\n👉 Alternativas:\nBanho com sal grosso e alecrim sob a luz da lua.",
  erva: "🌿 Ervas são pilares da bruxaria natural.\n\n👉 Intenção: Conhecer as propriedades básicas.\n\n👉 Preparos:\n• Alecrim: proteção, clareza mental\n• Lavanda: calma, purificação\n• Arruda: limpeza energética pesada\n• Camomila: paz, sonhos\n• Louro: prosperidade, realização\n\n👉 Cuidados:\n⚠️ Sempre verifique alergias antes de usar\n⚠️ Grávidas devem evitar arruda e diversas ervas\n⚠️ Cuidado com pets — muitas ervas são tóxicas\n⚠️ Ervas não substituem tratamento médico\n\n👉 Alternativas:\nSe não tiver a erva fresca, use óleos essenciais ou sachês secos.",
  cristal: "💎 Cristais são ferramentas de foco e intenção.\n\n👉 Intenção: Começar a trabalhar com cristais.\n\n👉 Preparos:\n• Quartzo Rosa: amor-próprio\n• Ametista: intuição, espiritualidade\n• Citrino: prosperidade, alegria\n• Obsidiana: proteção, aterramento\n• Turmalina Negra: escudo energético\n\n👉 Passo a passo:\n1. Limpe com água corrente (evite para selenita)\n2. Energize ao sol da manhã ou luz da lua\n3. Programe segurando e visualizando sua intenção\n\n👉 Cuidados:\n• Alguns cristais não podem molhar\n• Não substitua tratamento médico\n\n👉 Alternativas:\nPedras do rio ou da natureza também carregam energia.",
  taro: "🃏 O Tarô é espelho, não previsão.\n\n👉 Intenção: Orientar-se, não prever o futuro.\n\n👉 Preparos:\n• Baralho limpo energeticamente\n• Ambiente calmo e silencioso\n• Pergunta clara formulada\n\n👉 Passo a passo:\n1. Respire fundo 3 vezes\n2. Embaralhe pensando na pergunta\n3. Tire 1 a 3 cartas\n4. Observe as imagens antes de ler significados\n5. Registre no Diário de Tarô\n\n👉 Cuidados:\n• Evite perguntas de sim/não\n• Não tire cartas repetidamente sobre o mesmo tema\n\n👉 Alternativas:\nUse oráculos mais simples como runas ou pendulo.",
  astrologia: "⭐ Astrologia Tropical — O céu como mapa, não destino.\n\n👉 Intenção: Compreender tendências e potenciais.\n\n👉 Conceitos básicos:\n• Sol: essência, identidade\n• Lua: emoções, instinto\n• Ascendente: máscara social, primeira impressão\n• Vênus: amor, valores\n• Marte: ação, energia\n\n👉 Cuidados:\n• Astrologia mostra tendências, não certezas\n• Livre-arbítrio sempre prevalece\n• Evite generalizações pelo signo solar apenas\n\n👉 Alternativas:\nComece observando trânsitos lunares — são os mais perceptíveis no dia a dia.",
  altar: "🕯️ O Altar é seu espaço sagrado pessoal.\n\n👉 Intenção: Criar ou renovar seu altar.\n\n👉 Preparos:\n• Escolha um canto tranquilo\n• Tecido de base (cores conforme intenção)\n• Elementos: vela, incenso, cristal, erba, água\n\n👉 Passo a passo:\n1. Limpe o espaço com defumação\n2. Posicione os 4 elementos nas direções\n3. Adicione itens pessoais com significado\n4. Acenda uma vela com intenção\n5. Consagre pedindo proteção ao espaço\n\n👉 Cuidados:\n• Mantenha limpo e organizado\n• Renove conforme as lunações\n\n👉 Alternativas:\nAltares portáteis em caixas funcionam perfeitamente.",
  cores: "🎨 Cromoterapia Mágica\n\n👉 Intenção: Usar cores como ferramenta energética.\n\n👉 Correspondências:\n• Branco: purificação, paz\n• Vermelho: coragem, paixão, força\n• Verde: cura, abundância, natureza\n• Azul: comunicação, calma, proteção\n• Roxo: espiritualidade, intuição\n• Dourado: prosperidade, solar, sucesso\n• Preto: proteção, banimento\n• Rosa: amor, reconciliação\n\n👉 Passo a passo:\n1. Identifique sua necessidade\n2. Escolha a cor correspondente\n3. Use em velas, roupas, altar ou banhos\n\n👉 Cuidados:\n• Cromoterapia complementa, não substitui tratamentos\n\n👉 Alternativas:\nVisualize a cor durante meditação se não tiver objetos.",
  default: "🌙 Olá, querida! Sou a Bruxa Henilda, sua guia de bruxaria natural e tradicional.\n\nEstou aqui para te ajudar com:\n\n🕯️ Rituais e práticas espirituais\n🌿 Ervas e suas propriedades\n💎 Cristais e como trabalhar com eles\n🃏 Tarô e interpretações\n⭐ Astrologia e trânsitos\n🌙 Fases da lua e seus significados\n🕯️ Montagem e consagração de altar\n🎨 Cromoterapia e correspondências\n\nPergunte-me qualquer coisa! Estou aqui para guiar, não para julgar. 💜",
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("ritual") || lower.includes("limpeza") || lower.includes("proteção")) return RESPONSES.ritual;
  if (lower.includes("lua") || lower.includes("lunar")) return RESPONSES.lua;
  if (lower.includes("erva") || lower.includes("alecrim") || lower.includes("planta")) return RESPONSES.erva;
  if (lower.includes("cristal") || lower.includes("pedra") || lower.includes("quartzo")) return RESPONSES.cristal;
  if (lower.includes("tarô") || lower.includes("taro") || lower.includes("carta")) return RESPONSES.taro;
  if (lower.includes("astro") || lower.includes("signo") || lower.includes("mapa")) return RESPONSES.astrologia;
  if (lower.includes("altar")) return RESPONSES.altar;
  if (lower.includes("cor") || lower.includes("cromo") || lower.includes("vela")) return RESPONSES.cores;
  return RESPONSES.default;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(text),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="min-h-screen flex flex-col pb-16">
      {/* Header */}
      <div className="glass-card border-b border-border p-4 text-center sticky top-0 z-40">
        <h1 className="font-heading text-lg text-gold-gradient">🔮 Bruxa Henilda</h1>
        <p className="text-xs text-muted-foreground">Sua guia de bruxaria natural</p>
      </div>

      {/* Quick chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {quickChips.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => send(`Me fale sobre ${label.toLowerCase()}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap glass-card text-foreground hover:gold-border-glow transition-all"
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 py-2">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-secondary text-secondary-foreground rounded-br-sm"
                    : "glass-card gold-border-glow text-foreground rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass-card rounded-xl px-4 py-3 text-sm text-muted-foreground">
              <span className="animate-pulse">Henilda está consultando o caldeirão...</span>
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-16 p-3 glass-card border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2 max-w-lg mx-auto"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte à Bruxa Henilda..."
            className="flex-1 bg-muted text-foreground rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 rounded-xl mystical-gradient text-primary-foreground disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat;
