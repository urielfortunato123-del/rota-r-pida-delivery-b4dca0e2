const STORAGE_KEY = "rotarapida:events";
const MAX_EVENTS = 500;

export type AppEvent = {
  id: string;
  name: string;
  page: string;
  label?: string;
  device: "mobile" | "desktop";
  userAgent: string;
  timestamp: number;
};

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 640px)").matches;
};

export const trackEvent = (
  name: string,
  meta: { label?: string; page?: string } = {},
) => {
  if (typeof window === "undefined") return;
  try {
    const event: AppEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      page: meta.page ?? window.location.pathname,
      label: meta.label,
      device: isMobile() ? "mobile" : "desktop",
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    const raw = localStorage.getItem(STORAGE_KEY);
    const list: AppEvent[] = raw ? JSON.parse(raw) : [];
    list.push(event);
    // keep last MAX_EVENTS only
    const trimmed = list.slice(-MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // storage may be unavailable (private mode, quota) — fail silently
  }
};

export const getEvents = (): AppEvent[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppEvent[]) : [];
  } catch {
    return [];
  }
};

export const clearEvents = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

export const exportEventsCsv = (): string => {
  const events = getEvents();
  const header = ["timestamp", "name", "label", "page", "device", "userAgent"];
  const rows = events.map((e) =>
    [
      new Date(e.timestamp).toISOString(),
      e.name,
      e.label ?? "",
      e.page,
      e.device,
      e.userAgent.replace(/"/g, '""'),
    ]
      .map((v) => `"${v}"`)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
};
