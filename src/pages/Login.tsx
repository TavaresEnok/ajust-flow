import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/app"), 600);
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-between bg-background p-8 lg:p-12">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-md bg-gradient-brand shadow-elev-md">
            <span className="font-mono text-base font-bold text-primary-foreground">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Ajust ERP</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Ajust Consulting</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              Acesse o sistema operacional da Ajust
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Plataforma interna de gestão de ordens, técnicos e SLAs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail corporativo</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu.nome@ajust.com.br"
                defaultValue="camila@ajust.com.br"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="senha">Senha</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Esqueci minha senha
                </a>
              </div>
              <Input id="senha" type="password" required autoComplete="current-password" defaultValue="••••••••" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Checkbox id="lembrar" defaultChecked />
              <Label htmlFor="lembrar" className="text-sm font-normal text-muted-foreground">
                Manter sessão neste dispositivo
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Validando…" : "Entrar"}
              <ArrowRight className="size-4" />
            </Button>

            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-sla-ok" />
              Acesso restrito à equipe Ajust. Todas as ações são auditadas.
            </div>
          </form>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ajust Consulting · v2.4.0
        </p>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden bg-sidebar lg:block">
        <div className="absolute inset-0 bg-gradient-brand opacity-90" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, hsl(0 0% 100% / 0.3), transparent 40%), radial-gradient(circle at 80% 60%, hsl(271 81% 60% / 0.4), transparent 50%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div className="text-xs font-mono uppercase tracking-widest opacity-70">// operations.console</div>

          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "OS Ativas", v: "247" },
                { l: "Técnicos em campo", v: "18" },
                { l: "SLA OK", v: "94%" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-semibold tabular-nums">{s.v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider opacity-70">{s.l}</div>
                </div>
              ))}
            </div>

            <blockquote className="border-l-2 border-white/30 pl-4 text-base leading-relaxed text-balance">
              "Padronizamos a operação de 6 ISPs em um único centro de comando. SLA, técnicos e auditoria — tudo em
              tempo real."
              <footer className="mt-3 text-sm opacity-80">— Diretoria de Operações, Ajust Consulting</footer>
            </blockquote>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider opacity-70">
            <span>SOC 2</span>
            <span>LGPD</span>
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
}
