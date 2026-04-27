import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Info } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import LocationButton from "@/components/LocationButton";

const disponibilidades = ["Manhã", "Tarde", "Noite", "Madrugada", "Fim de semana", "Feriados"];

const SouMotoboy = () => {
  const geo = useGeolocation();
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    bairro: "",
    cnh: "",
    moto: "",
    placa: "",
    bag: false,
    raioKm: "",
    tipoPagamento: "",
    valorMinimo: "",
    horarioInicio: "",
    horarioFim: "",
    disponibilidade: [] as string[],
  });

  const update = (key: string, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleDisp = (item: string) => {
    const next = form.disponibilidade.includes(item)
      ? form.disponibilidade.filter((d) => d !== item)
      : [...form.disponibilidade, item];
    update("disponibilidade", next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `🛵 *RotaRápida - Novo Motoboy*\n\n` +
      `👤 *Nome:* ${form.nome}\n` +
      `📱 *Telefone:* ${form.telefone}\n` +
      `📍 *Cidade/Bairro:* ${form.cidade} - ${form.bairro}\n` +
      `🪪 *CNH:* ${form.cnh || "Não informada"}\n` +
      (geo.location ? `🗺 *Localização:* ${geo.location.mapsUrl}\n` : "") +
      `\n🏍 *Moto:* ${form.moto}\n` +
      `🔢 *Placa:* ${form.placa || "Não informada"}\n` +
      `🎒 *Bag térmica:* ${form.bag ? "Sim" : "Não"}\n` +
      `📏 *Raio de atuação:* ${form.raioKm ? `${form.raioKm} km` : "Não informado"}\n\n` +
      `💰 *Forma de cobrança:* ${form.tipoPagamento}\n` +
      `💵 *Valor mínimo:* R$ ${form.valorMinimo}\n\n` +
      `⏰ *Horário:* ${form.horarioInicio} às ${form.horarioFim}\n` +
      `📅 *Disponibilidade:* ${form.disponibilidade.join(", ") || "Não informada"}`
    );
    window.open(`https://wa.me/5541999580271?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <div className="mb-10">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Sou <span className="text-gradient">Motoboy</span>
          </h1>
          <p className="text-muted-foreground">
            Cadastre-se em nossa rede e receba indicações de entregas sob demanda.
          </p>
        </div>

        <div className="glass rounded-2xl p-3 sm:p-4 mb-6 flex gap-2 sm:gap-3 items-start border border-primary/30">
          <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">Ganhe R$ 25 por dia trabalhado por indicação.</span>{" "}
            Cadastro grátis. Você define seus horários, valores e zonas de atuação.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados pessoais */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Seus Dados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input required placeholder="João Silva" value={form.nome} onChange={(e) => update("nome", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Telefone (WhatsApp)</Label>
                <Input required placeholder="(41) 99999-9999" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input required placeholder="Curitiba" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input required placeholder="Centro" value={form.bairro} onChange={(e) => update("bairro", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>CNH (categoria A)</Label>
                <Input placeholder="Número da CNH" value={form.cnh} onChange={(e) => update("cnh", e.target.value)} className="bg-muted border-border" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Localização (opcional)</Label>
              <LocationButton {...geo} onRequest={geo.requestLocation} onReset={geo.reset} />
              <p className="text-xs text-muted-foreground">Ajuda o administrador a indicar você nas entregas mais próximas.</p>
            </div>
          </div>

          {/* Moto */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Sua Moto</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Modelo da moto</Label>
                <Input required placeholder="Ex: Honda CG 160" value={form.moto} onChange={(e) => update("moto", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Placa</Label>
                <Input placeholder="ABC-1D23" value={form.placa} onChange={(e) => update("placa", e.target.value)} className="bg-muted border-border" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border h-[42px]">
                <Label className="mb-0">Possui bag térmica?</Label>
                <Switch checked={form.bag} onCheckedChange={(v) => update("bag", v)} />
              </div>
              <div className="space-y-2">
                <Label>Raio de atuação (km)</Label>
                <Input type="number" min="1" max="100" placeholder="Ex: 10" value={form.raioKm} onChange={(e) => update("raioKm", e.target.value)} className="bg-muted border-border" />
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Valores que você aceita</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Forma de cobrança</Label>
                <Select required onValueChange={(v) => update("tipoPagamento", v)}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diária">📅 Diária</SelectItem>
                    <SelectItem value="Hora">⏱ Por hora</SelectItem>
                    <SelectItem value="Corrida">🛵 Por corrida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor mínimo (R$)</Label>
                <Input required type="number" min="0" step="0.01" placeholder="Ex: 120.00" value={form.valorMinimo} onChange={(e) => update("valorMinimo", e.target.value)} className="bg-muted border-border" />
              </div>
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Disponibilidade</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Início (ex: 08:00)</Label>
                <Input required type="time" value={form.horarioInicio} onChange={(e) => update("horarioInicio", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Fim (ex: 22:00)</Label>
                <Input required type="time" value={form.horarioFim} onChange={(e) => update("horarioFim", e.target.value)} className="bg-muted border-border" />
              </div>
            </div>
            <div className="space-y-3">
              <Label>Períodos disponíveis</Label>
              <div className="grid grid-cols-2 gap-3">
                {disponibilidades.map((d) => (
                  <label
                    key={d}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <Checkbox
                      checked={form.disponibilidade.includes(d)}
                      onCheckedChange={() => toggleDisp(d)}
                    />
                    <span className="text-sm">{d}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full glow-red text-base py-6 rounded-xl font-semibold">
            Quero Trabalhar
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SouMotoboy;
