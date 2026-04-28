import { Share2, Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SHARE_TITLE = "RotaRápida — Motoboy sob demanda";
const SHARE_TEXT =
  "🛵 RotaRápida: motoboys sob demanda para restaurantes, farmácias, pizzarias e padarias. Rápido, simples e sem contrato. Conheça:";

const getShareUrl = () => {
  if (typeof window === "undefined") return "";
  // Always share the canonical home URL, regardless of current route
  const { protocol, host } = window.location;
  return `${protocol}//${host}/`;
};

const ShareButton = () => {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const resetSoon = () => {
    window.setTimeout(() => setStatus("idle"), 2000);
  };

  const copyToClipboard = async (text: string) => {
    // Modern API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Legacy fallback (older browsers / non-HTTPS)
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

  const handleShare = async () => {
    const url = getShareUrl();
    const shareData: ShareData = {
      title: SHARE_TITLE,
      text: SHARE_TEXT,
      url,
    };

    // Native share (mostly mobile)
    const canNativeShare =
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      (!navigator.canShare || navigator.canShare(shareData));

    if (canNativeShare) {
      try {
        await navigator.share(shareData);
        setStatus("shared");
        toast.success("Compartilhado!", {
          description: "Obrigado por divulgar o RotaRápida.",
        });
        resetSoon();
        return;
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return; // user cancelled
        // fall through to clipboard
      }
    }

    // Desktop / fallback: copy a friendly message + URL
    const clipboardPayload = `${SHARE_TEXT} ${url}`;
    try {
      await copyToClipboard(clipboardPayload);
      setStatus("copied");
      toast.success("Link copiado!", {
        description: url,
        icon: <Copy size={16} />,
      });
      resetSoon();
    } catch {
      toast.error("Não foi possível copiar", {
        description: `Copie manualmente: ${url}`,
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
