import { useState } from "react";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  const [name, setName] = useState("Bruxa");
  const [city, setCity] = useState("São Paulo - Zona Leste");
  const [hemisphere, setHemisphere] = useState<"south" | "north">("south");
  const [discrete, setDiscrete] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-full mystical-gradient mx-auto flex items-center justify-center gold-glow">
            <Moon size={32} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-heading text-gold-gradient">Perfil</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-xs font-heading text-primary tracking-wide">Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-muted text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-heading text-primary tracking-wide">Cidade</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-muted text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-heading text-primary tracking-wide">Hemisfério</label>
            <div className="flex gap-3">
              {(["south", "north"] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHemisphere(h)}
                  className={`flex-1 py-3 rounded-xl text-sm font-body transition-all ${
                    hemisphere === h
                      ? "mystical-gradient text-primary-foreground gold-glow"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {h === "south" ? "🌎 Sul" : "🌍 Norte"}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground font-heading">Modo Discreto</p>
              <p className="text-xs text-muted-foreground">Ícone neutro no celular</p>
            </div>
            <button
              onClick={() => setDiscrete(!discrete)}
              className={`w-12 h-7 rounded-full transition-all relative ${
                discrete ? "mystical-gradient" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-foreground transition-all ${
                  discrete ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
