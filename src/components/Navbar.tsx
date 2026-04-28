import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ShareButton from "./ShareButton";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Quero Contratar", path: "/contratar" },
  { label: "Sou Motoboy", path: "/motoboy" },
  { label: "Como Funciona", path: "/como-funciona" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fecha menu ao trocar de rota
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Fecha com Escape e devolve foco ao botão
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    // Move foco para o primeiro link do menu ao abrir
    const firstLink = mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" aria-label="Navegação principal">
      <div className="container flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-tight rounded-md"
          aria-label="RotaRápida — página inicial"
        >
          <span className="text-gradient">Rota</span>
          <span className="text-foreground">Rápida</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-primary rounded-md px-1 py-0.5 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <ShareButton />
          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-foreground inline-flex items-center justify-center h-10 w-10 rounded-md"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden glass border-t border-border"
        >
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors px-3 py-3 rounded-md ${
                    active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
