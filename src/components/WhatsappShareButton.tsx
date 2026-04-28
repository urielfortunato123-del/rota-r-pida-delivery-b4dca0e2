import { MessageCircle } from "lucide-react";
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

const WhatsappShareButton = () => {
  const handleClick = () => {
    const message = buildInviteMessage();
    // wa.me funciona em mobile (abre o app) e desktop (abre WhatsApp Web)
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      aria-label="Compartilhar convite pelo WhatsApp"
      className="text-sm font-medium text-muted-foreground hover:text-[#25D366] rounded-xl"
    >
      <MessageCircle size={16} className="mr-2" />
      Enviar pelo WhatsApp
    </Button>
  );
};

export default WhatsappShareButton;
