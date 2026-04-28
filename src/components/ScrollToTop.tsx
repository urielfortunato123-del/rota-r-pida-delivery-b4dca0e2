import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rola a janela para o topo a cada mudança de rota.
 * Garante que páginas novas (acessadas via links, barra flutuante, etc.)
 * sempre comecem do topo, sem ficarem parcialmente cobertas pela navbar
 * ou pela barra de CTA fixa.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Usa "auto" (instantâneo) para evitar flash de conteúdo no meio
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
