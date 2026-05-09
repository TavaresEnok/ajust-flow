import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Ordens from "./pages/Ordens";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="ordens" element={<Ordens />} />
            <Route
              path="sla"
              element={<Placeholder title="Monitoramento SLA" description="Heatmap em tempo real, alertas e regras de escalonamento." />}
            />
            <Route
              path="calendario"
              element={<Placeholder title="Calendário operacional" description="Agenda de ordens por técnico, provedor e tipo de serviço." />}
            />
            <Route
              path="tecnicos"
              element={<Placeholder title="Técnicos" description="Equipe interna da Ajust: status, capacidade, especialidades e alocação." />}
            />
            <Route
              path="saude"
              element={<Placeholder title="Saúde da equipe" description="Carga, burnout, horas extras e indicadores de bem-estar." />}
            />
            <Route
              path="provedores"
              element={<Placeholder title="Provedores" description="ISPs clientes da Ajust Consulting — contratos, SLAs e contatos." />}
            />
            <Route
              path="tipos-servico"
              element={<Placeholder title="Tipos de serviço" description="Catálogo com escopo, checklists e SLAs padrão por tipo." />}
            />
            <Route
              path="workflow"
              element={<Placeholder title="Workflow builder" description="Editor visual de fluxos de aprovação e execução por tipo de serviço." />}
            />
            <Route
              path="sla-policy"
              element={<Placeholder title="Política de SLA" description="Definição de prazos, escalonamentos e janelas de manutenção." />}
            />
            <Route
              path="cofre"
              element={<Placeholder title="Cofre Neo" description="Cofre seguro de credenciais e segredos por provedor." />}
            />
            <Route
              path="config"
              element={<Placeholder title="Configurações" description="Preferências da organização, integrações e auditoria." />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
