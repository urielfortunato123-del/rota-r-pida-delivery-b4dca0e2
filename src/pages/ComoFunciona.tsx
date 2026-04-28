import { Link } from "react-router-dom";
import {
  ClipboardList,
  Send,
  MapPin,
  CheckCircle,
  Building2,
  Bike,
  Search,
  Bell,
  Wallet,
  ShieldCheck,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const handleCtaClick = (label: "contratar" | "motoboy", origin: string) => {
  trackEvent("cta_click", {
    label: `${label}:${origin}`,
    page: "/como-funciona",
  });
};

const empresaSteps = [
  {
    icon: ClipboardList,
    title: "Faça seu cadastro",
    desc: "Preencha os dados do estabelecimento em menos de 2 minutos.",
  },
  {
    icon: Send,
    title: "Solicite um motoboy",
    desc: "Pedido enviado direto ao admin via WhatsApp.",
  },
  {
    icon: MapPin,
    title: "Indicação automática",
    desc: "O motoboy mais próximo é acionado na hora.",
  },
  {
    icon: CheckCircle,
    title: "Entrega concluída",
    desc: "Rápida, segura e sem marketplace.",
  },
];

const motoboySteps = [
  {
    icon: Bike,
    title: "Cadastre-se grátis",
    desc: "Informe sua zona de atuação e disponibilidade.",
  },
  {
    icon: Bell,
    title: "Receba chamados",
    desc: "Avisamos no WhatsApp quando houver corrida na sua região.",
  },
  {
    icon: Search,
    title: "Aceite e entregue",
    desc: "Confirme a corrida e siga até o restaurante.",
  },
  {
    icon: Wallet,
    title: "Receba R$ 25/dia",
    desc: "Pagamento por dia trabalhado, sem taxas escondidas.",
  },
];

const planos = [
  {
    icon: Building2,
    title: "Empresas",
    price: "R$ 50",
    period: "/mês",
    desc: "Acesso ilimitado à rede de motoboys da sua região.",
  },
  {
    icon: Bike,
    title: "Motoboys",
    price: "R$ 25",
    period: "/dia",
    desc: "Receba por dia trabalhado em indicações aceitas.",
  },
];

const diferenciais = [
  {
    icon: ShieldCheck,
    title: "Não é marketplace",
    desc: "Só logística, sem intermediar pedidos.",
  },
  {
    icon: Clock,
    title: "Sob demanda",
    desc: "Use quando precisar. Sem fidelidade.",
  },
  {
    icon: Zap,
    title: "Resposta rápida",
    desc: "Motoboys disponíveis em tempo real.",
  },
];

const ComoFunciona = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 overflow-x-hidden">
      <div className="container max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs text-muted-foreground mb-4">
            <Zap size={14} className="text-primary" />
            Processo simples e direto
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-3 break-words">
            Como <span className="text-gradient">Funciona</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto break-words">
            Conectamos restaurantes a motoboys em tempo real, sem complicação.
          </p>
        </div>

        {/* Para Empresas */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 size={18} className="text-primary" />
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold min-w-0 break-words">
              Para Restaurantes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {empresaSteps.map((step, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-4 sm:p-5 relative animate-fade-in min-w-0"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="absolute top-3 right-3 text-xs font-bold text-primary/60 font-heading">
                  0{i + 1}
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 flex-shrink-0">
                  <step.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-sm sm:text-base font-semibold mb-1 break-words pr-6">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm break-words">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Button asChild size="sm" className="rounded-xl">
              <Link to="/contratar">
                Quero contratar
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Para Motoboys */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bike size={18} className="text-primary" />
            </div>
            <h2 className="font-heading text-lg sm:text-xl font-bold min-w-0 break-words">
              Para Motoboys
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {motoboySteps.map((step, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-4 sm:p-5 relative animate-fade-in min-w-0"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="absolute top-3 right-3 text-xs font-bold text-primary/60 font-heading">
                  0{i + 1}
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 flex-shrink-0">
                  <step.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-sm sm:text-base font-semibold mb-1 break-words pr-6">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm break-words">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Button asChild size="sm" variant="outline" className="rounded-xl">
              <Link to="/motoboy">
                Sou motoboy
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-12">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-center mb-5">
            💰 Valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {planos.map((p, i) => (
              <div key={i} className="glass rounded-2xl p-5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 flex-shrink-0">
                  <p.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold mb-2 break-words">
                  {p.title}
                </h3>
                <div className="flex items-baseline gap-1 mb-2 flex-wrap">
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                    {p.price}
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    {p.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Diferenciais */}
        <section>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-center mb-5">
            🔥 Por que RotaRápida?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {diferenciais.map((d, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-4 sm:p-5 text-center min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 flex-shrink-0">
                  <d.icon size={20} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1 break-words">
                  {d.title}
                </p>
                <p className="text-xs text-muted-foreground break-words">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer to avoid floating bar overlapping content on mobile */}
        <div className="h-24 sm:h-0" aria-hidden="true" />
      </div>

      {/* Floating CTA bar (mobile only) */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-background via-background/95 to-background/0 pointer-events-none"
      >
        <div className="pointer-events-auto glass rounded-2xl p-2 flex gap-2 shadow-2xl border border-border/60">
          <Button
            asChild
            size="sm"
            className="flex-1 rounded-xl glow-red font-semibold text-xs h-11"
          >
            <Link to="/contratar">🔴 Quero contratar</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 rounded-xl font-semibold text-xs h-11"
          >
            <Link to="/motoboy">⚫ Sou motoboy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;
