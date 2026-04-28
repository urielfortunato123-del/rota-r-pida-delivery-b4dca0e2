import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";

const getUrl = () =>
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}/`
    : "";

const WhatsappShareButton = () => {
  const { t } = useLocale();

  const handleClick = () => {
    const message = t.buildInviteMessage(getUrl());
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      aria-label={t.inviteWhatsappButton}
      className="text-sm font-medium text-muted-foreground hover:text-[#25D366] rounded-xl"
    >
      <MessageCircle size={16} className="mr-2" />
      {t.inviteWhatsappButton}
    </Button>
  );
};

export default WhatsappShareButton;
