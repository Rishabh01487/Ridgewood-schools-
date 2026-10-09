import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Playfair Display for elegant serif headings (Roman)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Playfair Display Italic — for elegant italic accents
const playfairItalic = Playfair_Display({
  variable: "--font-playfair-italic",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: "italic",
  display: "swap",
});

const SITE_URL = "https://ridgewoodmirganj.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ridgewood School, Mirganj — A CBSE Curriculum School",
    template: "%s · Ridgewood School, Mirganj",
  },
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
  creator: "Ridgewood School, Mirganj",
  publisher: "Ridgewood School, Mirganj",
  applicationName: "Ridgewood School, Mirganj",
  category: "Education",
  openGraph: {
    title: "Ridgewood School, Mirganj — A CBSE Curriculum School",
    description:
      "A CBSE curriculum school in Mirganj nurturing curious, confident, and compassionate global citizens through holistic, NEP 2020-aligned education.",
    siteName: "Ridgewood School, Mirganj",
    type: "website",
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        url: "/brand/ridgewood-full-logo.png",
        width: 1506,
        height: 600,
        alt: "Ridgewood School, Mirganj — A CBSE Curriculum School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridgewood School, Mirganj",
    description: "From Roots to Ridges — A CBSE Curriculum School, Mirganj",
    images: ["/brand/ridgewood-full-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#11183a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data for SEO — LocalBusiness / School schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              name: "Ridgewood School, Mirganj",
              alternateName: "Ridgewood Mirganj",
              description:
                "A CBSE curriculum school in Mirganj nurturing curious, confident, and compassionate global citizens through holistic, NEP 2020-aligned education.",
              url: SITE_URL,
              logo: `${SITE_URL}/brand/ridgewood-full-logo.png`,
              image: `${SITE_URL}/brand/ridgewood-full-logo.png`,
              telephone: "+91-70522-24726",
              email: "Ridgewoodmirganj@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Rajmohan Colony, Dr B N Chaudhary Lane, Near Hathwa Mor",
                addressLocality: "Mirganj",
                addressRegion: "Bihar",
                postalCode: "841438",
                addressCountry: "IN",
              },
              foundingDate: "2020",
              affiliation: "Central Board of Secondary Education (CBSE)",
              areaServed: "Mirganj, Bihar, India",
              sameAs: [
                "https://www.instagram.com/ridgewoodmirganj/",
                "https://www.facebook.com/share/1DoZFeZJ41/",
                "https://youtube.com/@ridgewoodmirganj",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} ${playfairItalic.variable} antialiased bg-background text-foreground font-sans`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
