import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Download, RefreshCw, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AppEvent,
  clearEvents,
  exportEventsCsv,
  getEvents,
} from "@/lib/analytics";
import { toast } from "sonner";

const formatDate = (ts: number) =>
  new Date(ts).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const Analytics = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [filter, setFilter] = useState<"all" | "mobile" | "desktop">("all");

  const reload = () => setEvents(getEvents());

  useEffect(() => {
    reload();
  }, []);

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? events : events.filter((e) => e.device === filter);
    return [...list].sort((a, b) => b.timestamp - a.timestamp);
  }, [events, filter]);

  const stats = useMemo(() => {
    const total = events.length;
    const mobile = events.filter((e) => e.device === "mobile").length;
    const desktop = total - mobile;

    const ctaContratar = events.filter(
      (e) => e.name === "cta_click" && e.label?.startsWith("contratar"),
    ).length;
    const ctaMotoboy = events.filter(
      (e) => e.name === "cta_click" && e.label?.startsWith("motoboy"),
    ).length;

    const ctaContratarMobile = events.filter(
      (e) =>
        e.name === "cta_click" &&
        e.label?.startsWith("contratar") &&
        e.device === "mobile",
    ).length;
    const ctaMotoboyMobile = events.filter(
      (e) =>
        e.name === "cta_click" &&
        e.label?.startsWith("motoboy") &&
        e.device === "mobile",
    ).length;

    return {
      total,
      mobile,
      desktop,
      ctaContratar,
      ctaMotoboy,
      ctaContratarMobile,
      ctaMotoboyMobile,
    };
  }, [events]);

  const handleClear = () => {
    if (!confirm("Apagar todos os eventos registrados?")) return;
    clearEvents();
    reload();
    toast.success("Eventos apagados");
  };

  const handleExport = () => {
    if (events.length === 0) {
      toast.error("Nenhum evento para exportar");
      return;
    }
    const csv = exportEventsCsv();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rotarapida-eventos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 overflow-x-hidden">
      <div className="container max-w-5xl px-4">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={reload}>
              <RefreshCw size={14} className="mr-1" /> Atualizar
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download size={14} className="mr-1" /> CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 size={14} className="mr-1" /> Limpar
            </Button>
          </div>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Analytics local
        </h1>
        <p className="text-sm text-muted-foreground mb-8 break-words">
          Eventos registrados neste navegador (localStorage). Limpar o cache do
          navegador apaga estes dados.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Total de eventos" value={stats.total} />
          <StatCard label="Mobile" value={stats.mobile} icon={<Smartphone size={14} />} />
          <StatCard label="Desktop" value={stats.desktop} icon={<Monitor size={14} />} />
          <StatCard label="CTAs (todos)" value={stats.ctaContratar + stats.ctaMotoboy} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="glass rounded-2xl p-5">
            <p className="text-xs text-muted-foreground mb-1">🔴 Quero contratar</p>
            <p className="font-heading text-2xl font-bold text-primary">
              {stats.ctaContratar}
              <span className="text-sm text-muted-foreground font-normal ml-2">
                ({stats.ctaContratarMobile} mobile)
              </span>
            </p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-xs text-muted-foreground mb-1">⚫ Sou motoboy</p>
            <p className="font-heading text-2xl font-bold text-primary">
              {stats.ctaMotoboy}
              <span className="text-sm text-muted-foreground font-normal ml-2">
                ({stats.ctaMotoboyMobile} mobile)
              </span>
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {(["all", "mobile", "desktop"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Todos" : f === "mobile" ? "Mobile" : "Desktop"}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div className="glass rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Nenhum evento registrado ainda.
            </p>
          ) : (
            <div className="divide-y divide-border max-h-[60vh] overflow-y-auto">
              {filtered.map((e) => (
                <div key={e.id} className="p-4 text-sm">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {e.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(e.timestamp)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground break-words">
                    <span className="font-medium text-foreground">{e.label}</span>
                    {" • "}
                    <span>{e.page}</span>
                    {" • "}
                    <span className="inline-flex items-center gap-1">
                      {e.device === "mobile" ? (
                        <Smartphone size={11} />
                      ) : (
                        <Monitor size={11} />
                      )}
                      {e.device}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) => (
  <div className="glass rounded-2xl p-4">
    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
      {icon} {label}
    </div>
    <div className="font-heading text-2xl font-bold">{value}</div>
  </div>
);

export default Analytics;
