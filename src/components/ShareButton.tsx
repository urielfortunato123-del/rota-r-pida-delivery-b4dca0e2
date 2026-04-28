import { Share2, Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SHARE_TITLE = "RotaRápida — Motoboy sob demanda";
const SHARE_TEXT =
  "🛵 RotaRápida: motoboys sob demanda para restaurantes, farmácias, pizzarias e padarias. Rápido, simples e sem contrato. Conheça:";

const getShareUrl = () => {
  if (typeof window === "undefined") return "";
  const { protocol, host } = window.location;
  return `${protocol}//${host}/`;
};

const ShareButton = () => {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const resetSoon = () => {
    window.setTimeout(() => setStatus("idle"), 2000);
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

  const handleShare = async () => {
    const url = getShareUrl();
    const shareData: ShareData = {
      title: SHARE_TITLE,
      text: SHARE_TEXT,
      url,
    };

    const canNativeShare =
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      (!navigator.canShare || navigator.canShare(shareData));

    if (canNativeShare) {
      try {
        await navigator.share(shareData);
        setStatus("shared");
        toast.success("Compartilhado com sucesso", {
          description: "Obrigado por divulgar o RotaRápida.",
          // Screen-reader-friendly fallback text
          ariaProps: { role: "status", "aria-live": "polite" },
        } as Parameters<typeof toast.success>[1]);
        resetSoon();
        return;
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return;
      }
    }

    const clipboardPayload = `${SHARE_TEXT} ${url}`;
    try {
      await copyToClipboard(clipboardPayload);
      setStatus("copied");
      toast.success("Link copiado para a área de transferência", {
        description: url,
        icon: <Copy size={16} aria-hidden="true" />,
        ariaProps: { role: "status", "aria-live": "polite" },
      } as Parameters<typeof toast.success>[1]);
      resetSoon();
    } catch {
      toast.error("Não foi possível copiar o link", {
        description: `Copie manualmente: ${url}`,
        ariaProps: { role: "alert", "aria-live": "assertive" },
      } as Parameters<typeof toast.error>[1]);
    }
  };

  const isActive = status !== "idle";
  const label =
    status === "copied"
      ? "Link copiado para a área de transferência"
      : status === "shared"
        ? "Aplicativo compartilhado"
        : "Compartilhar aplicativo RotaRápida";

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        aria-label={label}
        title="Compartilhar aplicativo"
        className={`inline-flex items-center justify-center h-10 w-10 min-w-10 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isActive
            ? "bg-primary/15 text-primary scale-110"
            : "text-muted-foreground hover:text-primary hover:bg-muted active:scale-95"
        }`}
      >
        <span
          className="relative inline-flex items-center justify-center w-[18px] h-[18px]"
          aria-hidden="true"
        >
          <Share2
            size={18}
            className={`absolute transition-all duration-300 ${
              isActive
                ? "opacity-0 scale-50 rotate-45"
                : "opacity-100 scale-100 rotate-0"
            }`}
          />
          <Check
            size={18}
            className={`absolute transition-all duration-300 ${
              isActive
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-50 -rotate-45"
            }`}
          />
        </span>
        <span className="sr-only">{label}</span>
      </button>

      {/* Live region for screen readers — announces state changes */}
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "Link copiado para a área de transferência"}
        {status === "shared" && "Aplicativo compartilhado com sucesso"}
      </span>
    </>
  );
};

export default ShareButton;
