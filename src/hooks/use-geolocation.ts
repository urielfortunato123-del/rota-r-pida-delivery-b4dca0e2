import { useState } from "react";

export interface GeoLocation {
  lat: number;
  lng: number;
  mapsUrl: string;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    setError(null);
    if (!("geolocation" in navigator)) {
      setError("Geolocalização não suportada neste navegador.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({
          lat,
          lng,
          mapsUrl: `https://www.google.com/maps?q=${lat},${lng}`,
        });
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Permissão negada. Ative a localização no navegador."
            : "Não foi possível obter sua localização."
        );
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const reset = () => {
    setLocation(null);
    setError(null);
  };

  return { location, loading, error, requestLocation, reset };
};
