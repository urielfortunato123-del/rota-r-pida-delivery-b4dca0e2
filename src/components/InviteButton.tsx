import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";

const getUrl = () =>
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}/`
    : "";

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
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const message = t.buildInviteMessage(getUrl());
    try {
      await copyToClipboard(message);
      setCopied(true);
      toast.success(t.inviteToastTitle, {
        description: t.inviteToastDescription,
      });
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error(t.inviteToastErrorTitle, {
        description: t.inviteToastErrorDescription,
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
          {t.inviteCopiedButton}
        </>
      ) : (
        <>
          <Copy size={16} className="mr-2" />
          {t.inviteCopyButton}
        </>
      )}
    </Button>
  );
};

export default InviteButton;
