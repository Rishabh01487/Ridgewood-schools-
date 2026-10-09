import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ridgewoodmirganj.in/sitemap.xml",
    host: "https://ridgewoodmirganj.in",
  };
}
