import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Começa o fade-out aos 4.5s e remove aos 5s
    const fadeTimer = setTimeout(() => setFading(true), 4500);
    const hideTimer = setTimeout(() => setVisible(false), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Carregando RotaRápida"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/icon-512.png"
        alt="RotaRápida"
        width={160}
        height={160}
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
