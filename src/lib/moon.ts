const LUNAR_CYCLE = 29.53058867;
const KNOWN_NEW_MOON = new Date(2000, 0, 6, 18, 14);

const ZODIAC_SIGNS = [
  "Áries", "Touro", "Gêmeos", "Câncer",
  "Leão", "Virgem", "Libra", "Escorpião",
  "Sagitário", "Capricórnio", "Aquário", "Peixes",
];

const ZODIAC_EMOJIS: Record<string, string> = {
  "Áries": "♈", "Touro": "♉", "Gêmeos": "♊", "Câncer": "♋",
  "Leão": "♌", "Virgem": "♍", "Libra": "♎", "Escorpião": "♏",
  "Sagitário": "♐", "Capricórnio": "♑", "Aquário": "♒", "Peixes": "♓",
};

export interface MoonPhase {
  name: string;
  emoji: string;
  normalized: number;
  illumination: number;
}

export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const diff = date.getTime() - KNOWN_NEW_MOON.getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  const phase = ((days % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
  const normalized = phase / LUNAR_CYCLE;

  const illumination = Math.round((1 - Math.cos(2 * Math.PI * normalized)) / 2 * 100);

  if (normalized < 0.0625) return { name: "Nova", emoji: "🌑", normalized, illumination };
  if (normalized < 0.1875) return { name: "Crescente Côncava", emoji: "🌒", normalized, illumination };
  if (normalized < 0.3125) return { name: "Quarto Crescente", emoji: "🌓", normalized, illumination };
  if (normalized < 0.4375) return { name: "Crescente Convexa", emoji: "🌔", normalized, illumination };
  if (normalized < 0.5625) return { name: "Cheia", emoji: "🌕", normalized, illumination };
  if (normalized < 0.6875) return { name: "Minguante Convexa", emoji: "🌖", normalized, illumination };
  if (normalized < 0.8125) return { name: "Quarto Minguante", emoji: "🌗", normalized, illumination };
  if (normalized < 0.9375) return { name: "Minguante Côncava", emoji: "🌘", normalized, illumination };
  return { name: "Nova", emoji: "🌑", normalized, illumination };
}

export function getMoonSign(date: Date = new Date()): { name: string; emoji: string } {
  const SIDEREAL_MONTH = 27.321661;
  const KNOWN_ARIES = new Date(2024, 0, 11);
  const diff = (date.getTime() - KNOWN_ARIES.getTime()) / (1000 * 60 * 60 * 24);
  const idx = Math.floor(((diff % SIDEREAL_MONTH + SIDEREAL_MONTH) % SIDEREAL_MONTH) / (SIDEREAL_MONTH / 12));
  const name = ZODIAC_SIGNS[idx % 12];
  return { name, emoji: ZODIAC_EMOJIS[name] };
}

export function getAstralClimate(phaseName: string): string {
  const climates: Record<string, string> = {
    "Nova": "Introspecção e novos começos. Plante suas intenções em silêncio.",
    "Crescente Côncava": "Energia crescendo. Hora de nutrir sementes plantadas.",
    "Quarto Crescente": "Momento de ação e decisão. Coragem para avançar.",
    "Crescente Convexa": "Refinamento e ajustes. Confie no processo.",
    "Cheia": "Plenitude e celebração. Colha os frutos da sua intenção.",
    "Minguante Convexa": "Gratidão e partilha. Distribua o que recebeu.",
    "Quarto Minguante": "Liberação e desapego. Solte o que não serve mais.",
    "Minguante Côncava": "Descanso e preparação interior. Honre o vazio criativo.",
  };
  return climates[phaseName] || "Observe os sinais da natureza ao seu redor.";
}

export function getMonthDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: (Date | null)[] = [];

  const startDow = firstDay.getDay();
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}
