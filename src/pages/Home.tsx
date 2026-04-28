import { Link } from "react-router-dom";
import { Bike, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import InviteButton from "@/components/InviteButton";
import WhatsappShareButton from "@/components/WhatsappShareButton";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="container relative z-10 text-center py-20 md:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8 animate-fade-in">
            <Bike size={16} className="text-primary" />
            Logística sob demanda para restaurantes
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Motoboy sob demanda para restaurantes.{" "}
            <span className="text-gradient">Rápido, simples e sem contrato.</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Conectamos restaurantes a motoboys disponíveis em tempo real. 
            Sem marketplace, sem complicação — apenas logística eficiente.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="glow-red text-base px-8 py-6 rounded-xl font-semibold">
              <Link to="/contratar">
                🔴 Quero Contratar
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl font-semibold border-border hover:bg-muted">
              <Link to="/motoboy">
                ⚫ Sou Motoboy
              </Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <InviteButton />
            <WhatsappShareButton />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            { value: "24/7", label: "Disponibilidade" },
            { value: "<5min", label: "Tempo de resposta" },
            { value: "100%", label: "Sem contrato" },
            { value: "🛵", label: "Sob demanda" },
          ].map((stat, i) => (
            <div key={i} className="p-8 text-center border-r last:border-r-0 border-border">
              <div className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-10">
        <div className="container px-4 max-w-3xl">
          <div className="flex flex-col items-center gap-5 text-center">
            {/* Brand + slogan */}
            <div className="space-y-1">
              <p className="font-heading text-base sm:text-lg font-bold">
                <span className="text-gradient">Rota</span>
                <span className="text-foreground">Rápida</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground break-words">
                Logística sob demanda para restaurantes.
              </p>
            </div>

            {/* Nav links */}
            <nav
              aria-label="Rodapé"
              className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap text-xs sm:text-sm"
            >
              <Link
                to="/privacidade"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidade
              </Link>
              <span aria-hidden="true" className="text-border">•</span>
              <Link
                to="/termos"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Termos de uso
              </Link>
              <span aria-hidden="true" className="text-border">•</span>
              <Link
                to="/como-funciona"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Como funciona
              </Link>
            </nav>

            {/* Divider */}
            <div className="w-12 h-px bg-border" aria-hidden="true" />

            {/* Copyright + credits */}
            <div className="flex flex-col gap-1 text-[11px] sm:text-xs text-muted-foreground">
              <p className="break-words">
                © {new Date().getFullYear()} RotaRápida. Todos os direitos reservados.
              </p>
              <p className="break-words">
                Desenvolvido por{" "}
                <span className="text-foreground font-medium">
                  Uriel da Fonseca Fortunato
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
