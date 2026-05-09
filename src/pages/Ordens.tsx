import { useMemo, useState, useEffect } from "react";
import { Search, Filter, Download, Plus, X, MapPin, Clock, User, Building2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge, SlaBadge, PrioridadeBadge } from "@/components/StatusBadge";
import {
  ordens as ordensMock,
  provedores,
  tecnicos,
  getProvedor,
  getTecnico,
  eventosFor,
  tipoServicoLabel,
  statusLabel,
} from "@/data/mock";
import type { OrdemServico, StatusOS, SlaStatus } from "@/types/domain";
import { cn } from "@/lib/utils";

const statusOptions: (StatusOS | "TODOS")[] = [
  "TODOS",
  "ABERTA",
  "EM_ANDAMENTO",
  "PAUSADA",
  "AGUARDANDO_CLIENTE",
  "CONCLUIDA",
  "CANCELADA",
];

const slaOptions: (SlaStatus | "TODOS")[] = ["TODOS", "OK", "RISCO", "ESTOURADO"];

export default function Ordens() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [slaFilter, setSlaFilter] = useState<string>("TODOS");
  const [provFilter, setProvFilter] = useState<string>("TODOS");
  const [openId, setOpenId] = useState<string | null>(params.get("os"));

  useEffect(() => {
    if (openId) setParams({ os: openId }, { replace: true });
    else if (params.has("os")) {
      params.delete("os");
      setParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  const filtered = useMemo(() => {
    return ordensMock.filter((o) => {
      if (statusFilter !== "TODOS" && o.status !== statusFilter) return false;
      if (slaFilter !== "TODOS" && o.sla !== slaFilter) return false;
      if (provFilter !== "TODOS" && o.provedorId !== provFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const prov = getProvedor(o.provedorId)?.nome.toLowerCase() ?? "";
        const tec = getTecnico(o.tecnicoId)?.nome.toLowerCase() ?? "";
        if (
          !o.numero.toLowerCase().includes(q) &&
          !o.titulo.toLowerCase().includes(q) &&
          !prov.includes(q) &&
          !tec.includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, statusFilter, slaFilter, provFilter]);

  const selected = openId ? ordensMock.find((o) => o.id === openId) ?? null : null;

  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ordens de serviço</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} de {ordensMock.length} ordens executadas pela Ajust Consulting.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            Nova ordem
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="p-3 shadow-elev-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por número, título, provedor, técnico…"
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "TODOS" ? "Todos os status" : statusLabel[s as StatusOS]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={slaFilter} onValueChange={setSlaFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="SLA" />
            </SelectTrigger>
            <SelectContent>
              {slaOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "TODOS" ? "Todos SLAs" : s === "OK" ? "SLA OK" : s === "RISCO" ? "Em risco" : "Estourado"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={provFilter} onValueChange={setProvFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Provedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos provedores</SelectItem>
              {provedores.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(statusFilter !== "TODOS" || slaFilter !== "TODOS" || provFilter !== "TODOS" || search) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setStatusFilter("TODOS");
                setSlaFilter("TODOS");
                setProvFilter("TODOS");
              }}
            >
              <X className="size-4" />
              Limpar
            </Button>
          )}
        </div>
      </Card>

      {/* Tabela desktop */}
      <Card className="hidden md:block overflow-hidden shadow-elev-sm">
        <div className="max-h-[calc(100vh-22rem)] overflow-auto scrollbar-thin">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-32">Número</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Provedor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead className="text-right">Prazo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => {
                const prov = getProvedor(o.provedorId);
                const tec = getTecnico(o.tecnicoId);
                return (
                  <TableRow
                    key={o.id}
                    onClick={() => setOpenId(o.id)}
                    className={cn(
                      "cursor-pointer",
                      openId === o.id && "bg-accent/40",
                    )}
                  >
                    <TableCell className="font-mono text-xs">{o.numero}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PrioridadeBadge prioridade={o.prioridade} />
                        <span className="font-medium">{o.titulo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{prov?.nome}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tipoServicoLabel[o.tipo]}
                    </TableCell>
                    <TableCell className="text-sm">
                      {tec ? (
                        <div className="flex items-center gap-2">
                          <span className="flex size-6 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                            {tec.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                          <span>{tec.nome}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">— não atribuída</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell>
                      <SlaBadge sla={o.sla} pct={o.slaConsumidoPct} compact />
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums text-muted-foreground">
                      {format(new Date(o.prazoFim), "dd/MM HH:mm")}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                    Nenhuma ordem encontrada com os filtros atuais.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Cards mobile */}
      <div className="space-y-2 md:hidden">
        {filtered.map((o) => {
          const prov = getProvedor(o.provedorId);
          const tec = getTecnico(o.tecnicoId);
          return (
            <Card key={o.id} onClick={() => setOpenId(o.id)} className="cursor-pointer p-3 shadow-elev-sm">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">{o.numero}</span>
                <SlaBadge sla={o.sla} pct={o.slaConsumidoPct} compact />
              </div>
              <div className="mt-1 flex items-start gap-2">
                <PrioridadeBadge prioridade={o.prioridade} />
                <p className="text-sm font-medium">{o.titulo}</p>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Building2 className="size-3" />{prov?.nome}</span>
                <span className="inline-flex items-center gap-1"><User className="size-3" />{tec?.nome ?? "—"}</span>
              </div>
              <div className="mt-2">
                <StatusBadge status={o.status} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Drawer */}
      <Sheet open={!!selected} onOpenChange={(v) => !v && setOpenId(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl scrollbar-thin">
          {selected && <OrdemDetail os={selected} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function OrdemDetail({ os }: { os: OrdemServico }) {
  const prov = getProvedor(os.provedorId);
  const tec = getTecnico(os.tecnicoId);
  const eventos = eventosFor(os.id);

  return (
    <div className="space-y-5">
      <SheetHeader className="space-y-3 text-left">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{os.numero}</span>
          <PrioridadeBadge prioridade={os.prioridade} />
        </div>
        <SheetTitle className="text-xl leading-tight text-balance">{os.titulo}</SheetTitle>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={os.status} />
          <SlaBadge sla={os.sla} pct={os.slaConsumidoPct} />
        </div>
      </SheetHeader>

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-3 rounded-md border border-border bg-muted/30 p-3 text-xs">
        <Info icon={Building2} label="Provedor" value={prov?.nome ?? "—"} />
        <Info icon={User} label="Técnico" value={tec?.nome ?? "Não atribuída"} />
        <Info icon={MapPin} label="Localização" value={`${os.cidade} / ${os.uf}`} />
        <Info icon={Clock} label="Prazo SLA" value={`${os.slaPrazoHoras}h`} />
      </div>

      {/* SLA bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Consumo de SLA</span>
          <span className="font-mono tabular-nums text-muted-foreground">
            {Math.min(os.slaConsumidoPct, 999)}% · vence {format(new Date(os.prazoFim), "dd/MM HH:mm")}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              os.sla === "OK" && "bg-sla-ok",
              os.sla === "RISCO" && "bg-sla-risco",
              os.sla === "ESTOURADO" && "bg-sla-estourado",
            )}
            style={{ width: `${Math.min(os.slaConsumidoPct, 100)}%` }}
          />
        </div>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="w-full">
          <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
          <TabsTrigger value="detalhes" className="flex-1">Detalhes</TabsTrigger>
          <TabsTrigger value="anexos" className="flex-1">Anexos</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-4 space-y-3">
          <div className="relative space-y-4 border-l border-border pl-5">
            {eventos.map((e) => (
              <div key={e.id} className="relative">
                <span className="absolute -left-[1.45rem] top-1 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{e.autor}</span>
                  <span className="text-muted-foreground">
                    {formatDistanceToNow(new Date(e.data), { addSuffix: true, locale: ptBR })}
                  </span>
                </div>
                <p className="mt-0.5 text-sm">{e.mensagem}</p>
                <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                  {e.tipo}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detalhes" className="mt-4 space-y-3 text-sm">
          <Field label="Tipo de serviço" value={tipoServicoLabel[os.tipo]} />
          <Separator />
          <Field label="Descrição" value={os.descricao} />
          <Separator />
          <Field label="Aberta em" value={format(new Date(os.criadaEm), "dd/MM/yyyy HH:mm")} />
          <Field label="Atualizada em" value={format(new Date(os.atualizadaEm), "dd/MM/yyyy HH:mm")} />
          <Field
            label="Tags"
            value={
              <div className="flex flex-wrap gap-1">
                {os.tags.map((t) => (
                  <span key={t} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
            }
          />
        </TabsContent>

        <TabsContent value="anexos" className="mt-4 text-sm text-muted-foreground">
          Nenhum anexo para esta ordem.
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-0 -mx-6 flex gap-2 border-t border-border bg-card/80 px-6 py-3 backdrop-blur">
        <Button variant="outline" className="flex-1">Atribuir técnico</Button>
        <Button className="flex-1">Atualizar status</Button>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="col-span-2">{value}</div>
    </div>
  );
}
