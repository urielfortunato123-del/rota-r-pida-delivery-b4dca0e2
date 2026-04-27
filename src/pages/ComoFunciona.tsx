import { ClipboardList, Send, MapPin, CheckCircle, Building2, Bike } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Cadastro da empresa", desc: "Farmácia, pizzaria, restaurante ou padaria preenche o cadastro completo." },
  { icon: Send, title: "Envio automático no WhatsApp", desc: "O cadastro é encaminhado direto ao administrador via WhatsApp." },
  { icon: MapPin, title: "Motoboy mais próximo é indicado", desc: "Consultamos nosso banco de motoboys e indicamos o ideal pela disponibilidade e zona." },
  { icon: CheckCircle, title: "Entrega realizada", desc: "Serviço executado com rapidez. Sem marketplace, sem complicação." },
];

const planos = [
  { icon: Building2, title: "Empresas", price: "R$ 50", period: "/mês", desc: "Cadastro mensal com acesso à rede de motoboys e indicações ilimitadas." },
  { icon: Bike, title: "Motoboys", price: "R$ 25", period: "/dia", desc: "Você recebe R$ 25 por dia trabalhado, por indicação aceita." },
];

const ComoFunciona = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Como <span className="text-gradient">Funciona</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Simples, direto e sem complicação. Veja como solicitar um motoboy em poucos passos.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 flex items-start gap-5 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <step.icon size={24} className="text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {i + 1}
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Planos / valores */}
        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-center mb-6">💰 Valores</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {planos.map((p, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{p.title}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-heading text-3xl font-bold text-primary">{p.price}</span>
                  <span className="text-muted-foreground text-sm">{p.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-8 mt-12 text-center">
          <h2 className="font-heading text-xl font-bold mb-3">🔥 Diferencial</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-1">Não é marketplace</p>
              <p>Não vendemos comida. Oferecemos logística.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Sob demanda</p>
              <p>Chame apenas quando precisar, sem mensalidade.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Rapidez total</p>
              <p>Motoboys disponíveis em tempo real na sua região.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;
