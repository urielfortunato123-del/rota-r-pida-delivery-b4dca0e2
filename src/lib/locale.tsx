import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "pt" | "en";

const STORAGE_KEY = "rotarapida:locale";

type Messages = {
  inviteCopyButton: string;
  inviteCopiedButton: string;
  inviteWhatsappButton: string;
  inviteToastTitle: string;
  inviteToastDescription: string;
  inviteToastErrorTitle: string;
  inviteToastErrorDescription: string;
  /** Builds the full invite message with the URL appended */
  buildInviteMessage: (url: string) => string;
  languageLabel: string;
};

const messages: Record<Locale, Messages> = {
  pt: {
    inviteCopyButton: "Copiar convite",
    inviteCopiedButton: "Copiado!",
    inviteWhatsappButton: "Enviar pelo WhatsApp",
    inviteToastTitle: "Convite copiado!",
    inviteToastDescription: "Cole no WhatsApp, e-mail ou onde quiser.",
    inviteToastErrorTitle: "Não foi possível copiar",
    inviteToastErrorDescription: "Tente novamente ou copie o link manualmente.",
    languageLabel: "Idioma",
    buildInviteMessage: (url) => `🛵 *Conheça o RotaRápida!*

Motoboys sob demanda para restaurantes, farmácias, pizzarias e padarias.

✅ Rápido, simples e sem contrato
✅ Sem marketplace — só logística
✅ Disponível 24/7 na sua região
✅ Resposta em menos de 5 minutos

Acesse: ${url}`,
  },
  en: {
    inviteCopyButton: "Copy invite",
    inviteCopiedButton: "Copied!",
    inviteWhatsappButton: "Send via WhatsApp",
    inviteToastTitle: "Invite copied!",
    inviteToastDescription: "Paste it on WhatsApp, email or anywhere you like.",
    inviteToastErrorTitle: "Couldn't copy",
    inviteToastErrorDescription: "Try again or copy the link manually.",
    languageLabel: "Language",
    buildInviteMessage: (url) => `🛵 *Meet RotaRápida!*

On-demand motorcycle couriers for restaurants, pharmacies, pizzerias and bakeries.

✅ Fast, simple and contract-free
✅ Not a marketplace — pure logistics
✅ Available 24/7 in your area
✅ Response in under 5 minutes

Visit: ${url}`,
  },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const detectInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "pt" || stored === "en") return stored;
  // Fallback: navigator language
  const nav = navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "pt";
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("pt");

  // Hydrate from storage / browser on mount (avoids SSR mismatch)
  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore (private mode)
    }
    // Update <html lang> for screen readers / SEO
    document.documentElement.lang = l === "en" ? "en" : "pt-BR";
  }, []);

  // Keep <html lang> in sync on first hydration too
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: messages[locale] }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
};
