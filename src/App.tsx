import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/lib/locale";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import SplashScreen from "@/components/SplashScreen";
import Home from "./pages/Home";

// Rotas secundárias carregadas sob demanda (code-splitting)
const QueroContratar = lazy(() => import("./pages/QueroContratar"));
const SouMotoboy = lazy(() => import("./pages/SouMotoboy"));
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Privacidade = lazy(() => import("./pages/Privacidade"));
const Termos = lazy(() => import("./pages/Termos"));
const GithubStatus = lazy(() => import("./pages/GithubStatus"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Pré-carrega as rotas principais quando o navegador estiver ocioso,
// pra navegação posterior ser instantânea sem pesar o bundle inicial.
const prefetchRoutes = () => {
  const idle =
    (window as any).requestIdleCallback ??
    ((cb: () => void) => setTimeout(cb, 1500));
  idle(() => {
    import("./pages/QueroContratar");
    import("./pages/SouMotoboy");
    import("./pages/ComoFunciona");
  });
};

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center pt-24">
    <div className="flex gap-1.5" aria-label="Carregando">
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    prefetchRoutes();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <TooltipProvider>
          <SplashScreen />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <a href="#main-content" className="skip-link">
              Pular para o conteúdo principal
            </a>
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contratar" element={<QueroContratar />} />
                  <Route path="/motoboy" element={<SouMotoboy />} />
                  <Route path="/como-funciona" element={<ComoFunciona />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/privacidade" element={<Privacidade />} />
                  <Route path="/termos" element={<Termos />} />
                  <Route path="/github-status" element={<GithubStatus />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </BrowserRouter>
        </TooltipProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
};

export default App;
