import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "RotaRápida",
      text: "Motoboy sob demanda para restaurantes. Rápido, simples e sem contrato.",
      url: window.location.origin,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        toast({
          title: "Link copiado!",
          description: "Compartilhe o RotaRápida com quem quiser.",
        });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // user cancelled share — silent
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Compartilhar aplicativo"
      className="inline-flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
    >
      {copied ? <Check size={18} /> : <Share2 size={18} />}
    </button>
  );
};

export default ShareButton;
