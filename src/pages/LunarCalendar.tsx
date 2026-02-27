import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getMoonPhase, getMonthDays } from "@/lib/moon";
import BottomNav from "@/components/BottomNav";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const LunarCalendar = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const today = now.getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  const days = getMonthDays(year, month);

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-gold-gradient">🌙 Calendário Lunar</h1>
        </div>

        {/* Month nav */}
        <div className="flex items-center justify-between">
          <button onClick={prev} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-heading text-foreground">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button onClick={next} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {DAY_NAMES.map((d) => (
            <div key={d} className="text-xs text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const phase = getMoonPhase(day);
            const isToday = isCurrentMonth && day.getDate() === today;
            return (
              <button
                key={i}
                className={`flex flex-col items-center gap-0.5 py-2 rounded-lg transition-all text-center ${
                  isToday ? "gold-border-glow bg-secondary" : "hover:bg-secondary/50"
                }`}
              >
                <span className="text-xs text-foreground">{day.getDate()}</span>
                <span className="text-sm">{phase.emoji}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Legend */}
        <div className="glass-card rounded-xl p-4 space-y-2">
          <h3 className="font-heading text-sm text-primary">Fases</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            {[
              { e: "🌑", n: "Nova" }, { e: "🌓", n: "Quarto Crescente" },
              { e: "🌕", n: "Cheia" }, { e: "🌗", n: "Quarto Minguante" },
            ].map(({ e, n }) => (
              <div key={n} className="flex items-center gap-2">
                <span className="text-base">{e}</span> {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default LunarCalendar;
