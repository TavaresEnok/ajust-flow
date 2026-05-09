import {
  LayoutDashboard,
  ClipboardList,
  Activity,
  Users,
  Building2,
  CalendarDays,
  Workflow,
  ShieldCheck,
  Wrench,
  KeyRound,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const operacao = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard, end: true },
  { title: "Ordens de serviço", url: "/app/ordens", icon: ClipboardList },
  { title: "Monitoramento SLA", url: "/app/sla", icon: Activity },
  { title: "Calendário", url: "/app/calendario", icon: CalendarDays },
];

const equipe = [
  { title: "Técnicos", url: "/app/tecnicos", icon: Users },
  { title: "Saúde da equipe", url: "/app/saude", icon: ShieldCheck },
];

const cadastros = [
  { title: "Provedores", url: "/app/provedores", icon: Building2 },
  { title: "Tipos de serviço", url: "/app/tipos-servico", icon: Wrench },
  { title: "Workflow builder", url: "/app/workflow", icon: Workflow },
  { title: "Política de SLA", url: "/app/sla-policy", icon: ShieldCheck },
];

const seguranca = [
  { title: "Cofre Neo", url: "/app/cofre", icon: KeyRound },
  { title: "Configurações", url: "/app/config", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  const renderItem = (item: { title: string; url: string; icon: any; end?: boolean }) => (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton
        asChild
        isActive={item.end ? pathname === item.url : pathname.startsWith(item.url)}
        tooltip={item.title}
        className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      >
        <NavLink to={item.url} end={item.end}>
          <item.icon className="size-4 shrink-0" />
          <span>{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className={cn("flex items-center gap-2.5 px-2 py-1.5", collapsed && "justify-center px-0")}>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-brand shadow-elev-md">
            <span className="font-mono text-sm font-bold text-primary-foreground">A</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-sidebar-accent-foreground">Ajust ERP</span>
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
                Ajust Consulting
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Operação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{operacao.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Equipe</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{equipe.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Cadastros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{cadastros.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{seguranca.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className={cn("flex items-center gap-2 px-2 py-1.5", collapsed && "justify-center px-0")}>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
            CS
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium text-sidebar-accent-foreground">Camila Souza</span>
              <span className="text-[10px] text-sidebar-foreground/60">Coordenadora • NOC</span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
