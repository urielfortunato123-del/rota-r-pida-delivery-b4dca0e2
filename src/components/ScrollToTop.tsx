import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Em cada mudança de rota:
 *  1. Rola a janela para o topo.
 *  2. Move o foco para o primeiro <h1> da nova página, garantindo que
 *     leitores de tela anunciem o novo contexto e que a navegação por
 *     teclado continue a partir do título principal.
 *
 * Se não houver <h1>, faz fallback para <main id="main-content">.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1) Rola para o topo imediatamente
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // 2) Move foco para o h1 (após o React renderizar a nova rota)
    const focusHeading = () => {
      const target =
        (document.querySelector("main h1") as HTMLElement | null) ||
        (document.querySelector("h1") as HTMLElement | null) ||
        (document.getElementById("main-content") as HTMLElement | null);

      if (!target) return;

      // Garante que o elemento possa receber foco programático sem
      // virar tabbable na ordem natural do Tab
      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) target.setAttribute("tabindex", "-1");

      // Estilo de foco discreto (sem outline padrão no h1) — o anel
      // global de :focus-visible não dispara em foco programático
      target.style.outline = "none";

      target.focus({ preventScroll: true });

      // Remove tabindex adicionado para não poluir a árvore de Tab
      // após o foco ser perdido (próximo blur)
      const cleanup = () => {
        if (!hadTabIndex) target.removeAttribute("tabindex");
        target.style.outline = "";
        target.removeEventListener("blur", cleanup);
      };
      target.addEventListener("blur", cleanup);
    };

    // Aguarda o próximo frame para o conteúdo da rota estar montado
    const raf = window.requestAnimationFrame(() => {
      // Pequeno timeout extra para componentes com animação de entrada
      window.setTimeout(focusHeading, 50);
    });

    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
