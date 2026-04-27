import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Check, X } from "lucide-react";
import { GeoLocation } from "@/hooks/use-geolocation";

interface Props {
  location: GeoLocation | null;
  loading: boolean;
  error: string | null;
  onRequest: () => void;
  onReset: () => void;
  label?: string;
}

const LocationButton = ({ location, loading, error, onRequest, onReset, label = "Usar minha localização atual" }: Props) => {
  return (
    <div className="space-y-2">
      {!location ? (
        <Button
          type="button"
          variant="outline"
          onClick={onRequest}
          disabled={loading}
          className="w-full border-border bg-muted/50 hover:bg-muted gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} className="text-primary" />}
          {loading ? "Obtendo localização..." : label}
        </Button>
      ) : (
        <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 w-full max-w-full overflow-hidden">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Check size={16} className="text-emerald-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm truncate text-emerald-50 min-w-0">
              Localização capturada
            </span>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onReset} className="flex-shrink-0 h-8 w-8 p-0">
            <X size={14} />
          </Button>
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default LocationButton;
