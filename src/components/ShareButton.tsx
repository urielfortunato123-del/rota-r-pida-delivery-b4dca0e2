import { Share2, Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ShareButton = () => {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const resetSoon = () => {
    window.setTimeout(() => setStatus("idle"), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "RotaRápida",
      text: "Motoboy sob demanda para restaurantes. Rápido, simples e sem contrato.",
      url: window.location.origin,
    };

    // Try native share first (mobile)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        setStatus("shared");
        toast.success("Compartilhado!", {
          description: "Obrigado por divulgar o RotaRápida.",
        });
        resetSoon();
        return;
      } catch (err) {
        // AbortError = user cancelled, stay silent
        if ((err as DOMException)?.name === "AbortError") return;
        // Other errors fall through to clipboard fallback
      }
    }

    // Clipboard fallback (desktop / unsupported browsers)
    try {
      await navigator.clipboard.writeText(shareData.url);
      setStatus("copied");
      toast.success("Link copiado!", {
        description: shareData.url,
        icon: <Copy size={16} />,
      });
      resetSoon();
    } catch {
      toast.error("Não foi possível copiar", {
        description: "Copie o link manualmente da barra de endereço.",
      });
    }
  };

  const isActive = status !== "idle";

  return (
    <button
      onClick={handleShare}
      aria-label="Compartilhar aplicativo"
      aria-live="polite"
      className={`inline-flex items-center justify-center h-9 w-9 rounded-full transition-all duration-300 ${
        isActive
          ? "bg-primary/15 text-primary scale-110"
          : "text-muted-foreground hover:text-primary hover:bg-muted active:scale-95"
      }`}
    >
      <span className="relative inline-flex items-center justify-center w-[18px] h-[18px]">
        <Share2
          size={18}
          className={`absolute transition-all duration-300 ${
            isActive ? "opacity-0 scale-50 rotate-45" : "opacity-100 scale-100 rotate-0"
          }`}
        />
        <Check
          size={18}
          className={`absolute transition-all duration-300 ${
            isActive ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"
          }`}
        />
      </span>
    </button>
  );
};

export default ShareButton;
