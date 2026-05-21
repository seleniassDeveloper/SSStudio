/** URLs de demos — configurables con variables VITE_DEMO_* en .env */
export const productDemos = {
  dashboard:
    import.meta.env.VITE_DEMO_DASHBOARD_URL ??
    "https://dashboard-react-rust-eight.vercel.app/app",
  ceromancia: "/demo/ceromancia",
  emotions:
    import.meta.env.VITE_DEMO_EMOTIONS_URL ?? "/demo/emociones",
  calories:
    import.meta.env.VITE_DEMO_CALORIES_URL ?? "/demo/calorias",
} as const;

export type DemoKind = keyof typeof productDemos;

export function isExternalDemo(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
