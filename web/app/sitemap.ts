import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map((route) => {
    const url = route === "" ? SITE.url : `${SITE.url}/${route}`;
    return {
      url,
      lastModified: now,
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1.0 : route.startsWith("guias/") ? 0.8 : 0.9,
      alternates: {
        languages: {
          "es-ES": route === "" ? SITE.url : `${SITE.url}/${route}`,
          "en-US": `${SITE.url}/en`,
        },
      },
    };
  });
}
