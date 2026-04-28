import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Info, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useGeolocation } from "@/hooks/use-geolocation";
import LocationButton from "@/components/LocationButton";
import {
  queroContratarSchema,
  formatZodErrors,
  type QueroContratarData,
} from "@/lib/form-schemas";

type Errors = Partial<Record<keyof QueroContratarData, string>>;

const QueroContratar = () => {
  const geoEmpresa = useGeolocation();
  const geoEntrega = useGeolocation();
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
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

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Limpa erro do campo ao começar a corrigir
    if (errors[key as keyof QueroContratarData]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = queroContratarSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = formatZodErrors<keyof QueroContratarData>(result.error);
      setErrors(fieldErrors);
      const firstError = Object.values(fieldErrors)[0];
      toast.error("Confira os campos do formulário", {
        description: firstError ?? "Existem campos inválidos ou obrigatórios.",
      });
      // Foca o primeiro campo com erro
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) {
        const el = document.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      }
      setSubmitting(false);
      return;
    }

    const data = result.data;
    setErrors({});

    const msg = encodeURIComponent(
      `🚀 *RotaRápida - Novo Cadastro/Pedido*\n\n` +
      `🏢 *Empresa:* ${data.empresa}\n` +
      `📂 *Categoria:* ${data.categoria}\n` +
      `📄 *CNPJ:* ${data.cnpj || "Não informado"}\n` +
      `👤 *Responsável:* ${data.responsavel}\n` +
      `📱 *Telefone:* ${data.telefone}\n` +
      `📍 *Cidade/Bairro:* ${data.cidade} - ${data.bairro}\n` +
      `🏠 *Endereço:* ${data.endereco}\n` +
      (geoEmpresa.location ? `🗺 *Local da empresa:* ${geoEmpresa.location.mapsUrl}\n` : "") +
      `\n📦 *Retirada:* ${data.retirada || "—"}\n` +
      `🎯 *Entrega:* ${data.entrega || "—"}\n` +
      (geoEntrega.location ? `🗺 *Local da entrega:* ${geoEntrega.location.mapsUrl}\n` : "") +
      `🍽 *Tipo de pedido:* ${data.tipoPedido || "—"}\n\n` +
      `💰 *Forma de pagamento:* ${data.tipoPagamento}\n` +
      `💵 *Valor oferecido:* R$ ${data.valor}\n` +
      `⚡ *Urgente:* ${data.urgente ? "Sim" : "Não"}\n\n` +
      `📝 *Observações:* ${data.observacoes || "Nenhuma"}`
    );
    window.open(`https://wa.me/5541999580271?text=${msg}`, "_blank", "noopener,noreferrer");
    toast.success("Pedido enviado!", { description: "Continue no WhatsApp para finalizar." });
    setSubmitting(false);
  };

  const FieldError = ({ name }: { name: keyof QueroContratarData }) =>
    errors[name] ? (
      <p className="flex items-start gap-1 text-xs text-destructive mt-1 break-words" role="alert">
        <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
        <span>{errors[name]}</span>
      </p>
    ) : null;

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
          <p className="text-sm text-muted-foreground break-words min-w-0">
            <span className="text-foreground font-semibold">Cadastro de empresa: R$ 50/mês.</span>{" "}
            Inclui acesso à nossa rede de motoboys, indicação ilimitada e suporte via WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8 form-compact">
          {/* Empresa */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Dados da Empresa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="empresa">Nome da empresa *</Label>
                <Input id="empresa" data-field="empresa" maxLength={120} aria-invalid={!!errors.empresa} placeholder="Ex: Pizzaria Bella" value={form.empresa} onChange={(e) => update("empresa", e.target.value)} className="bg-muted border-border" />
                <FieldError name="empresa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria *</Label>
                <Select value={form.categoria} onValueChange={(v) => update("categoria", v)}>
                  <SelectTrigger id="categoria" data-field="categoria" aria-invalid={!!errors.categoria} className="bg-muted border-border">
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
                <FieldError name="categoria" />
              </div>
              <div className="space-y-2 compact-hide">
                <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                <Input id="cnpj" data-field="cnpj" maxLength={20} aria-invalid={!!errors.cnpj} placeholder="00.000.000/0000-00" value={form.cnpj} onChange={(e) => update("cnpj", e.target.value)} className="bg-muted border-border" />
                <FieldError name="cnpj" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável *</Label>
                <Input id="responsavel" data-field="responsavel" maxLength={100} aria-invalid={!!errors.responsavel} placeholder="Nome do contato" value={form.responsavel} onChange={(e) => update("responsavel", e.target.value)} className="bg-muted border-border" />
                <FieldError name="responsavel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone (WhatsApp) *</Label>
                <Input id="telefone" data-field="telefone" type="tel" inputMode="tel" maxLength={20} aria-invalid={!!errors.telefone} placeholder="(41) 99999-9999" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} className="bg-muted border-border" />
                <FieldError name="telefone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input id="cidade" data-field="cidade" maxLength={80} aria-invalid={!!errors.cidade} placeholder="Curitiba" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} className="bg-muted border-border" />
                <FieldError name="cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input id="bairro" data-field="bairro" maxLength={80} aria-invalid={!!errors.bairro} placeholder="Centro" value={form.bairro} onChange={(e) => update("bairro", e.target.value)} className="bg-muted border-border" />
                <FieldError name="bairro" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="endereco">Endereço completo *</Label>
                <Input id="endereco" data-field="endereco" maxLength={200} aria-invalid={!!errors.endereco} placeholder="Rua, número, complemento" value={form.endereco} onChange={(e) => update("endereco", e.target.value)} className="bg-muted border-border" />
                <FieldError name="endereco" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Localização da empresa (opcional)</Label>
                <LocationButton {...geoEmpresa} onRequest={geoEmpresa.requestLocation} onReset={geoEmpresa.reset} label="Marcar local atual da empresa" />
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Forma de Contratação</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoPagamento">Tipo de pagamento *</Label>
                <Select value={form.tipoPagamento} onValueChange={(v) => update("tipoPagamento", v)}>
                  <SelectTrigger id="tipoPagamento" data-field="tipoPagamento" aria-invalid={!!errors.tipoPagamento} className="bg-muted border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diária">📅 Valor da diária</SelectItem>
                    <SelectItem value="Hora">⏱ Valor por hora</SelectItem>
                    <SelectItem value="Corrida">🛵 Valor por corrida</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError name="tipoPagamento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor oferecido (R$) *</Label>
                <Input id="valor" data-field="valor" type="number" inputMode="decimal" min="0" max="100000" step="0.01" aria-invalid={!!errors.valor} placeholder="Ex: 120.00" value={form.valor} onChange={(e) => update("valor", e.target.value)} className="bg-muted border-border" />
                <FieldError name="valor" />
              </div>
            </div>
          </div>

          {/* Entrega (opcional) */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Detalhes da Entrega <span className="text-xs text-muted-foreground font-normal">(opcional)</span></h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retirada">Endereço de retirada</Label>
                <Input id="retirada" data-field="retirada" maxLength={200} placeholder="Rua, número, bairro" value={form.retirada} onChange={(e) => update("retirada", e.target.value)} className="bg-muted border-border" />
                <FieldError name="retirada" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entrega">Endereço de entrega</Label>
                <Input id="entrega" data-field="entrega" maxLength={200} placeholder="Rua, número, bairro" value={form.entrega} onChange={(e) => update("entrega", e.target.value)} className="bg-muted border-border" />
                <FieldError name="entrega" />
              </div>
              <div className="space-y-2">
                <Label>Localização da entrega (opcional)</Label>
                <LocationButton {...geoEntrega} onRequest={geoEntrega.requestLocation} onReset={geoEntrega.reset} label="Marcar local atual da entrega" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipoPedido">Tipo de pedido</Label>
                <Select value={form.tipoPedido} onValueChange={(v) => update("tipoPedido", v)}>
                  <SelectTrigger id="tipoPedido" className="bg-muted border-border">
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
                <Label htmlFor="urgente">Urgente?</Label>
                <Switch id="urgente" checked={form.urgente} onCheckedChange={(v) => update("urgente", v)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" data-field="observacoes" maxLength={1000} placeholder="Informações adicionais..." value={form.observacoes} onChange={(e) => update("observacoes", e.target.value)} className="bg-muted border-border min-h-[80px]" />
                <p className="text-[10px] text-muted-foreground text-right">{form.observacoes.length}/1000</p>
                <FieldError name="observacoes" />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={submitting} size="lg" className="w-full glow-red text-base py-6 rounded-xl font-semibold">
            {submitting ? "Enviando..." : "Enviar Cadastro / Chamar Motoboy"}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QueroContratar;
