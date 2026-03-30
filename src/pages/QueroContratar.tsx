import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";

const QueroContratar = () => {
  const [form, setForm] = useState({
    restaurante: "",
    telefone: "",
    cidade: "",
    bairro: "",
    retirada: "",
    entrega: "",
    tipo: "",
    urgente: false,
    observacoes: "",
  });

  const update = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `RotaRápida - Novo Pedido\nRestaurante: ${form.restaurante}\nTelefone: ${form.telefone}\nRetirada: ${form.retirada}\nEntrega: ${form.entrega}\nTipo: ${form.tipo}\nUrgente: ${form.urgente ? "Sim" : "Não"}\nObservações: ${form.observacoes || "Nenhuma"}`
    );
    window.open(`https://wa.me/5511985911503?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <div className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Quero <span className="text-gradient">Contratar</span>
          </h1>
          <p className="text-muted-foreground">Preencha os dados abaixo e enviaremos seu pedido por WhatsApp.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Restaurante */}
          <div className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Dados do Restaurante</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do restaurante</Label>
                <Input required placeholder="Ex: Pizzaria Bella" value={form.restaurante} onChange={(e) => update("restaurante", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Telefone (WhatsApp)</Label>
                <Input required placeholder="(11) 99999-9999" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input required placeholder="São Paulo" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input required placeholder="Centro" value={form.bairro} onChange={(e) => update("bairro", e.target.value)} className="bg-muted border-border" />
              </div>
            </div>
          </div>

          {/* Entrega */}
          <div className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Detalhes da Entrega</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Endereço de retirada</Label>
                <Input required placeholder="Rua, número, bairro" value={form.retirada} onChange={(e) => update("retirada", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Endereço de entrega</Label>
                <Input required placeholder="Rua, número, bairro" value={form.entrega} onChange={(e) => update("entrega", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de pedido</Label>
                <Select required onValueChange={(v) => update("tipo", v)}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lanche">🍔 Lanche</SelectItem>
                    <SelectItem value="Pizza">🍕 Pizza</SelectItem>
                    <SelectItem value="Marmita">🍱 Marmita</SelectItem>
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
            Chamar Motoboy
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QueroContratar;
