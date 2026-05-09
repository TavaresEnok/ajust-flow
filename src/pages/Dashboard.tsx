import { useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ClipboardList,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ordens, getProvedor, getTecnico, tipoServicoLabel } from "@/data/mock";
import { StatusBadge, SlaBadge, PrioridadeBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

function Kpi({
  label,
  value,
  delta,
  trend,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  delta: string;
  trend: "up" | "down" | "flat";
  icon: any;
  hint: string;
}) {
  const trendUp = trend === "up";
  return (
    <Card className="p-5 shadow-elev-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
        </div>
        <div className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-medium",
            trendUp ? "bg-sla-ok-bg text-sla-ok" : "bg-sla-estourado-bg text-sla-estourado",
          )}
        >
          {trendUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {delta}
        </span>
        <span className="text-muted-foreground">{hint}</span>
      </div>
    </Card>
  );
}

const trendData = Array.from({ length: 14 }, (_, i) => ({
  dia: `${i + 1}/05`,
  abertas: 18 + Math.floor(Math.sin(i / 2) * 6 + Math.random() * 8),
  concluidas: 14 + Math.floor(Math.cos(i / 2) * 5 + Math.random() * 9),
}));

export default function Dashboard() {
  const stats = useMemo(() => {
    const ativas = ordens.filter((o) => !["CONCLUIDA", "CANCELADA"].includes(o.status));
    const slaRisco = ordens.filter((o) => o.sla === "RISCO" || o.sla === "ESTOURADO");
    const concluidas = ordens.filter((o) => o.status === "CONCLUIDA").length;
    return { ativas: ativas.length, slaRisco: slaRisco.length, concluidas, total: ordens.length };
  }, []);

  const porProvedor = useMemo(() => {
    const map = new Map<string, number>();
    ordens.forEach((o) => map.set(o.provedorId, (map.get(o.provedorId) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([id, count]) => ({ name: getProvedor(id)?.nome ?? id, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const criticas = useMemo(
    () =>
      [...ordens]
        .filter((o) => !["CONCLUIDA", "CANCELADA"].includes(o.status))
        .sort((a, b) => b.slaConsumidoPct - a.slaConsumidoPct)
        .slice(0, 6),
    [],
  );

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Visão geral da operação</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Indicadores consolidados das ordens executadas pela Ajust Consulting para os provedores ativos.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Últimos 14 dias</Button>
          <Button size="sm" asChild>
            <Link to="/app/ordens">Ver todas as ordens</Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="OS ativas" value={stats.ativas} delta="+12" trend="up" icon={ClipboardList} hint="vs. semana anterior" />
        <Kpi label="SLA em risco" value={stats.slaRisco} delta="+4" trend="down" icon={AlertTriangle} hint="exigem atenção" />
        <Kpi label="Concluídas no mês" value={stats.concluidas} delta="+18%" trend="up" icon={TrendingUp} hint="vs. mês anterior" />
        <Kpi label="Técnicos em campo" value={18} delta="-2" trend="down" icon={Users} hint="alocação atual" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5 shadow-elev-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Volume de ordens — últimos 14 dias</h3>
              <p className="text-xs text-muted-foreground">Aberturas vs conclusões diárias</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" /> Abertas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-sla-ok" /> Concluídas
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--sla-ok))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--sla-ok))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dia" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="abertas" stroke="hsl(var(--primary))" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="concluidas" stroke="hsl(var(--sla-ok))" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 shadow-elev-sm">
          <h3 className="text-sm font-semibold">Ordens por provedor</h3>
          <p className="text-xs text-muted-foreground">Distribuição total no período</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porProvedor} layout="vertical" margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Críticas + atividade */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5 shadow-elev-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Ordens críticas</h3>
              <p className="text-xs text-muted-foreground">Maior consumo de SLA, exigem ação imediata</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/ordens">Ver todas</Link>
            </Button>
          </div>
          <div className="space-y-2">
            {criticas.map((o) => {
              const prov = getProvedor(o.provedorId);
              const tec = getTecnico(o.tecnicoId);
              return (
                <Link
                  key={o.id}
                  to={`/app/ordens?os=${o.id}`}
                  className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-card p-3 transition hover:border-primary/30 hover:bg-accent/30"
                >
                  <span className="font-mono text-xs text-muted-foreground">{o.numero}</span>
                  <span className="flex-1 min-w-[180px] truncate text-sm font-medium">{o.titulo}</span>
                  <span className="text-xs text-muted-foreground">{prov?.nome}</span>
                  <span className="text-xs text-muted-foreground">{tec?.nome ?? "—"}</span>
                  <PrioridadeBadge prioridade={o.prioridade} />
                  <StatusBadge status={o.status} />
                  <SlaBadge sla={o.sla} pct={o.slaConsumidoPct} />
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 shadow-elev-sm">
          <h3 className="text-sm font-semibold">Atividade recente</h3>
          <div className="mt-4 space-y-4">
            {[
              { i: Activity, c: "primary", t: "OS AJ-2026017 atribuída a Bruno Tavares", d: "há 2 min" },
              { i: AlertTriangle, c: "sla-risco", t: "SLA em risco — Meganet · Curitiba", d: "há 8 min" },
              { i: TrendingUp, c: "sla-ok", t: "OS AJ-2026013 concluída por Rafael", d: "há 14 min" },
              { i: ClipboardList, c: "primary", t: "Nova OS aberta — UltraFibra", d: "há 22 min" },
              { i: Users, c: "primary", t: "Patrícia Lima entrou em campo", d: "há 41 min" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    a.c === "primary" && "bg-accent text-accent-foreground",
                    a.c === "sla-risco" && "bg-sla-risco-bg text-sla-risco",
                    a.c === "sla-ok" && "bg-sla-ok-bg text-sla-ok",
                  )}
                >
                  <a.i className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed">{a.t}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
