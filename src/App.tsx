import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/lib/locale";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import QueroContratar from "./pages/QueroContratar";
import SouMotoboy from "./pages/SouMotoboy";
import ComoFunciona from "./pages/ComoFunciona";
import Analytics from "./pages/Analytics";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <a href="#main-content" className="skip-link">
            Pular para o conteúdo principal
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contratar" element={<QueroContratar />} />
              <Route path="/motoboy" element={<SouMotoboy />} />
              <Route path="/como-funciona" element={<ComoFunciona />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
