import type {
  EventoOS,
  OrdemServico,
  Provedor,
  StatusOS,
  Tecnico,
  TipoServico,
} from "@/types/domain";

export const provedores: Provedor[] = [
  { id: "p1", nome: "Meganet Telecom", slug: "meganet", cidade: "Curitiba", uf: "PR", cor: "226 71% 50%", contratoAtivo: true, tier: "OURO" },
  { id: "p2", nome: "UltraFibra", slug: "ultrafibra", cidade: "São Paulo", uf: "SP", cor: "271 81% 56%", contratoAtivo: true, tier: "OURO" },
  { id: "p3", nome: "ConnectFibra", slug: "connectfibra", cidade: "Belo Horizonte", uf: "MG", cor: "142 71% 45%", contratoAtivo: true, tier: "PRATA" },
  { id: "p4", nome: "NetBrasil", slug: "netbrasil", cidade: "Recife", uf: "PE", cor: "0 72% 51%", contratoAtivo: true, tier: "PRATA" },
  { id: "p5", nome: "FibraSul", slug: "fibrasul", cidade: "Porto Alegre", uf: "RS", cor: "38 92% 50%", contratoAtivo: true, tier: "BRONZE" },
  { id: "p6", nome: "InterAmazon", slug: "interamazon", cidade: "Manaus", uf: "AM", cor: "180 60% 45%", contratoAtivo: false, tier: "BRONZE" },
];

export const tecnicos: Tecnico[] = [
  { id: "t1", nome: "Rafael Moreira", email: "rafael@ajust.com.br", status: "EM_CAMPO", especialidades: ["INSTALACAO_OLT", "MIGRACAO_BNG"], cargaAtual: 6, capacidadeMax: 8 },
  { id: "t2", nome: "Camila Souza", email: "camila@ajust.com.br", status: "DISPONIVEL", especialidades: ["AUDITORIA", "REVISAO_CONFIGURACAO"], cargaAtual: 3, capacidadeMax: 8 },
  { id: "t3", nome: "Bruno Tavares", email: "bruno@ajust.com.br", status: "EM_CAMPO", especialidades: ["EMERGENCIA", "TROCA_EQUIPAMENTO"], cargaAtual: 7, capacidadeMax: 8 },
  { id: "t4", nome: "Larissa Pinto", email: "larissa@ajust.com.br", status: "DISPONIVEL", especialidades: ["TREINAMENTO", "PLANEJAMENTO"], cargaAtual: 2, capacidadeMax: 8 },
  { id: "t5", nome: "Diego Almeida", email: "diego@ajust.com.br", status: "INDISPONIVEL", especialidades: ["INTEGRACAO", "MIGRACAO_BNG"], cargaAtual: 0, capacidadeMax: 8 },
  { id: "t6", nome: "Patrícia Lima", email: "patricia@ajust.com.br", status: "EM_CAMPO", especialidades: ["MANUTENCAO_PREVENTIVA", "INSTALACAO_OLT"], cargaAtual: 5, capacidadeMax: 8 },
  { id: "t7", nome: "Gustavo Reis", email: "gustavo@ajust.com.br", status: "FERIAS", especialidades: ["AUDITORIA"], cargaAtual: 0, capacidadeMax: 8 },
  { id: "t8", nome: "Marina Costa", email: "marina@ajust.com.br", status: "DISPONIVEL", especialidades: ["INTEGRACAO", "PLANEJAMENTO"], cargaAtual: 4, capacidadeMax: 8 },
];

const tipos: TipoServico[] = [
  "INSTALACAO_OLT", "MIGRACAO_BNG", "TROCA_EQUIPAMENTO", "MANUTENCAO_PREVENTIVA",
  "EMERGENCIA", "AUDITORIA", "TREINAMENTO", "REVISAO_CONFIGURACAO", "PLANEJAMENTO", "INTEGRACAO",
];

const statusList: StatusOS[] = ["ABERTA", "EM_ANDAMENTO", "PAUSADA", "AGUARDANDO_CLIENTE", "CONCLUIDA", "CANCELADA"];

const titulosPorTipo: Record<TipoServico, string[]> = {
  INSTALACAO_OLT: ["Instalação OLT Huawei MA5800", "Implantação OLT Nokia 7360", "Setup OLT ZTE C320"],
  MIGRACAO_BNG: ["Migração BNG Cisco ASR 9k", "Migração de PPPoE para IPoE", "Migração BNG Juniper MX"],
  TROCA_EQUIPAMENTO: ["Troca de switch agregação", "Substituição roteador core", "Troca módulo SFP+"],
  MANUTENCAO_PREVENTIVA: ["Preventiva trimestral POP", "Limpeza e revisão de DIO", "Inspeção de fibras"],
  EMERGENCIA: ["Queda total do POP", "Rompimento backbone", "Loop em rede de acesso"],
  AUDITORIA: ["Auditoria de configuração core", "Auditoria de segurança BGP", "Revisão de boas práticas"],
  TREINAMENTO: ["Treinamento equipe NOC", "Workshop de roteamento", "Capacitação em fibra óptica"],
  REVISAO_CONFIGURACAO: ["Revisão de QoS", "Ajuste de filtros BGP", "Tuning de OSPF"],
  PLANEJAMENTO: ["Projeto de expansão Bairro Centro", "Plano de capacidade 2026", "Desenho de novo POP"],
  INTEGRACAO: ["Integração com Voalle", "Conexão IX SP", "Integração CGNAT"],
};

