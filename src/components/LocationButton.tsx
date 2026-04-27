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
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-2 min-w-0">
            <Check size={16} className="text-primary flex-shrink-0" />
            <span className="text-sm truncate">
              Localização capturada ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
            </span>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onReset} className="flex-shrink-0">
            <X size={14} />
          </Button>
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default LocationButton;
