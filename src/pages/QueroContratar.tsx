import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Info } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import LocationButton from "@/components/LocationButton";

const QueroContratar = () => {
  const geoEmpresa = useGeolocation();
  const geoEntrega = useGeolocation();
  const [form, setForm] = useState({
    empresa: "",
    categoria: "",
    cnpj: "",
    responsavel: "",
    telefone: "",
    cidade: "",
    bairro: "",
    endereco: "",
    retirada: "",
    entrega: "",
    tipoPedido: "",
    tipoPagamento: "",
    valor: "",
    urgente: false,
    observacoes: "",
  });

  const update = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `🚀 *RotaRápida - Novo Cadastro/Pedido*\n\n` +
      `🏢 *Empresa:* ${form.empresa}\n` +
      `📂 *Categoria:* ${form.categoria}\n` +
      `📄 *CNPJ:* ${form.cnpj || "Não informado"}\n` +
      `👤 *Responsável:* ${form.responsavel}\n` +
      `📱 *Telefone:* ${form.telefone}\n` +
      `📍 *Cidade/Bairro:* ${form.cidade} - ${form.bairro}\n` +
      `🏠 *Endereço:* ${form.endereco}\n` +
      (geoEmpresa.location ? `🗺 *Local da empresa:* ${geoEmpresa.location.mapsUrl}\n` : "") +
      `\n📦 *Retirada:* ${form.retirada || "—"}\n` +
      `🎯 *Entrega:* ${form.entrega || "—"}\n` +
      (geoEntrega.location ? `🗺 *Local da entrega:* ${geoEntrega.location.mapsUrl}\n` : "") +
      `🍽 *Tipo de pedido:* ${form.tipoPedido || "—"}\n\n` +
      `💰 *Forma de pagamento:* ${form.tipoPagamento}\n` +
      `💵 *Valor oferecido:* R$ ${form.valor}\n` +
      `⚡ *Urgente:* ${form.urgente ? "Sim" : "Não"}\n\n` +
      `📝 *Observações:* ${form.observacoes || "Nenhuma"}`
    );
    window.open(`https://wa.me/5541999580271?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <div className="mb-10">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Quero <span className="text-gradient">Contratar</span>
          </h1>
          <p className="text-muted-foreground">
            Cadastre sua empresa e contrate motoboys sob demanda. Enviaremos seus dados via WhatsApp.
          </p>
        </div>

        <div className="glass rounded-2xl p-3 sm:p-4 mb-6 flex gap-2 sm:gap-3 items-start border border-primary/30">
          <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">Cadastro de empresa: R$ 50/mês.</span>{" "}
            Inclui acesso à nossa rede de motoboys, indicação ilimitada e suporte via WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Empresa */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Dados da Empresa</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da empresa</Label>
                <Input required placeholder="Ex: Pizzaria Bella" value={form.empresa} onChange={(e) => update("empresa", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select required onValueChange={(v) => update("categoria", v)}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Restaurante">🍽 Restaurante</SelectItem>
                    <SelectItem value="Pizzaria">🍕 Pizzaria</SelectItem>
                    <SelectItem value="Padaria">🥖 Padaria</SelectItem>
                    <SelectItem value="Farmácia">💊 Farmácia</SelectItem>
                    <SelectItem value="Lanchonete">🍔 Lanchonete</SelectItem>
                    <SelectItem value="Mercado">🛒 Mercado</SelectItem>
                    <SelectItem value="Outro">📦 Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>CNPJ (opcional)</Label>
                <Input placeholder="00.000.000/0000-00" value={form.cnpj} onChange={(e) => update("cnpj", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Responsável</Label>
                <Input required placeholder="Nome do contato" value={form.responsavel} onChange={(e) => update("responsavel", e.target.value)} className="bg-muted border-border" />
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
                <Label>Endereço completo</Label>
                <Input required placeholder="Rua, número, complemento" value={form.endereco} onChange={(e) => update("endereco", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Localização da empresa (opcional)</Label>
                <LocationButton {...geoEmpresa} onRequest={geoEmpresa.requestLocation} onReset={geoEmpresa.reset} label="Marcar local atual da empresa" />
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Forma de Contratação</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de pagamento</Label>
                <Select required onValueChange={(v) => update("tipoPagamento", v)}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diária">📅 Valor da diária</SelectItem>
                    <SelectItem value="Hora">⏱ Valor por hora</SelectItem>
                    <SelectItem value="Corrida">🛵 Valor por corrida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor oferecido (R$)</Label>
                <Input required type="number" min="0" step="0.01" placeholder="Ex: 120.00" value={form.valor} onChange={(e) => update("valor", e.target.value)} className="bg-muted border-border" />
              </div>
            </div>
          </div>

          {/* Entrega (opcional) */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Detalhes da Entrega <span className="text-xs text-muted-foreground font-normal">(opcional)</span></h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Endereço de retirada</Label>
                <Input placeholder="Rua, número, bairro" value={form.retirada} onChange={(e) => update("retirada", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Endereço de entrega</Label>
                <Input placeholder="Rua, número, bairro" value={form.entrega} onChange={(e) => update("entrega", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Localização da entrega (opcional)</Label>
                <LocationButton {...geoEntrega} onRequest={geoEntrega.requestLocation} onReset={geoEntrega.reset} label="Marcar local atual da entrega" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de pedido</Label>
                <Select onValueChange={(v) => update("tipoPedido", v)}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lanche">🍔 Lanche</SelectItem>
                    <SelectItem value="Pizza">🍕 Pizza</SelectItem>
                    <SelectItem value="Marmita">🍱 Marmita</SelectItem>
                    <SelectItem value="Medicamento">💊 Medicamento</SelectItem>
                    <SelectItem value="Documento">📄 Documento</SelectItem>
                    <SelectItem value="Outro">📦 Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Urgente?</Label>
                <Switch checked={form.urgente} onCheckedChange={(v) => update("urgente", v)} />
              </div>
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea placeholder="Informações adicionais..." value={form.observacoes} onChange={(e) => update("observacoes", e.target.value)} className="bg-muted border-border min-h-[80px]" />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full glow-red text-base py-6 rounded-xl font-semibold">
            Enviar Cadastro / Chamar Motoboy
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QueroContratar;
