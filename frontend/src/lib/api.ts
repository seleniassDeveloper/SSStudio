const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

/** URL absoluta o relativa según entorno (proxy Vite en dev, Railway en prod). */
export function resolveApiUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${normalized}` : normalized;
}

export function getApiBase(): string {
  return API_BASE;
}

export function isApiConfigured(): boolean {
  return Boolean(API_BASE) || import.meta.env.DEV;
}

type ApiErrorBody = {
  error?: string;
  details?: Record<string, string[] | undefined>;
};

export async function parseApiError(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const json = JSON.parse(text) as ApiErrorBody;
    if (json.details) {
      const fields = Object.entries(json.details)
        .map(([k, v]) => `${k}: ${(v ?? []).join(", ")}`)
        .join("; ");
      if (fields) return fields;
    }
    if (json.error) return json.error;
  } catch {
    /* no JSON */
  }
  return text || res.statusText || "Error de servidor";
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = resolveApiUrl(path);
  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    throw new Error(await parseApiError(res));
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type LeadPayload = {
  nombre: string;
  email?: string;
  proyecto?: string;
  tipo?: string;
  descripcion: string;
};

export async function submitLead(data: LeadPayload, token?: string | null) {
  return apiFetch<{ ok: boolean; id: string }>(
    "/api/v1/leads",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  );
}

export async function trackEvent(
  name: string,
  payload?: Record<string, unknown>,
  token?: string | null
) {
  return apiFetch("/api/v1/analytics/events", {
    method: "POST",
    body: JSON.stringify({ name, payload }),
  }, token).catch(() => undefined);
}

export type HealthResponse = {
  status: string;
  database: string;
  firebase: string;
  ceromancyService: string;
};

export async function checkApiHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/api/v1/health");
}

export async function analyzeCandleImage(file: File): Promise<Record<string, unknown>> {
  const body = new FormData();
  body.append("file", file);

  const url = resolveApiUrl("/analizar");
  const res = await fetch(url, { method: "POST", body });

  if (!res.ok) {
    throw new Error(await parseApiError(res));
  }

  return res.json() as Promise<Record<string, unknown>>;
}