const cidades = [
  ["Curitiba", "PR"], ["São Paulo", "SP"], ["Campinas", "SP"], ["Belo Horizonte", "MG"],
  ["Recife", "PE"], ["Porto Alegre", "RS"], ["Florianópolis", "SC"], ["Manaus", "AM"],
  ["Goiânia", "GO"], ["Salvador", "BA"], ["Fortaleza", "CE"], ["Brasília", "DF"],
];

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const random = rng(42);
const pick = <T,>(arr: T[]) => arr[Math.floor(random() * arr.length)];

function gerarOrdens(qtd: number): OrdemServico[] {
  const out: OrdemServico[] = [];
  const now = Date.now();
  for (let i = 0; i < qtd; i++) {
    const tipo = pick(tipos);
    const status = pick(statusList);
    const provedor = pick(provedores);
    const cidade = pick(cidades);
    const slaConsumidoPct =
      status === "CONCLUIDA" ? Math.floor(random() * 80) :
      Math.floor(random() * 130);
    const sla = slaConsumidoPct >= 100 ? "ESTOURADO" : slaConsumidoPct >= 75 ? "RISCO" : "OK";
    const slaPrazoHoras = pick([4, 8, 12, 24, 48, 72]);
    const criada = now - Math.floor(random() * 1000 * 60 * 60 * 24 * 30);
    const tecnico = random() > 0.15 ? pick(tecnicos) : undefined;
    const prioridade = pick(["BAIXA", "MEDIA", "ALTA", "CRITICA"] as const);
    const titulos = titulosPorTipo[tipo];
    out.push({
      id: `os-${i + 1}`,
      numero: `AJ-${String(2026000 + i).padStart(7, "0")}`,
      titulo: titulos[i % titulos.length],
      descricao: "Atividade técnica executada pela Ajust Consulting conforme escopo contratado.",
      provedorId: provedor.id,
      tecnicoId: tecnico?.id,
      tipo,
      status,
      prioridade,
      sla,
      slaPrazoHoras,
      slaConsumidoPct,
      criadaEm: new Date(criada).toISOString(),
      atualizadaEm: new Date(criada + 1000 * 60 * 60 * 3).toISOString(),
      prazoFim: new Date(criada + slaPrazoHoras * 3600 * 1000).toISOString(),
      cidade: cidade[0],
      uf: cidade[1],
      tags: [tipo.toLowerCase().replace(/_/g, "-"), provedor.slug],
    });
  }
  return out;
}

export const ordens: OrdemServico[] = gerarOrdens(124);

export const getProvedor = (id: string) => provedores.find((p) => p.id === id);
export const getTecnico = (id?: string) => tecnicos.find((t) => t.id === id);

export function eventosFor(ordemId: string): EventoOS[] {
  return [
    { id: `${ordemId}-e1`, ordemId, tipo: "CRIACAO", autor: "Sistema", mensagem: "Ordem aberta automaticamente via integração.", data: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: `${ordemId}-e2`, ordemId, tipo: "ATRIBUICAO", autor: "Camila Souza", mensagem: "Ordem atribuída a Rafael Moreira.", data: new Date(Date.now() - 86400000 * 1.8).toISOString() },
    { id: `${ordemId}-e3`, ordemId, tipo: "STATUS", autor: "Rafael Moreira", mensagem: "Status alterado para EM_ANDAMENTO.", data: new Date(Date.now() - 86400000 * 1.5).toISOString() },
    { id: `${ordemId}-e4`, ordemId, tipo: "COMENTARIO", autor: "Rafael Moreira", mensagem: "Cheguei ao POP, equipamento aguardando substituição.", data: new Date(Date.now() - 86400000).toISOString() },
    { id: `${ordemId}-e5`, ordemId, tipo: "SLA", autor: "Sistema", mensagem: "Atenção: SLA passou de 75% do prazo.", data: new Date(Date.now() - 3600000 * 4).toISOString() },
    { id: `${ordemId}-e6`, ordemId, tipo: "COMENTARIO", autor: "Bruno Tavares", mensagem: "Suporte remoto liberado para apoio.", data: new Date(Date.now() - 3600000).toISOString() },
  ];
}

export const tipoServicoLabel: Record<TipoServico, string> = {
  INSTALACAO_OLT: "Instalação OLT",
  MIGRACAO_BNG: "Migração BNG",
  TROCA_EQUIPAMENTO: "Troca Equipamento",
  MANUTENCAO_PREVENTIVA: "Manutenção Preventiva",
  EMERGENCIA: "Emergência",
  AUDITORIA: "Auditoria",
  TREINAMENTO: "Treinamento",
  REVISAO_CONFIGURACAO: "Revisão Configuração",
  PLANEJAMENTO: "Planejamento",
  INTEGRACAO: "Integração",
};

export const statusLabel: Record<StatusOS, string> = {
  ABERTA: "Aberta",
  EM_ANDAMENTO: "Em andamento",
  PAUSADA: "Pausada",
  AGUARDANDO_CLIENTE: "Aguardando cliente",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};
