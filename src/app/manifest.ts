import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ridgewood School, Mirganj",
    short_name: "Ridgewood",
    description:
      "A CBSE curriculum school in Mirganj nurturing curious, confident, and compassionate global citizens through holistic, NEP 2020-aligned education.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f0",
    theme_color: "#11183a",
    icons: [
      {
        src: "/brand/ridgewood-shield.png",
        sizes: "185x300",
        type: "image/png",
      },
    ],
  };
}
