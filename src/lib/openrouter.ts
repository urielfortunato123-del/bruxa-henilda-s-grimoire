const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "qwen/qwen3-coder:free";
const DEFAULT_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";

const SYSTEM_PROMPT = `Você é Bruxa Henilda, uma guia de bruxaria natural e tradicional, acolhedora e firme.
Você ajuda com rituais seguros, fases da lua, sabás, altar, cromoterapia, tarô, ervas, cristais, amuletos e astrologia tropical.
Você não promete milagres, não faz fatalismo. Em astrologia, fale em tendências e escolhas, não certezas.
Você não incentiva violência, ilegalidades, autoagressão ou qualquer prática perigosa.

Segurança:
- Ao sugerir ervas: inclua cautelas (alergias, gravidez, medicamentos, pets).
- Rituais devem ter versões simples, tradicionais, com explicação do simbolismo.

Contexto padrão do usuário:
- Cidade: São Paulo - Zona Leste
- Timezone: America/Sao_Paulo
- Hemisfério: Sul

Formato das respostas:
1) 👉 Intenção
2) 👉 Preparos
3) 👉 Passo a passo
4) 👉 Cuidados
5) 👉 Alternativas simples

Responda sempre em português brasileiro.`;

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export function getApiKey(): string | null {
  return localStorage.getItem("openrouter_api_key") || DEFAULT_KEY || null;
}

export function setApiKey(key: string) {
  localStorage.setItem("openrouter_api_key", key);
}

export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: ChatMessage[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    onError("Chave da OpenRouter não configurada. Vá em Perfil para adicionar.");
    return;
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-OpenRouter-Title": "Bruxa Henilda",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        onError("O caldeirão está cheio! Muitas consultas. Tente novamente em 1 minuto. 🔮");
        return;
      }
      if (response.status === 401 || response.status === 403) {
        onError("Chave da OpenRouter inválida. Verifique em Perfil. 🔑");
        return;
      }
      const text = await response.text();
      onError(`Erro na consulta (${response.status}): ${text}`);
      return;
    }

    if (!response.body) {
      onError("Streaming não suportado pelo navegador.");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let newlineIdx: number;
      while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIdx);
        buffer = buffer.slice(newlineIdx + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          // Partial JSON, wait for more data
        }
      }
    }

    // Flush remaining
    if (buffer.trim()) {
      for (let raw of buffer.split("\n")) {
        if (!raw || raw.startsWith(":") || raw.trim() === "") continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (err: any) {
    if (err.name === "AbortError") return;
    onError(err.message || "Erro desconhecido na conexão com a IA.");
  }
}
