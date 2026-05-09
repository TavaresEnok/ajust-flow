import { Bell, Search, HelpCircle, Command as CommandIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/app": "Dashboard",
  "/app/ordens": "Ordens de serviço",
  "/app/sla": "Monitoramento SLA",
  "/app/calendario": "Calendário operacional",
  "/app/tecnicos": "Técnicos",
  "/app/saude": "Saúde da equipe",
  "/app/provedores": "Provedores",
  "/app/tipos-servico": "Tipos de serviço",
  "/app/workflow": "Workflow builder",
  "/app/sla-policy": "Política de SLA",
  "/app/cofre": "Cofre Neo",
  "/app/config": "Configurações",
};

export function AppHeader() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? Object.entries(titles).find(([k]) => pathname.startsWith(k))?.[1] ?? "Ajust ERP";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Ajust Consulting</span>
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="hidden md:flex h-9 w-72 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground transition hover:bg-muted">
          <Search className="size-4" />
          <span>Buscar OS, técnico, provedor…</span>
          <kbd className="ml-auto inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            <CommandIcon className="size-3" />K
          </kbd>
        </button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-sla-estourado" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="size-4" />
        </Button>
      </div>
    </header>
  );
}
