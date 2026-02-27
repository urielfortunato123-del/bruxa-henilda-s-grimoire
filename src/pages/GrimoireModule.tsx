import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Flame, Sun, Palette, Sparkles, Leaf, Gem, Shield, Droplets, BookOpen } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const moduleData: Record<string, {
  title: string;
  emoji: string;
  icon: any;
  color: string;
  intro: string;
  sections: { heading: string; content: string }[];
}> = {
  rituais: {
    title: "Rituais",
    emoji: "🕯️",
    icon: Flame,
    color: "text-primary",
    intro: "Rituais são práticas intencionais que conectam o mundo visível ao invisível. Aqui você encontra guias simples e seguros.",
    sections: [
      {
        heading: "Ritual de Limpeza",
        content: "👉 Intenção: Limpar energias estagnadas\n\nPreparos: vela branca, alecrim seco, sal grosso\n\n1. Abra janelas para ventilação\n2. Acenda a vela com intenção clara\n3. Defume os cômodos no sentido anti-horário\n4. Coloque sal grosso nos cantos\n5. Agradeça e encerre\n\n⚠️ Nunca deixe vela sem supervisão",
      },
      {
        heading: "Ritual de Proteção",
        content: "👉 Intenção: Criar escudo energético\n\nPreparos: vela preta ou branca, arruda, sal grosso, copo com água\n\n1. Acenda a vela pedindo proteção\n2. Defume com arruda seca\n3. Trace um círculo de sal ao redor de si\n4. Visualize luz dourada envolvendo seu corpo\n5. Agradeça e desfaça o círculo\n\n⚠️ Arruda: evitar em gravidez",
      },
      {
        heading: "Ritual de Prosperidade",
        content: "👉 Intenção: Abrir caminhos de abundância\n\nPreparos: vela dourada ou amarela, canela em pau, louro, mel\n\n1. Escreva sua intenção em papel\n2. Acenda a vela sobre o papel\n3. Queime canela e louro como defumação\n4. Passe mel nas mãos dizendo sua intenção\n5. Lave as mãos em água corrente\n\n⚠️ Cuidado com alergia a canela",
      },
      {
        heading: "Ritual de Amor-Próprio",
        content: "👉 Intenção: Fortalecer autoestima e autocuidado\n\nPreparos: vela rosa, quartzo rosa, pétalas de rosa, mel\n\n1. Prepare um banho morno com pétalas\n2. Acenda a vela rosa no banheiro\n3. Segure o quartzo rosa no coração\n4. Repita: 'Eu me amo e me aceito'\n5. Banhe-se visualizando luz rosa\n\n💎 Quartzo rosa amplifica o amor-próprio",
      },
    ],
  },
  altar: {
    title: "Altar",
    emoji: "🕯️",
    icon: Sun,
    color: "text-primary",
    intro: "O altar é seu espaço sagrado pessoal, um ponto de conexão entre o mundano e o espiritual.",
    sections: [
      {
        heading: "Montagem do Altar",
        content: "Escolha um canto tranquilo da casa. Cubra com tecido na cor da sua intenção.\n\nElementos básicos:\n• Norte – Terra: cristal ou sal\n• Sul – Fogo: vela\n• Leste – Ar: incenso\n• Oeste – Água: cálice com água\n• Centro: objeto pessoal significativo",
      },
      {
        heading: "Consagração",
        content: "1. Limpe o espaço com defumação\n2. Posicione os elementos nas direções\n3. Acenda a vela central\n4. Diga: 'Consagro este espaço como meu altar sagrado'\n5. Medite por alguns minutos sentindo a energia\n\nRenove a cada Lua Nova.",
      },
      {
        heading: "Limpeza e Manutenção",
        content: "• Limpe fisicamente toda semana\n• Defume com alecrim ou lavanda\n• Troque a água do cálice diariamente\n• Renove flores e ervas quando secarem\n• Reorganize nas mudanças de lua ou sabás",
      },
    ],
  },
  cromoterapia: {
    title: "Cromoterapia",
    emoji: "🎨",
    icon: Palette,
    color: "text-primary",
    intro: "As cores carregam frequências energéticas que influenciam nosso campo. Use-as com intenção em velas, roupas, altar e banhos.",
    sections: [
      {
        heading: "Correspondências de Cores",
        content: "🤍 Branco — purificação, paz, limpeza\n❤️ Vermelho — coragem, paixão, força, vitalidade\n💚 Verde — cura, abundância, natureza, fertilidade\n💙 Azul — comunicação, calma, proteção espiritual\n💜 Roxo — espiritualidade, intuição, conexão astral\n💛 Dourado — prosperidade, sucesso, energia solar\n🖤 Preto — proteção, banimento, absorção de negatividade\n💗 Rosa — amor, reconciliação, suavidade",
      },
      {
        heading: "Como Usar",
        content: "1. Identifique sua necessidade atual\n2. Escolha a cor correspondente\n3. Aplique em:\n   • Velas no altar\n   • Roupas do dia\n   • Tecidos no altar\n   • Banhos com pétalas da cor\n   • Visualização em meditação\n\n⚠️ Cromoterapia complementa, não substitui tratamentos médicos",
      },
    ],
  },
  taro: {
    title: "Tarô",
    emoji: "🃏",
    icon: Sparkles,
    color: "text-primary",
    intro: "O Tarô é espelho da alma, não previsão do futuro. As cartas revelam tendências e caminhos possíveis.",
    sections: [
      {
        heading: "Tiragem de 1 Carta",
        content: "A mais simples e poderosa para o dia a dia.\n\n1. Respire fundo 3 vezes\n2. Embaralhe pensando: 'O que preciso saber hoje?'\n3. Tire 1 carta\n4. Observe a imagem antes de buscar significados\n5. Anote suas impressões no diário",
      },
      {
        heading: "Tiragem de 3 Cartas",
        content: "Passado — Presente — Futuro\n\n1. Formule uma pergunta aberta\n2. Embaralhe com foco na questão\n3. Tire 3 cartas da esquerda para direita\n4. Carta 1: o que ficou para trás\n5. Carta 2: o momento atual\n6. Carta 3: tendência futura\n\n⚠️ Evite perguntas de sim/não",
      },
      {
        heading: "Cuidados",
        content: "• Não tire cartas repetidamente sobre o mesmo tema\n• Limpe o baralho com fumaça de alecrim periodicamente\n• Guarde em tecido escuro ou caixa de madeira\n• Não empreste seu baralho pessoal\n• Tarô mostra tendências, não certezas absolutas",
      },
    ],
  },
  ervas: {
    title: "Ervas",
    emoji: "🌿",
    icon: Leaf,
    color: "text-accent",
    intro: "As ervas são pilares da bruxaria natural. Cada uma carrega propriedades únicas que auxiliam em rituais, banhos e defumações.",
    sections: [
      {
        heading: "Ervas Essenciais",
        content: "🌿 Alecrim — proteção, clareza mental, purificação\n🌿 Lavanda — calma, paz, sono tranquilo\n🌿 Arruda — limpeza pesada, proteção forte\n🌿 Camomila — paz, sonhos proféticos\n🌿 Louro — prosperidade, realização de desejos\n🌿 Manjericão — amor, prosperidade\n🌿 Hortelã — renovação, frescor energético\n🌿 Sálvia — limpeza profunda, sabedoria\n🌿 Canela — prosperidade, aquecimento, atração\n🌿 Boldo — proteção, limpeza do fígado energético",
      },
      {
        heading: "Formas de Uso",
        content: "• Defumação: queime as ervas secas\n• Banho: infusão do pescoço para baixo\n• Sachê: ervas secas em saquinho de tecido\n• Chá ritual: beba com intenção (verificar se é comestível!)\n• Altar: coloque frescas ou secas como oferenda",
      },
      {
        heading: "⚠️ Cuidados Importantes",
        content: "• Verifique SEMPRE alergias antes de usar\n• Grávidas: evitar arruda, sálvia, canela em excesso\n• Pets: muitas ervas são TÓXICAS para gatos e cães\n• NUNCA substitua tratamento médico por ervas\n• Em dúvida, consulte um profissional de saúde\n• Compre de fontes confiáveis e orgânicas quando possível",
      },
    ],
  },
  cristais: {
    title: "Cristais",
    emoji: "💎",
    icon: Gem,
    color: "text-accent",
    intro: "Cristais são ferramentas de foco e intenção. Cada mineral vibra em frequência própria, amplificando energias específicas.",
    sections: [
      {
        heading: "Cristais Fundamentais",
        content: "💗 Quartzo Rosa — amor-próprio, cura emocional\n💜 Ametista — intuição, espiritualidade, calma\n💛 Citrino — prosperidade, alegria, criatividade\n🖤 Obsidiana — proteção, aterramento, verdade\n⬛ Turmalina Negra — escudo energético, absorve negatividade\n🤍 Quartzo Transparente — amplificador universal\n💚 Aventurina — sorte, prosperidade, saúde\n🔵 Lápis-Lazúli — sabedoria, terceiro olho, comunicação",
      },
      {
        heading: "Limpeza",
        content: "• Água corrente: quartzo, ametista, citrino (NÃO selenita, malaquita)\n• Sal grosso: 24h enterrado em sal\n• Fumaça: passe na fumaça de alecrim ou sálvia\n• Som: use sino tibetano ou batidas rítmicas\n• Luz da lua: deixe na janela na Lua Cheia",
      },
      {
        heading: "Programação",
        content: "1. Limpe o cristal primeiro\n2. Segure nas mãos junto ao coração\n3. Respire fundo 3 vezes\n4. Visualize sua intenção como luz\n5. Diga em voz alta ou mental sua intenção\n6. Agradeça o cristal\n\n⚠️ Cristais não substituem tratamento médico",
      },
    ],
  },
  amuletos: {
    title: "Amuletos",
    emoji: "🛡️",
    icon: Shield,
    color: "text-primary",
    intro: "Amuletos são objetos carregados com intenção protetora ou de atração. Podem ser colares, sachês, pedras ou qualquer objeto pessoal.",
    sections: [
      {
        heading: "Tipos de Amuletos",
        content: "🧿 Proteção: olho grego, pentagrama, turmalina negra\n🍀 Sorte: trevo, ferradura, olho de tigre\n❤️ Amor: quartzo rosa, sachê de rosas\n💰 Prosperidade: citrino, moeda antiga, canela\n🌙 Intuição: ametista, lua crescente, lápis-lazúli",
      },
      {
        heading: "Consagração",
        content: "1. Limpe o objeto com fumaça de ervas\n2. Segure nas mãos e respire fundo\n3. Declare a intenção em voz alta\n4. Passe pelos 4 elementos (terra, fogo, ar, água)\n5. Guarde junto ao corpo ou em local especial\n\nRenove a consagração a cada Lua Nova.",
      },
    ],
  },
  banhos: {
    title: "Banhos & Defumações",
    emoji: "💧",
    icon: Droplets,
    color: "text-accent",
    intro: "Banhos rituais e defumações são formas ancestrais de purificação e energização do corpo e dos espaços.",
    sections: [
      {
        heading: "Banho de Limpeza",
        content: "Ingredientes: sal grosso + alecrim + folhas de louro\n\n1. Ferva 1L de água com as ervas (5 min)\n2. Coe e deixe amornar\n3. Tome seu banho normal primeiro\n4. Jogue a infusão do pescoço para baixo\n5. Não enxágue — seque-se naturalmente\n\n⚠️ Sal grosso não deve ir na cabeça",
      },
      {
        heading: "Banho de Prosperidade",
        content: "Ingredientes: canela em pau + louro + manjericão + mel\n\n1. Ferva as ervas em 1L de água\n2. Coe, adicione 1 colher de mel\n3. Jogue do pescoço para baixo após banho normal\n4. Visualize caminhos se abrindo\n\n⚠️ Cuidado com alergia a canela",
      },
      {
        heading: "Defumação",
        content: "Para limpeza de ambientes:\n\n• Alecrim: limpeza geral, proteção\n• Sálvia branca: limpeza profunda\n• Lavanda: paz e harmonia\n• Arruda: limpeza pesada (usar com moderação)\n\nPasse em todos os cômodos, sentido anti-horário.\nAbra janelas antes e depois.\n\n⚠️ Cuidado com fumaça para asmáticos e pets",
      },
    ],
  },
  sabas: {
    title: "Roda do Ano",
    emoji: "☀️",
    icon: BookOpen,
    color: "text-primary",
    intro: "Os 8 Sabás marcam os ciclos da natureza. No Hemisfério Sul, as datas são invertidas em relação ao Norte.",
    sections: [
      {
        heading: "Samhain — 1º de Maio",
        content: "🎃 Ano novo das bruxas. Honrar ancestrais e o véu fino entre mundos.\n\nAltar: fotos de ancestrais, velas pretas e laranjas, maçãs\nCores: preto, laranja, roxo\nErvas: alecrim, sálvia, mirra\nCristal: obsidiana, ametista",
      },
      {
        heading: "Yule — 21 de Junho",
        content: "❄️ Solstício de inverno. Renascimento da luz, esperança.\n\nAltar: pinheiro, velas vermelhas e verdes, frutas secas\nCores: vermelho, verde, dourado\nErvas: pinho, canela, alecrim\nCristal: quartzo transparente, citrino",
      },
      {
        heading: "Imbolc — 1º de Agosto",
        content: "🕯️ Despertar da primavera interior. Purificação e renovação.\n\nAltar: velas brancas, leite, sementes\nCores: branco, amarelo claro\nErvas: lavanda, camomila\nCristal: quartzo rosa, selenita",
      },
      {
        heading: "Ostara — 22 de Setembro",
        content: "🐣 Equinócio de primavera. Equilíbrio, fertilidade, novos começos.\n\nAltar: ovos, flores, sementes, coelhos\nCores: verde, rosa, amarelo\nErvas: jasmin, violeta\nCristal: aventurina, água-marinha",
      },
      {
        heading: "Beltane — 1º de Novembro",
        content: "🔥 Celebração da vida, paixão e fertilidade.\n\nAltar: flores, fitas coloridas, velas vermelhas\nCores: vermelho, verde, rosa\nErvas: rosa, manjericão, canela\nCristal: quartzo rosa, cornalina",
      },
      {
        heading: "Litha — 21 de Dezembro",
        content: "☀️ Solstício de verão. Plenitude, abundância, poder máximo do sol.\n\nAltar: girassóis, frutas, velas douradas\nCores: dourado, amarelo, laranja\nErvas: girassol, camomila, alecrim\nCristal: citrino, olho de tigre",
      },
      {
        heading: "Lughnasadh — 1º de Fevereiro",
        content: "🌾 Primeira colheita. Gratidão e partilha.\n\nAltar: pães, grãos, espigas\nCores: dourado, marrom, verde\nErvas: trigo, milho, alecrim\nCristal: citrino, cornalina",
      },
      {
        heading: "Mabon — 21 de Março",
        content: "🍂 Equinócio de outono. Segunda colheita, equilíbrio, gratidão.\n\nAltar: frutas da estação, folhas secas, vinho\nCores: marrom, laranja, vermelho escuro\nErvas: sálvia, alecrim, canela\nCristal: ametista, cornalina",
      },
    ],
  },
};

const GrimoireModule = () => {
  const { module } = useParams<{ module: string }>();
  const data = module ? moduleData[module] : null;

  if (!data) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl">🔮</p>
          <p className="text-foreground font-heading">Módulo não encontrado</p>
          <Link to="/grimorio" className="text-primary underline text-sm">Voltar ao Grimório</Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* Back + Header */}
        <div className="flex items-center gap-3">
          <Link to="/grimorio" className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <Icon size={24} className={data.color} />
            <h1 className="text-xl font-heading text-gold-gradient">{data.emoji} {data.title}</h1>
          </div>
        </div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {data.intro}
        </motion.p>

        {/* Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {data.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="glass-card gold-border-glow rounded-xl p-4 space-y-2"
            >
              <h3 className="font-heading text-sm text-primary">{section.heading}</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default GrimoireModule;
