import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ridgewood School, Mirganj",
    short_name: "Ridgewood",
    description:
      "A CBSE curriculum school in Mirganj nurturing curious, confident, and compassionate global citizens through holistic, NEP 2020-aligned education.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#faf7f0",
    theme_color: "#1A2B4C",
    icons: [
      // Standard PWA icons (any type) — square with shield centered on navy
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Maskable icons for Android adaptive icons (safe-zone padding so shield isn't cropped)
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
