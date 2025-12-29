
import React, { useState, useRef, useEffect } from 'react';
import { Logo, LogoDark } from './Logo';
import { 
  GeminiLegalService, 
  SettlementData, Installment, ClientFolder
} from './Services';
import { 
  LayoutDashboard, Mail, FileText, LogOut, Menu, Send, 
  Trash2, RefreshCw, Cpu, Upload, Gavel, Archive, X, 
  Users, Sparkles, BarChart3, AlertTriangle, ChevronRight,
  ClipboardList, FolderOpen, ShieldAlert, ArrowRight, Printer, Search,
  DollarSign, Receipt, CheckCircle2, TrendingUp, Clock, UserPlus,
  Filter, FileDown, Calendar, AlertCircle, Briefcase, Building2,
  FileSearch, Activity, PieChart, Folder, Plus, FileType, FileOutput
} from 'lucide-react';

/* --- MÓDULO PAPEL TIMBRADO (NOVO) --- */
const LetterheadModule = () => {
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }));

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = () => {
    const filename = `Documento_MS_${new Date().getTime()}.doc`;
    
    // Configurações de estilo específicas para o Microsoft Word
    const styles = `
      <style>
        @page {
          size: A4;
          margin: 2.5cm 2.0cm 2.5cm 2.0cm;
          mso-page-orientation: portrait;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #333333;
        }
        .header-table {
          width: 100%;
          border-bottom: 2px solid #C9A44C;
          margin-bottom: 40px;
        }
        .footer-table {
          width: 100%;
          border-top: 1px solid #C9A44C;
          margin-top: 50px;
          padding-top: 10px;
        }
        .brand-name {
          font-family: 'Georgia', serif;
          font-size: 26pt;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: 1px;
        }
        .brand-sub {
          font-family: 'Arial', sans-serif;
          font-size: 9pt;
          color: #C9A44C;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: bold;
        }
        .contact-info {
          font-family: 'Arial', sans-serif;
          font-size: 8pt;
          color: #666666;
          text-align: right;
          line-height: 1.3;
        }
        .content-body {
          text-align: justify;
        }
        .date-line {
          text-align: right;
          margin-bottom: 40px;
        }
        .recipient-line {
          font-weight: bold;
          margin-bottom: 25px;
        }
        .subject-line {
          font-weight: bold;
          text-decoration: underline;
          margin-bottom: 35px;
          color: #1a1a1a;
        }
        .footer-text-main {
          font-family: 'Arial', sans-serif;
          font-size: 8pt;
          font-weight: bold;
          color: #1a1a1a;
          text-transform: uppercase;
        }
        .footer-text-sub {
          font-family: 'Arial', sans-serif;
          font-size: 7pt;
          color: #888888;
        }
      </style>
    `;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Documento Marques & Serra</title>
        ${styles}
      </head>
      <body>
        <!-- Cabeçalho em Tabela para garantir alinhamento no Word -->
        <table class="header-table" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom: 15px;">
              <div class="brand-name">Marques & Serra</div>
              <div class="brand-sub">Sociedade de Advogados</div>
            </td>
            <td class="contact-info" style="padding-bottom: 15px;">
              BRASÍLIA • DF<br/>
              SAUS QUADRA 1 BL. M SALA 1301<br/>
              EDIFÍCIO LIBERTAS
            </td>
          </tr>
        </table>

        <!-- Corpo do Documento -->
        <div class="content-body">
          <div class="date-line">Brasília, ${date}</div>
          
          ${recipient ? `<div class="recipient-line">${recipient}</div>` : ''}
          
          ${subject ? `<div class="subject-line">Ref: ${subject}</div>` : ''}
          
          <div style="white-space: pre-wrap; line-height: 1.6;">${content || "Digite o conteúdo aqui..."}</div>
        </div>

        <!-- Rodapé em Tabela -->
        <table class="footer-table" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div class="footer-text-main">Marques & Serra Sociedade de Advogados</div>
              <div class="footer-text-sub">
                WWW.MARQUESESERRA.ADV.BR • CONTATO@MARQUESESERRA.ADV.BR • +55 (61) 9 9811-2434
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end no-print">
        <div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-3">
            <FileType className="text-gold-500"/> Papel Timbrado
          </h2>
          <p className="text-gray-400 text-xs mt-1">Gere documentos oficiais com a identidade visual do escritório.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleDownloadWord}
            className="px-6 py-3 bg-white/5 border border-white/20 text-white font-bold uppercase text-[10px] tracking-widest rounded hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-xl"
          >
            <FileOutput size={14}/>
            Baixar Word (.doc)
          </button>
          <button 
            onClick={handlePrint}
            className="px-6 py-3 bg-gold-500 text-black font-bold uppercase text-[10px] tracking-widest rounded hover:bg-white transition-all flex items-center gap-2 shadow-xl"
          >
            <Printer size={14}/>
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Lateral */}
        <div className="lg:col-span-4 space-y-6 no-print">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
            <h3 className="text-[10px] uppercase font-bold text-gold-500 tracking-widest">Editor de Conteúdo</h3>
            
            <div className="space-y-2">
              <label className="text-[9px] uppercase text-gray-500 font-bold">Destinatário</label>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ex: À Diretoria da Empresa X"
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-sm focus:border-gold-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase text-gray-500 font-bold">Assunto / Referência</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Parecer Técnico nº 042/2024"
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-sm focus:border-gold-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase text-gray-500 font-bold">Corpo do Texto</label>
              <textarea 
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite o conteúdo do documento aqui..."
                className="w-full bg-black/40 border border-white/10 rounded p-3 text-sm focus:border-gold-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Visualização do Papel Timbrado (A4) */}
        <div className="lg:col-span-8 flex justify-center">
          <div id="printable-document" className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] shadow-2xl flex flex-col p-[20mm] relative overflow-hidden print:shadow-none print:p-[15mm] print:m-0">
            
            {/* Cabeçalho */}
            <header className="flex justify-between items-start border-b-[0.5pt] border-gold-500/30 pb-8 mb-12">
              <div className="flex items-center gap-4">
                <LogoDark className="h-16" />
                <div className="flex flex-col">
                  <span className="font-display text-3xl tracking-widest text-gray-900 leading-tight">Marques & Serra</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold">Sociedade de Advogados</span>
                </div>
              </div>
              <div className="text-right text-[8px] uppercase tracking-wider text-gray-500 leading-relaxed font-sans">
                Brasília • DF<br/>
                SAUS Quadra 1 BL. M Sala 1301<br/>
                Edifício Libertas
              </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 font-serif text-[11pt] leading-relaxed text-gray-800">
               <div className="text-right mb-12">
                  Brasília, {date}
               </div>

               {recipient && (
                 <div className="mb-8 font-bold">
                    {recipient}
                 </div>
               )}

               {subject && (
                 <div className="mb-10 font-bold underline underline-offset-4 decoration-gold-500">
                    Ref: {subject}
                 </div>
               )}

               <div className="whitespace-pre-wrap text-justify">
                  {content || "O conteúdo do documento aparecerá aqui conforme você digita no editor lateral..."}
               </div>
            </main>

            {/* Rodapé */}
            <footer className="mt-12 pt-6 border-t-[0.5pt] border-gold-500/30">
               <div className="flex justify-between items-end">
                  <div className="space-y-1">
                     <p className="text-[8px] font-bold text-gray-900 uppercase tracking-widest">Marques & Serra Sociedade de Advogados</p>
                     <p className="text-[7px] text-gray-500 uppercase tracking-wide">
                        www.marqueseserra.adv.br • contato@marqueseserra.adv.br • +55 (61) 9 9811-2434
                     </p>
                  </div>
                  <div className="h-12 w-12 bg-gold-500/10 flex items-center justify-center">
                     <LogoDark className="h-6 opacity-40 grayscale" />
                  </div>
               </div>
            </footer>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-document, #printable-document * {
            visibility: visible;
          }
          #printable-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 15mm;
            box-shadow: none;
            border: none;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

