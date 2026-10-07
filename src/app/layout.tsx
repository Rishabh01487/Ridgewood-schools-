import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Playfair Display for elegant serif headings (Roman)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Playfair Display Italic — for elegant italic accents
const playfairItalic = Playfair_Display({
  variable: "--font-playfair-italic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ridgewood School, Mirganj — A CBSE Curriculum School",
  description:
    "Ridgewood School, Mirganj — a CBSE curriculum school under the Ashok Educational and Social Welfare Trust. Nurturing curious, confident, and compassionate global citizens through holistic, NEP 2020-aligned education. From Roots to Ridges.",
  keywords: [
    "Ridgewood School Mirganj",
    "CBSE School Mirganj",
    "Primary School Mirganj",
    "Best School in Mirganj",
    "Ridgewood Mirganj Admissions",
    "Parent Login Ridgewood",
    "Ridgewood School Gallery",
    "From Roots to Ridges",
  ],
  authors: [{ name: "Ridgewood School, Mirganj" }],
  openGraph: {
    title: "Ridgewood School, Mirganj — A CBSE Curriculum School",
    description:
      "A CBSE curriculum school in Mirganj nurturing curious, confident, and compassionate global citizens through holistic, NEP 2020-aligned education.",
    siteName: "Ridgewood School, Mirganj",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridgewood School, Mirganj",
    description: "From Roots to Ridges — A CBSE Curriculum School, Mirganj",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} ${playfairItalic.variable} antialiased bg-background text-foreground font-sans`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
