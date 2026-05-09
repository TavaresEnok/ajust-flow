import { Link } from "react-router-dom";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card className="flex flex-col items-center justify-center gap-3 p-12 text-center shadow-elev-sm">
        <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Construction className="size-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold">Em construção</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Esta área será entregue na próxima fase do roadmap. O design system, layout e fluxos críticos já estão
            prontos.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/app">Voltar ao Dashboard</Link>
        </Button>
      </Card>
    </div>
  );
}