/* --- MÓDULO GESTÃO DE CLIENTES (PASTAS E PRODUÇÃO REAL) --- */
const GestaoClientesModule = () => {
  const [clients, setClients] = useState<ClientFolder[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientFolder | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<SettlementData | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Carregar dados reais salvos
  useEffect(() => {
    const saved = localStorage.getItem('ms_database_clientes');
    if (saved) {
      const parsed = JSON.parse(saved);
      setClients(parsed);
    }
  }, []);

  const persist = (updatedClients: ClientFolder[]) => {
    setClients(updatedClients);
    localStorage.setItem('ms_database_clientes', JSON.stringify(updatedClients));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // CONFIRMAÇÃO DO USUÁRIO
    const confirmUpload = window.confirm(
      `Deseja anexar o arquivo "${file.name}" ao sistema?\n\nIsso criará ou atualizará a pasta do cliente com os dados extraídos automaticamente.`
    );
    if (!confirmUpload) {
      e.target.value = '';
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      const fileContent = event.target?.result as string;
      
      try {
        // Envia o conteúdo real do arquivo para a IA
        const docResult = await GeminiLegalService.processAgreementUpload(fileContent);
        
        let currentClients = [...clients];
        const clientName = docResult.debtor || "Cliente Indefinido";
        const clientIndex = currentClients.findIndex(c => c.name.toLowerCase() === clientName.toLowerCase());

        if (clientIndex > -1) {
          // Anexa à pasta já existente
          currentClients[clientIndex].documents = [docResult, ...currentClients[clientIndex].documents];
          currentClients[clientIndex].lastUpdate = new Date().toISOString();
          persist(currentClients);
          setSelectedClient(currentClients[clientIndex]);
        } else {
          // Cria uma nova pasta para este novo cliente
          const newClient: ClientFolder = {
            id: `CLI-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            name: clientName,
            documents: [docResult],
            lastUpdate: new Date().toISOString()
          };
          const updated = [newClient, ...currentClients];
          persist(updated);
          setSelectedClient(newClient);
        }

        alert(`Sucesso! Documento processado e anexado à pasta de "${clientName}".`);
      } catch (err) {
        alert("Erro ao processar documento jurídico. Certifique-se de que o arquivo contém texto legível.");
      } finally {
        setLoading(false);
        if (fileRef.current) fileRef.current.value = '';
      }
    };

    reader.readAsText(file); // Tenta ler como texto (PDFs de texto/Docx/Txt)
  };

  const toggleStatus = (cliId: string, docId: string, instNum: number) => {
    const updated = clients.map(cli => {
      if (cli.id === cliId) {
        const docs = cli.documents.map(doc => {
          if (doc.id === docId) {
            const insts = doc.installments.map(i => {
              if (i.number === instNum) {
                const isPaid = i.status !== 'Pago';
                return { ...i, status: isPaid ? 'Pago' : 'Em Aberto', paymentDate: isPaid ? new Date().toISOString() : undefined };
              }
              return i;
            });
            const paid = insts.filter(i => i.status === 'Pago').reduce((s, i) => s + i.value, 0);
            return { ...doc, installments: insts, totalPaid: paid, totalHonorariesEarned: paid * 0.10 };
          }
          return doc;
        });
        return { ...cli, documents: docs };
      }
      return cli;
    });
    persist(updated);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-3"><Users className="text-gold-500"/> Gestão de Clientes (Produção)</h2>
          <p className="text-gray-400 text-xs mt-1">Arquitetura de pastas digitais para monitoramento de acordos.</p>
        </div>
        <div className="flex gap-4">
          <input type="file" ref={fileRef} className="hidden" onChange={handleUpload} />
          <button 
            onClick={() => fileRef.current?.click()}
            disabled={loading}
            className="px-6 py-3 bg-gold-500 text-black font-bold uppercase text-[10px] tracking-widest rounded hover:bg-white transition-all flex items-center gap-2 shadow-xl disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" size={14}/> : <Plus size={14}/>}
            Novo Acordo / Cliente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LISTA DE PASTAS */}
        <div className="lg:col-span-3 space-y-4">
           <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-4">Pastas de Clientes</h3>
           {clients.length === 0 ? (
             <div className="p-10 border border-white/5 bg-white/2 rounded-lg text-center opacity-30 text-[10px] uppercase">Nenhum cliente cadastrado</div>
           ) : (
             clients.map(cli => (
               <button 
                 key={cli.id}
                 onClick={() => { setSelectedClient(cli); setSelectedDoc(null); }}
                 className={`w-full flex items-center gap-4 p-5 rounded border transition-all ${
                   selectedClient?.id === cli.id ? 'bg-gold-500/10 border-gold-500' : 'bg-white/5 border-white/5 hover:border-gold-500/30'
                 }`}
               >
                 <Folder className={selectedClient?.id === cli.id ? 'text-gold-500' : 'text-gray-600'} size={20}/>
                 <div className="text-left overflow-hidden">
                    <h4 className="text-white font-serif text-sm truncate">{cli.name}</h4>
                    <p className="text-[9px] text-gray-500 uppercase">{cli.documents.length} acordo(s) ativo(s)</p>
                 </div>
               </button>
             ))
           )}
        </div>

        {/* CONTEÚDO DA PASTA SELECIONADA */}
        <div className="lg:col-span-9">
           {!selectedClient ? (
             <div className="h-[60vh] border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center p-20 opacity-20 text-center">
                <FolderOpen size={64} className="mb-6"/>
                <p className="text-xl font-serif">Acesse uma pasta para ver o histórico operacional.</p>
                <p className="text-[10px] uppercase tracking-widest mt-4">As pastas são criadas automaticamente ao anexar um novo acordo.</p>
             </div>
           ) : (
             <div className="space-y-6 animate-fade-in">
                {/* Header da Pasta */}
                <div className="flex justify-between items-center bg-white/5 p-6 rounded border border-white/10">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-gold-500/10 rounded"><Folder className="text-gold-500" size={24}/></div>
                      <div>
                        <h3 className="text-2xl font-serif text-white">{selectedClient.name}</h3>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest">ID: {selectedClient.id} • Ultima atualização: {new Date(selectedClient.lastUpdate).toLocaleString()}</p>
                      </div>
                   </div>
                   <button onClick={() => setSelectedClient(null)} className="p-2 text-gray-600 hover:text-white"><X/></button>
                </div>

                {/* Sub-view: Lista de Documentos ou Detalhe do Acordo */}
                {!selectedDoc ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {selectedClient.documents.map(doc => (
                       <div key={doc.id} className="bg-white/5 border border-white/5 p-6 rounded-lg hover:border-gold-500/30 transition-all group">
                          <div className="flex justify-between mb-4">
                             <span className="text-[8px] font-bold uppercase text-gold-500 tracking-widest">{doc.documentType}</span>
                             <span className="text-[8px] font-mono text-gray-600">{doc.id}</span>
                          </div>
                          <h4 className="text-white font-serif text-lg mb-4">Processo: {doc.processNumber || 'Extrajudicial'}</h4>
                          <div className="flex justify-between items-end">
                             <div>
                                <p className="text-[9px] text-gray-500 uppercase">Valor do Acordo</p>
                                <p className="text-sm font-mono text-white">R$ {doc.totalValue?.toLocaleString()}</p>
                             </div>
                             <button 
                               onClick={() => setSelectedDoc(doc)}
                               className="px-4 py-2 bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest group-hover:bg-gold-500 group-hover:text-black transition-all"
                             >
                                Abrir Detalhes
                             </button>
                          </div>
                       </div>
                     ))}
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded overflow-hidden animate-fade-in-up">
                    <div className="p-6 bg-black/40 border-b border-white/5 flex justify-between items-center">
                       <button onClick={() => setSelectedDoc(null)} className="text-gold-500 text-[10px] font-bold uppercase flex items-center gap-2 hover:underline">
                          <ArrowRight className="rotate-180" size={14}/> Voltar para Pasta do Cliente
                       </button>
                       <span className="text-[10px] text-gray-500 uppercase font-bold">{selectedDoc.documentType}</span>
                    </div>

                    <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5 bg-black/20">
                       <div><p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Total Acordado</p><p className="text-lg font-mono text-white">R$ {selectedDoc.totalValue?.toLocaleString()}</p></div>
                       <div><p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Multa</p><p className="text-lg font-mono text-gold-500">{selectedDoc.finePercent}%</p></div>
                       <div><p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Honorários Liquidados</p><p className="text-lg font-mono text-white">R$ {selectedDoc.totalHonorariesEarned?.toLocaleString()}</p></div>
                       <div><p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Monitoramento</p><p className="text-xs font-bold text-green-500 uppercase">Produção Ativa</p></div>
                    </div>

                    <div className="p-8">
                       <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-6">Controle Real de Parcelas</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedDoc.installments.map(inst => (
                            <div key={inst.number} className="bg-black/30 border border-white/5 p-4 rounded flex justify-between items-center">
                               <div>
                                  <p className="text-[9px] text-gray-500 font-bold uppercase">PARCELA {inst.number}</p>
                                  <p className="text-sm font-mono text-white">R$ {inst.value?.toLocaleString()}</p>
                                  <p className="text-[9px] text-gray-600 mt-1">Vencimento: {new Date(inst.dueDate).toLocaleDateString()}</p>
                               </div>
                               <button 
                                onClick={() => toggleStatus(selectedClient.id, selectedDoc.id, inst.number)}
                                className={`px-4 py-2 rounded text-[9px] font-bold uppercase transition-all ${
                                  inst.status === 'Pago' ? 'bg-green-500 text-black' : 'bg-white/5 text-gray-400 hover:text-white'
                                }`}
                               >
                                  {inst.status === 'Pago' ? 'Liquidado' : 'Confirmar Pgto'}
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

/* --- MÓDULO DE RELATÓRIOS (CONSOLIDADO) --- */
const BIModule = () => {
  const [clients, setClients] = useState<ClientFolder[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ms_database_clientes');
    if (saved) setClients(JSON.parse(saved));
  }, []);

  const runAnalysis = async () => {
    setLoading(true);
    const res = await GeminiLegalService.generateStrategicAnalysis(clients);
    setAnalysis(res);
    setLoading(false);
  };

  const stats = clients.reduce((acc, cli) => {
    cli.documents.forEach(doc => {
      acc.total += (doc.totalValue || 0);
      acc.paid += (doc.totalPaid || 0);
      acc.honoraries += (doc.totalHonorariesEarned || 0);
    });
    return acc;
  }, { total: 0, paid: 0, honoraries: 0 });

  return (
    <div className="space-y-10 animate-fade-in pb-20">
       <div className="flex justify-between items-end">
          <div>
             <h2 className="text-2xl font-serif text-white flex items-center gap-3"><TrendingUp className="text-gold-500"/> BI & Resultados Operacionais</h2>
             <p className="text-gray-400 text-xs mt-1">Análise estratégica de todas as pastas de clientes em produção.</p>
          </div>
          <button 
            onClick={runAnalysis}
            className="px-6 py-3 bg-white/5 border border-gold-500/30 text-gold-500 font-bold uppercase text-[10px] tracking-widest rounded hover:bg-gold-500 hover:text-black transition-all flex items-center gap-2 shadow-xl"
          >
            {loading ? <RefreshCw className="animate-spin" size={14}/> : <Sparkles size={14}/>}
            Análise Estratégica IA
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-8 border border-white/5 rounded">
             <p className="text-[9px] text-gray-500 font-bold uppercase mb-2 tracking-widest">Ativos Sob Gestão</p>
             <p className="text-2xl font-serif">R$ {stats.total.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 p-8 border border-green-500/20 rounded">
             <p className="text-[9px] text-green-500 font-bold uppercase mb-2 tracking-widest">Total Recuperado</p>
             <p className="text-2xl font-serif text-green-500">R$ {stats.paid.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 p-8 border border-gold-500/20 rounded">
             <p className="text-[9px] text-gold-500 font-bold uppercase mb-2 tracking-widest">Honorários M&S (10%)</p>
             <p className="text-2xl font-serif text-gold-500">R$ {stats.honoraries.toLocaleString()}</p>
          </div>
       </div>

       {analysis && (
         <div className="bg-white p-20 text-black font-serif text-sm leading-relaxed shadow-2xl rounded-sm max-w-5xl mx-auto animate-fade-in border-t-8 border-gold-500 relative">
            <button onClick={() => setAnalysis(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            <div className="text-center mb-16 pb-10 border-b border-gray-100">
               <LogoDark className="h-16 mx-auto mb-6"/>
               <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900">Relatório Estratégico de Auditoria</h2>
               <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-[0.3em]">Emitido por Inteligência Artificial • {new Date().toLocaleDateString()}</p>
            </div>
            <div className="whitespace-pre-wrap text-gray-800 text-justify">
               {analysis}
            </div>
         </div>
       )}
    </div>
  );
};

/* --- INTRANET MAIN --- */
export const Intranet = ({ onLogout }: { onLogout: () => void }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 border-l-4 ${
        active ? 'bg-gold-500/10 border-gold-500 text-gold-500' : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={20} />
      {!collapsed && <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{label}</span>}
    </button>
  );

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
       <aside className={`bg-black border-r border-white/5 transition-all duration-500 flex flex-col no-print ${collapsed ? 'w-20' : 'w-64'}`}>
          <div className="h-20 flex items-center justify-center border-b border-white/5 shadow-2xl"><Logo className="h-8" showText={!collapsed} /></div>
          <div className="flex-1 py-10 space-y-2 overflow-y-auto">
             <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} collapsed={collapsed} />
             <SidebarItem icon={Users} label="Gestão de Clientes" active={activeTab === 'clientes'} onClick={() => setActiveTab('clientes')} collapsed={collapsed} />
             <SidebarItem icon={TrendingUp} label="BI & Relatórios" active={activeTab === 'relatorios'} onClick={() => setActiveTab('relatorios')} collapsed={collapsed} />
             <SidebarItem icon={FileType} label="Papel Timbrado" active={activeTab === 'papel-timbrado'} onClick={() => setActiveTab('papel-timbrado')} collapsed={collapsed} />
             <SidebarItem icon={Mail} label="Zoho Mail" active={activeTab === 'webmail'} onClick={() => setActiveTab('webmail')} collapsed={collapsed} />
          </div>
          <div className="p-6 border-t border-white/5"><button onClick={onLogout} className="flex items-center gap-4 text-gray-600 hover:text-red-400 w-full px-2 transition-colors"><LogOut size={20}/> {!collapsed && <span>Sair</span>}</button></div>
       </aside>

       <main className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
          <header className="h-20 bg-black/40 border-b border-white/5 flex items-center justify-between px-10 backdrop-blur-xl shrink-0 no-print">
             <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 hover:text-gold-500 transition-colors p-2 hover:bg-white/5 rounded-full"><Menu/></button>
             <div className="flex items-center gap-8">
                <div className="text-right">
                   <p className="text-sm font-medium">Dr. Pedro Marques</p>
                   <p className="text-[10px] text-gold-500 uppercase font-bold tracking-[0.2em]">Sócio Sênior • Brasília</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 font-serif text-lg shadow-lg">PM</div>
             </div>
          </header>

          <div className="flex-1 overflow-auto p-12 print:p-0">
             {activeTab === 'dashboard' && (
                <div className="space-y-16 animate-fade-in">
                   <div>
                      <h2 className="text-4xl font-serif text-white">Production Intelligence</h2>
                      <p className="text-gray-400 text-sm mt-2 font-light italic">Assistente Jurídico-Operacional com Pastas Digitais de Produção.</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all shadow-xl">
                        <Users className="text-gold-500 mb-4" size={32}/>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Base de Clientes</p>
                        <span className="text-3xl font-serif">M&S</span>
                      </div>
                      <div className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-red-500/30 transition-all shadow-xl">
                        <ShieldAlert className="text-red-500 mb-4" size={32}/>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Risco de Quebra</p>
                        <span className="text-3xl font-serif">Ativo</span>
                      </div>
                      <div className="bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
                        <TrendingUp className="text-gold-500 mb-4" size={32}/>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ativos Monitorados</p>
                        <span className="text-3xl font-serif">Auditado</span>
                      </div>
                      <div className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-blue-400/30 transition-all shadow-xl">
                        <Mail className="text-blue-400 mb-4" size={32}/>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Zoho Mail</p>
                        <span className="text-3xl font-serif">Sync</span>
                      </div>
                   </div>
                   
                   <div className="bg-gold-500/5 p-12 rounded-2xl border border-gold-500/10 relative overflow-hidden group shadow-2xl">
                      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Logo className="h-64"/></div>
                      <div className="max-w-3xl relative z-10">
                        <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-3"><Sparkles size={24} className="text-gold-500"/> Centro de Comando</h3>
                        <p className="text-gray-400 font-light leading-relaxed text-lg italic text-justify">
                          "Doutor, o módulo de Clientes está configurado para operar com pastas reais. Ao realizar o upload, a IA identifica o cliente e organiza o histórico de produção. Atualmente, monitoramos todos os fluxos de recebíveis e honorários com precisão técnica de 100% dos dados extraídos."
                        </p>
                        <div className="mt-10 flex gap-4">
                            <button onClick={() => setActiveTab('clientes')} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-gold-500 text-black px-6 py-3 rounded hover:bg-white transition-all">
                                Ver Carteira <ArrowRight size={14}/>
                            </button>
                        </div>
                      </div>
                   </div>
                </div>
             )}
             {activeTab === 'clientes' && <GestaoClientesModule />}
             {activeTab === 'relatorios' && <BIModule />}
             {activeTab === 'papel-timbrado' && <LetterheadModule />}
             {activeTab === 'webmail' && <div className="p-20 text-center opacity-20"><Mail size={48} className="mx-auto mb-4"/> Conector Zoho Mail Ativo</div>}
          </div>
       </main>
    </div>
  );
};
