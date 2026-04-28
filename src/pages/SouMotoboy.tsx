import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Info, AlertCircle, Paperclip, X, Camera } from "lucide-react";
import { toast } from "sonner";
import { useGeolocation } from "@/hooks/use-geolocation";
import LocationButton from "@/components/LocationButton";
import { souMotoboySchema, formatZodErrors, type SouMotoboyData } from "@/lib/form-schemas";

const disponibilidades = ["Manhã", "Tarde", "Noite", "Madrugada", "Fim de semana", "Feriados"];

type Errors = Partial<Record<keyof SouMotoboyData, string>>;

type AnexoTipo = "cnh" | "moto";
type Anexo = { id: string; tipo: AnexoTipo; file: File; preview: string };

const MAX_ANEXOS = 6;
const MAX_FILE_MB = 8;

const SouMotoboy = () => {
  const geo = useGeolocation();
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [anexos, setAnexos] = useState<Anexo[]>([]);
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

  const update = (key: string, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof SouMotoboyData]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const toggleDisp = (item: string) => {
    const next = form.disponibilidade.includes(item)
      ? form.disponibilidade.filter((d) => d !== item)
      : [...form.disponibilidade, item];
    update("disponibilidade", next);
  };

  const handleFiles = (tipo: AnexoTipo, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const novos: Anexo[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        toast.error("Apenas imagens são aceitas");
        continue;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`Imagem muito grande (máx ${MAX_FILE_MB}MB)`);
        continue;
      }
      novos.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        tipo,
        file,
        preview: URL.createObjectURL(file),
      });
    }
    setAnexos((prev) => {
      const total = [...prev, ...novos].slice(0, MAX_ANEXOS);
      if (prev.length + novos.length > MAX_ANEXOS) {
        toast.warning(`Máximo de ${MAX_ANEXOS} fotos`);
      }
      return total;
    });
  };

  const removeAnexo = (id: string) => {
    setAnexos((prev) => {
      const found = prev.find((a) => a.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return prev.filter((a) => a.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = souMotoboySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = formatZodErrors<keyof SouMotoboyData>(result.error);
      setErrors(fieldErrors);
      const firstError = Object.values(fieldErrors)[0];
      toast.error("Confira os campos do formulário", {
        description: firstError ?? "Existem campos inválidos ou obrigatórios.",
      });
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

    const cnhCount = anexos.filter((a) => a.tipo === "cnh").length;
    const motoCount = anexos.filter((a) => a.tipo === "moto").length;

    const textoPlano =
      `🛵 *RotaRápida - Novo Motoboy*\n\n` +
      `👤 *Nome:* ${data.nome}\n` +
      `📱 *Telefone:* ${data.telefone}\n` +
      `📍 *Cidade/Bairro:* ${data.cidade} - ${data.bairro}\n` +
      `🪪 *CNH:* ${data.cnh || "Não informada"}\n` +
      (geo.location ? `🗺 *Localização:* ${geo.location.mapsUrl}\n` : "") +
      `\n🏍 *Moto:* ${data.moto}\n` +
      `🔢 *Placa:* ${data.placa || "Não informada"}\n` +
      `🎒 *Bag térmica:* ${data.bag ? "Sim" : "Não"}\n` +
      `📏 *Raio de atuação:* ${data.raioKm ? `${data.raioKm} km` : "Não informado"}\n\n` +
      `💰 *Forma de cobrança:* ${data.tipoPagamento}\n` +
      `💵 *Valor mínimo:* R$ ${data.valorMinimo}\n\n` +
      `⏰ *Horário:* ${data.horarioInicio} às ${data.horarioFim}\n` +
      `📅 *Disponibilidade:* ${data.disponibilidade.join(", ")}` +
      (anexos.length > 0
        ? `\n\n📎 *Anexos enviados:* ${cnhCount} foto(s) da CNH e ${motoCount} foto(s) da moto/documento`
        : "");

    // Tenta usar Web Share API (Android/iOS) para mandar texto + fotos juntos
    const arquivos = anexos.map((a) => a.file);
    const podeCompartilharArquivos =
      anexos.length > 0 &&
      typeof navigator !== "undefined" &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: arquivos });

    if (podeCompartilharArquivos) {
      try {
        await navigator.share({
          title: "RotaRápida - Cadastro de Motoboy",
          text: textoPlano,
          files: arquivos,
        });
        toast.success("Cadastro enviado!", {
          description: "Selecione o WhatsApp para finalizar o envio com as fotos.",
        });
        setSubmitting(false);
        return;
      } catch (err) {
        // Usuário cancelou ou erro - cai no fallback abaixo
        if ((err as Error)?.name !== "AbortError") {
          console.warn("Share API falhou:", err);
        } else {
          setSubmitting(false);
          return;
        }
      }
    }

    // Fallback: abre WhatsApp só com texto
    const msg = encodeURIComponent(textoPlano);
    window.open(`https://wa.me/5541999580271?text=${msg}`, "_blank", "noopener,noreferrer");

    if (anexos.length > 0) {
      toast.success("Texto enviado para o WhatsApp!", {
        description: "Anexe as fotos manualmente no chat usando o clipe 📎 do WhatsApp.",
      });
    } else {
      toast.success("Cadastro enviado!", {
        description: "Continue no WhatsApp para finalizar.",
      });
    }
    setSubmitting(false);
  };

  const FieldError = ({ name }: { name: keyof SouMotoboyData }) =>
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
            Sou <span className="text-gradient">Motoboy</span>
          </h1>
          <p className="text-muted-foreground">
            Cadastre-se em nossa rede e receba indicações de entregas sob demanda.
          </p>
        </div>

        <div className="glass rounded-2xl p-3 sm:p-4 mb-6 flex gap-2 sm:gap-3 items-start border border-primary/30">
          <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground break-words min-w-0">
            <span className="text-foreground font-semibold">Ganhe R$ 25 por dia trabalhado por indicação.</span>{" "}
            Cadastro grátis. Você define seus horários, valores e zonas de atuação.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8 form-compact">
          {/* Dados pessoais */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Seus Dados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo *</Label>
                <Input id="nome" data-field="nome" maxLength={120} aria-invalid={!!errors.nome} placeholder="João Silva" value={form.nome} onChange={(e) => update("nome", e.target.value)} className="bg-muted border-border" />
                <FieldError name="nome" />
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
              <div className="space-y-2 sm:col-span-2 compact-hide">
                <Label htmlFor="cnh">CNH (categoria A)</Label>
                <Input id="cnh" data-field="cnh" maxLength={20} aria-invalid={!!errors.cnh} placeholder="Número da CNH" value={form.cnh} onChange={(e) => update("cnh", e.target.value)} className="bg-muted border-border" />
                <FieldError name="cnh" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Localização (opcional)</Label>
              <LocationButton {...geo} onRequest={geo.requestLocation} onReset={geo.reset} />
              <p className="text-xs text-muted-foreground compact-hide">Ajuda o administrador a indicar você nas entregas mais próximas.</p>
            </div>
          </div>

          {/* Moto */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Sua Moto</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="moto">Modelo da moto *</Label>
                <Input id="moto" data-field="moto" maxLength={80} aria-invalid={!!errors.moto} placeholder="Ex: Honda CG 160" value={form.moto} onChange={(e) => update("moto", e.target.value)} className="bg-muted border-border" />
                <FieldError name="moto" />
              </div>
              <div className="space-y-2 compact-hide">
                <Label htmlFor="placa">Placa</Label>
                <Input id="placa" data-field="placa" maxLength={10} aria-invalid={!!errors.placa} placeholder="ABC-1D23" value={form.placa} onChange={(e) => update("placa", e.target.value.toUpperCase())} className="bg-muted border-border" />
                <FieldError name="placa" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border h-[42px]">
                <Label htmlFor="bag" className="mb-0">Possui bag térmica?</Label>
                <Switch id="bag" checked={form.bag} onCheckedChange={(v) => update("bag", v)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="raioKm">Raio de atuação (km)</Label>
                <Input id="raioKm" data-field="raioKm" type="number" inputMode="numeric" min="1" max="100" aria-invalid={!!errors.raioKm} placeholder="Ex: 10" value={form.raioKm} onChange={(e) => update("raioKm", e.target.value)} className="bg-muted border-border" />
                <FieldError name="raioKm" />
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Valores que você aceita</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoPagamento">Forma de cobrança *</Label>
                <Select value={form.tipoPagamento} onValueChange={(v) => update("tipoPagamento", v)}>
                  <SelectTrigger id="tipoPagamento" data-field="tipoPagamento" aria-invalid={!!errors.tipoPagamento} className="bg-muted border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diária">📅 Diária</SelectItem>
                    <SelectItem value="Hora">⏱ Por hora</SelectItem>
                    <SelectItem value="Corrida">🛵 Por corrida</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError name="tipoPagamento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valorMinimo">Valor mínimo (R$) *</Label>
                <Input id="valorMinimo" data-field="valorMinimo" type="number" inputMode="decimal" min="0" max="10000" step="0.01" aria-invalid={!!errors.valorMinimo} placeholder="Ex: 120.00" value={form.valorMinimo} onChange={(e) => update("valorMinimo", e.target.value)} className="bg-muted border-border" />
                <FieldError name="valorMinimo" />
              </div>
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="glass rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 scroll-card">
            <h2 className="font-heading text-base sm:text-lg font-semibold text-foreground">Disponibilidade</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horarioInicio">Início (ex: 08:00) *</Label>
                <Input id="horarioInicio" data-field="horarioInicio" type="time" aria-invalid={!!errors.horarioInicio} value={form.horarioInicio} onChange={(e) => update("horarioInicio", e.target.value)} className="bg-muted border-border" />
                <FieldError name="horarioInicio" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horarioFim">Fim (ex: 22:00) *</Label>
                <Input id="horarioFim" data-field="horarioFim" type="time" aria-invalid={!!errors.horarioFim} value={form.horarioFim} onChange={(e) => update("horarioFim", e.target.value)} className="bg-muted border-border" />
                <FieldError name="horarioFim" />
              </div>
            </div>
            <div className="space-y-3" data-field="disponibilidade">
              <Label>Períodos disponíveis *</Label>
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
              <FieldError name="disponibilidade" />
            </div>
          </div>

          <Button type="submit" disabled={submitting} size="lg" className="w-full glow-red text-base py-6 rounded-xl font-semibold">
            {submitting ? "Enviando..." : "Quero Trabalhar"}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SouMotoboy;
