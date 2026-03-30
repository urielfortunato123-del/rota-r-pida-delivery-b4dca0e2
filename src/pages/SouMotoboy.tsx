import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";

const disponibilidades = ["Manhã", "Tarde", "Noite", "Fim de semana"];

const SouMotoboy = () => {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    bairro: "",
    bag: false,
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
      `Novo Motoboy RotaRápida\nNome: ${form.nome}\nTelefone: ${form.telefone}\nCidade: ${form.cidade}\nBairro: ${form.bairro}\nPossui bag: ${form.bag ? "Sim" : "Não"}\nDisponibilidade: ${form.disponibilidade.join(", ") || "Não informada"}`
    );
    window.open(`https://wa.me/5511985911503?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <div className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Sou <span className="text-gradient">Motoboy</span>
          </h1>
          <p className="text-muted-foreground">Cadastre-se e comece a fazer entregas sob demanda.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Seus Dados</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input required placeholder="João Silva" value={form.nome} onChange={(e) => update("nome", e.target.value)} className="bg-muted border-border" />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
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

          <div className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Informações</h2>
            <div className="flex items-center justify-between">
              <Label>Possui bag térmica?</Label>
              <Switch checked={form.bag} onCheckedChange={(v) => update("bag", v)} />
            </div>
            <div className="space-y-3">
              <Label>Disponibilidade</Label>
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
