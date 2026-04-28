import { useEffect, useState } from "react";

const MIN_DURATION = 1500; // mínimo de exibição (evita "piscar")
const MAX_DURATION = 5000; // teto absoluto: nunca segura mais que 5s
const FADE_DURATION = 400;
const STORAGE_KEY = "rr_splash_shown";

const SplashScreen = () => {
  // Só mostra se ainda não foi exibido nesta sessão do navegador
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let hideTimer: number | undefined;
    let fadeTimer: number | undefined;
    let maxTimer: number | undefined;

    const dismiss = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      fadeTimer = window.setTimeout(() => setFading(true), remaining);
      hideTimer = window.setTimeout(() => setVisible(false), remaining + FADE_DURATION);
    };

    // 1) Some assim que a janela disparar 'load' (todo CSS/JS/fonts iniciais ok)
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    // 2) Garantia: nunca passa de 5s, mesmo se 'load' demorar (rede ruim)
    maxTimer = window.setTimeout(() => {
      setFading(true);
      window.setTimeout(() => setVisible(false), FADE_DURATION);
    }, MAX_DURATION);

    return () => {
      window.removeEventListener("load", dismiss);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (maxTimer) clearTimeout(maxTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Carregando RotaRápida"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/icon-512.png"
        alt="RotaRápida"
        width={160}
        height={160}
        fetchPriority="high"
        decoding="async"
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl glow-red animate-pulse"
      />
      <h1 className="mt-6 font-heading text-2xl sm:text-3xl font-bold text-gradient">
        RotaRápida
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Motoboy sob demanda
      </p>
      <div className="mt-8 flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
};

export default SplashScreen;
