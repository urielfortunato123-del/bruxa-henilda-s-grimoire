import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Flame, Moon, Star, Sparkles, Leaf, Gem, Sun, Palette, AlertCircle } from "lucide-react";
import { streamChat, getApiKey, type ChatMessage } from "@/lib/openrouter";
import BottomNav from "@/components/BottomNav";
import { Link } from "react-router-dom";

interface UIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickChips = [
  { icon: Flame, label: "Ritual", prompt: "Me sugira um ritual simples de limpeza para hoje" },
  { icon: Moon, label: "Lua", prompt: "Como está a lua hoje e como aproveitar sua energia?" },
  { icon: Star, label: "Astrologia", prompt: "Me explique os conceitos básicos de astrologia tropical" },
  { icon: Sparkles, label: "Tarô", prompt: "Como fazer uma tiragem simples de tarô?" },
  { icon: Leaf, label: "Ervas", prompt: "Quais as ervas essenciais para uma bruxa iniciante?" },
  { icon: Gem, label: "Cristais", prompt: "Quais cristais são fundamentais e como limpá-los?" },
  { icon: Sun, label: "Altar", prompt: "Como montar meu primeiro altar?" },
  { icon: Palette, label: "Cores", prompt: "Me ensine sobre cromoterapia e correspondências de cores" },
];

const WELCOME = "🌙 Olá, querida! Sou a Bruxa Henilda, sua guia de bruxaria natural e tradicional.\n\nEstou aqui para te ajudar com rituais, ervas, cristais, tarô, astrologia, fases da lua, altar e cromoterapia.\n\nPergunte-me qualquer coisa! Estou aqui para guiar, não para julgar. 💜";

const Chat = () => {
  const [messages, setMessages] = useState<UIMessage[]>([
    { id: "welcome", role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(!!getApiKey());
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    setHasKey(!!getApiKey());
  }, []);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;
    setError(null);

    const userMsg: UIMessage = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    const history: ChatMessage[] = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));
    history.push({ role: "user", content: text.trim() });

    let assistantContent = "";
    const assistantId = (Date.now() + 1).toString();

    await streamChat({
      messages: history,
      onDelta: (chunk) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.id === assistantId) {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [...prev, { id: assistantId, role: "assistant", content: assistantContent }];
        });
      },
      onDone: () => {
        setIsStreaming(false);
        if (!assistantContent) {
          setMessages((prev) => [
            ...prev,
            { id: assistantId, role: "assistant", content: "✨ Parece que as estrelas silenciaram por um momento. Tente novamente, querida." },
          ]);
        }
      },
      onError: (errMsg) => {
        setIsStreaming(false);
        setError(errMsg);
      },
    });
  }, [isStreaming, messages]);

  return (
    <div className="min-h-screen flex flex-col pb-16">
      {/* Header */}
      <div className="glass-card border-b border-border p-4 text-center sticky top-0 z-40">
        <h1 className="font-heading text-lg text-gold-gradient">🔮 Bruxa Henilda</h1>
        <p className="text-xs text-muted-foreground">
          {isStreaming ? "✨ Consultando o caldeirão..." : "Sua guia de bruxaria natural"}
        </p>
      </div>

      {/* API Key warning */}
      {!hasKey && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-secondary/80 border border-primary/30 flex items-start gap-2">
          <AlertCircle size={16} className="text-primary mt-0.5 shrink-0" />
          <div className="text-xs text-foreground">
            <p>Para conversar com a IA, adicione sua chave OpenRouter em{" "}
              <Link to="/perfil" className="text-primary underline">Perfil</Link>.
            </p>
          </div>
        </div>
      )}

      {/* Quick chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {quickChips.map(({ icon: Icon, label, prompt }) => (
          <button
            key={label}
            onClick={() => send(prompt)}
            disabled={isStreaming}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap glass-card text-foreground hover:gold-border-glow transition-all disabled:opacity-50"
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

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass-card rounded-xl px-4 py-3 text-sm text-destructive border border-destructive/30 max-w-[85%]">
              ⚠️ {error}
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
            disabled={isStreaming}
            className="flex-1 bg-muted text-foreground rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
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
