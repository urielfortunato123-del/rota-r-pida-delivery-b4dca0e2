import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const buildInviteMessage = () => {
  const url =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}/`
      : "";

  return `🛵 *Conheça o RotaRápida!*

Motoboys sob demanda para restaurantes, farmácias, pizzarias e padarias.

✅ Rápido, simples e sem contrato
✅ Sem marketplace — só logística
✅ Disponível 24/7 na sua região
✅ Resposta em menos de 5 minutos

Acesse: ${url}`;
};

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  if (!ok) throw new Error("execCommand copy failed");
};

const InviteButton = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const message = buildInviteMessage();
    try {
      await copyToClipboard(message);
      setCopied(true);
      toast.success("Convite copiado!", {
        description: "Cole no WhatsApp, e-mail ou onde quiser.",
      });
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Não foi possível copiar", {
        description: "Tente novamente ou copie o link manualmente.",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      aria-live="polite"
      className="text-sm font-medium text-muted-foreground hover:text-primary rounded-xl"
    >
      {copied ? (
        <>
          <Check size={16} className="mr-2 text-primary" />
          Copiado!
        </>
      ) : (
        <>
          <Copy size={16} className="mr-2" />
          Copiar convite
        </>
      )}
    </Button>
  );
};

export default InviteButton;
