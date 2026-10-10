import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ridgewoodschools.com/sitemap.xml",
    host: "https://ridgewoodschools.com",
  };
}
