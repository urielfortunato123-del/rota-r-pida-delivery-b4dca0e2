import { Languages } from "lucide-react";
import { useLocale, type Locale } from "@/lib/locale";

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useLocale();

  const options: { code: Locale; label: string }[] = [
    { code: "pt", label: "PT" },
    { code: "en", label: "EN" },
  ];

  return (
    <div
      role="group"
      aria-label={t.languageLabel}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/30 p-0.5"
    >
      <Languages
        size={14}
        className="text-muted-foreground ml-1.5"
        aria-hidden="true"
      />
      {options.map((opt) => {
        const active = locale === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            aria-pressed={active}
            aria-label={`${t.languageLabel}: ${opt.label}`}
            className={`text-[11px] font-semibold px-2 py-1 rounded-full transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
