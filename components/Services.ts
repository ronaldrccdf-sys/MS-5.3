
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
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal ? 'http://localhost:3001' : window.location.origin;
      const response = await fetch(`${baseUrl}/api/news?area=${encodeURIComponent(area)}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      onUpdate(data);
    } catch (error) {
      console.error("News fetch error:", error);
    }
  }
};
