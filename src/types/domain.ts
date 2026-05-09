export type StatusOS =
  | "ABERTA"
  | "EM_ANDAMENTO"
  | "PAUSADA"
  | "AGUARDANDO_CLIENTE"
  | "CONCLUIDA"
  | "CANCELADA";

export type SlaStatus = "OK" | "RISCO" | "ESTOURADO";

export type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";

export type TipoServico =
  | "INSTALACAO_OLT"
  | "MIGRACAO_BNG"
  | "TROCA_EQUIPAMENTO"
  | "MANUTENCAO_PREVENTIVA"
  | "EMERGENCIA"
  | "AUDITORIA"
  | "TREINAMENTO"
  | "REVISAO_CONFIGURACAO"
  | "PLANEJAMENTO"
  | "INTEGRACAO";

export type StatusTecnico = "DISPONIVEL" | "EM_CAMPO" | "INDISPONIVEL" | "FERIAS";

export interface Provedor {
  id: string;
  nome: string;
  slug: string;
  cidade: string;
  uf: string;
  cor: string;
  contratoAtivo: boolean;
  tier: "OURO" | "PRATA" | "BRONZE";
}

export interface Tecnico {
  id: string;
  nome: string;
  email: string;
  status: StatusTecnico;
  especialidades: TipoServico[];
  cargaAtual: number;
  capacidadeMax: number;
  avatarUrl?: string;
}

export interface OrdemServico {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  provedorId: string;
  tecnicoId?: string;
  tipo: TipoServico;
  status: StatusOS;
  prioridade: Prioridade;
  sla: SlaStatus;
  slaPrazoHoras: number;
  slaConsumidoPct: number;
  criadaEm: string;
  atualizadaEm: string;
  prazoFim: string;
  cidade: string;
  uf: string;
  tags: string[];
}

export interface EventoOS {
  id: string;
  ordemId: string;
  tipo: "CRIACAO" | "ATRIBUICAO" | "STATUS" | "COMENTARIO" | "ANEXO" | "SLA";
  autor: string;
  mensagem: string;
  data: string;
}
