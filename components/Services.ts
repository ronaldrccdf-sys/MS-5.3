
import { GoogleGenAI, Type } from "@google/genai";

export interface Installment {
  number: number;
  dueDate: string;
  value: number;
  status: 'Pago' | 'Em Aberto' | 'Atrasado';
  paymentDate?: string;
  honoraryValue: number;
}

export interface SettlementData {
  id: string;
  documentType: 'Judicial Homologado' | 'Extrajudicial' | 'Confissão de Dívida';
  processNumber: string;
  court?: string;
  creditor: string;
  debtor: string;
  totalValue: number;
  installments: Installment[];
  finePercent: number;
  accelerationClause: boolean; 
  interestRate?: number;
  status: 'Adimplente' | 'Em atraso' | 'Descumprido';
  totalPaid: number;
  totalHonorariesEarned: number;
  createdAt: string;
}

export interface ClientFolder {
  id: string;
  name: string;
  documents: SettlementData[];
  lastUpdate: string;
}

export interface NewsItem {
  headline: string;
  source: string;
  link: string;
}

export const GeminiLegalService = {
  /**
   * EXTRAÇÃO JURÍDICA DE PRODUÇÃO
   */
  processAgreementUpload: async (text: string): Promise<SettlementData> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Você é um Assistente Jurídico-Operacional Sênior. Analise o seguinte conteúdo extraído de um documento real de acordo:
        
        "${text}"
        
        OBJETIVO: Extrair dados para controle de execução e faturamento real.
        IDENTIFIQUE O CLIENTE/DEVEDOR: O nome do Devedor será usado como nome da pasta do cliente no sistema.
        
        REGRAS DE RETORNO (JSON ESTRITO):
        1. "documentType": Classificar entre 'Judicial Homologado', 'Extrajudicial' ou 'Confissão de Dívida'.
        2. "debtor": Nome completo do Devedor/Executado.
        3. "totalValue": Valor bruto do acordo.
        4. "finePercent": Percentual da multa por inadimplemento.
        5. "accelerationClause": booleano indicando se há vencimento antecipado das parcelas.
        6. "installments": Array com { number, dueDate (YYYY-MM-DD), value }.

        Se houver dados ausentes, estime com base no contexto ou marque como "Não informado".`,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 15000 }
        }
      });
      
      const raw = JSON.parse(response.text || "{}");
      
      const settlement: SettlementData = {
        ...raw,
        id: `DOC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        status: 'Adimplente',
        totalPaid: 0,
        totalHonorariesEarned: 0,
        createdAt: new Date().toISOString(),
        installments: (raw.installments || []).map((i: any) => ({
          ...i,
          status: 'Em Aberto',
          honoraryValue: (i.value || 0) * 0.10
        }))
      };
      
      return settlement;
    } catch (error) {
      console.error("Falha na extração Gemini:", error);
      throw new Error("Erro ao processar a inteligência jurídica do documento.");
    }
  },

  /**
   * ANÁLISE ESTRATÉGICA
   */
  generateStrategicAnalysis: async (clients: ClientFolder[]) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Como consultor estratégico, analise a base de clientes do escritório: ${JSON.stringify(clients)}.
        Identifique riscos de inadimplência e recomende medidas de retomada de execução para os casos críticos.`,
      });
      return response.text;
    } catch (error) {
      return "Indisponível no momento.";
    }
  },

  /**
   * CURADORIA DE NOTÍCIAS POR ÁREA (STREAMING) - HOJE APENAS
   */
  getPracticeNewsStream: async (area: string, onUpdate: (news: NewsItem[]) => void) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const today = new Date().toLocaleDateString('pt-BR');
    try {
      const prompt = `Você é o Curador de Inteligência Jurídica do escritório Marques & Serra. 
      Sua missão é buscar e reportar as 10 principais notícias REAIS publicadas EXCLUSIVAMENTE hoje (${today}) na área de: ${area}.

      REGRAS CRÍTICAS PARA EVITAR LINKS QUEBRADOS (404) E NOTÍCIAS FALSAS:
      1. SÓ use links de notícias publicadas no dia de HOJE (${today}). 
      2. VERIFIQUE rigorosamente cada link via Google Search. Se o link não levar diretamente à matéria ativa de hoje, NÃO inclua.
      3. NUNCA invente manchetes. Se não houver 10 notícias reais de hoje, traga apenas as que existirem (mesmo que seja apenas uma).
      4. Use APENAS veículos de alta credibilidade:
         - Valor Econômico, JOTA, ConJur, Brazil Journal, Estadão, Folha de S.Paulo, CanalEnergia, MegaWhat, Petronotícias.
      5. Responda IMEDIATAMENTE conforme encontrar cada item, retornando um JSON array de objetos { headline, source, link }.`;

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-pro-preview', // Pro is better at search verification
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                source: { type: Type.STRING },
                link: { type: Type.STRING },
              },
              required: ["headline", "source", "link"],
            }
          }
        },
      });

      let fullContent = "";
      for await (const chunk of result) {
        fullContent += chunk.text || "";
        try {
          const cleaned = fullContent.trim();
          // Logic to update partial arrays for "one-by-one" feel
          if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
            const parsed = JSON.parse(cleaned);
            onUpdate(parsed);
          } else if (cleaned.startsWith("[")) {
            const lastIndex = cleaned.lastIndexOf("}");
            if (lastIndex !== -1) {
              const partial = cleaned.substring(0, lastIndex + 1) + "]";
              const parsed = JSON.parse(partial);
              onUpdate(parsed);
            }
          }
        } catch (e) {
          // Catch incomplete JSON parsing
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
    }
  }
};
