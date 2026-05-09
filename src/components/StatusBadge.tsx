import { cn } from "@/lib/utils";
import type { StatusOS, SlaStatus, Prioridade } from "@/types/domain";
import { statusLabel } from "@/data/mock";

const statusStyles: Record<StatusOS, string> = {
  ABERTA: "bg-status-aberta-bg text-status-aberta",
  EM_ANDAMENTO: "bg-status-andamento-bg text-status-andamento",
  PAUSADA: "bg-status-pausada-bg text-status-pausada",
  AGUARDANDO_CLIENTE: "bg-status-aguardando-bg text-status-aguardando",
  CONCLUIDA: "bg-status-concluida-bg text-status-concluida",
  CANCELADA: "bg-status-cancelada-bg text-status-cancelada",
};

export function StatusBadge({ status, className }: { status: StatusOS; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-current/10",
        statusStyles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}

const slaStyles: Record<SlaStatus, string> = {
  OK: "bg-sla-ok-bg text-sla-ok",
  RISCO: "bg-sla-risco-bg text-sla-risco",
  ESTOURADO: "bg-sla-estourado-bg text-sla-estourado",
};

const slaLabel: Record<SlaStatus, string> = {
  OK: "SLA OK",
  RISCO: "SLA em risco",
  ESTOURADO: "SLA estourado",
};

export function SlaBadge({
  sla,
  pct,
  className,
  compact,
}: {
  sla: SlaStatus;
  pct?: number;
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums",
        slaStyles[sla],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current animate-pulse" />
      {compact ? `${Math.min(pct ?? 0, 999)}%` : `${slaLabel[sla]}${pct != null ? ` · ${Math.min(pct, 999)}%` : ""}`}
    </span>
  );
}

const prioridadeStyles: Record<Prioridade, string> = {
  BAIXA: "text-muted-foreground bg-muted",
  MEDIA: "text-status-aberta bg-status-aberta-bg",
  ALTA: "text-status-andamento bg-status-andamento-bg",
  CRITICA: "text-sla-estourado bg-sla-estourado-bg",
};

export function PrioridadeBadge({ prioridade }: { prioridade: Prioridade }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        prioridadeStyles[prioridade],
      )}
    >
      {prioridade}
    </span>
  );
}
