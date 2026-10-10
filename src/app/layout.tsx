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

const SITE_URL = "https://ridgewoodschools.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Ridgewood School Mirganj | Best CBSE Primary School in Mirganj, Bihar",
    template: "%s | Ridgewood School Mirganj",
  },
  description:
    "Ridgewood School Mirganj — the best CBSE primary school in Mirganj, Bihar (est. 2020). Admissions open 2026-27 for Pre-Primary to Class 8. NEP 2020-aligned, child-centred learning, smart classes, library, sports, music & arts. Parent portal with report cards, notices & private photo gallery. Call +91 70522 24726.",
  keywords: [
    "Ridgewood School Mirganj",
    "Ridgewood School",
    "best school in Mirganj",
    "CBSE school Mirganj",
    "CBSE school Bihar Mirganj",
    "primary school Mirganj",
    "best primary school Mirganj",
    "school admission Mirganj 2026",
    "school admission Mirganj 2027",
    "nursery school Mirganj",
    "LKG UKG school Mirganj",
    "play school Mirganj",
    "Pre-Primary school Mirganj",
    "Class 1 to 8 school Mirganj",
    "Ridgewood Mirganj admissions",
    "Ridgewood Mirganj parent login",
    "Ridgewood Mirganj fee structure",
    "Ashok Educational Social Welfare Trust Mirganj",
    "Bachpan play school Mirganj",
    "Mirganj school near me",
    "Siwan Mirganj school",
    "Bihar CBSE school admission",
    "smart classes Mirganj",
  ],
  authors: [{ name: "Ridgewood School, Mirganj" }],
  creator: "Ridgewood School, Mirganj",
  publisher: "Ridgewood School, Mirganj",
  applicationName: "Ridgewood School, Mirganj",
  category: "Education",
  openGraph: {
    title:
      "Ridgewood School Mirganj | Best CBSE Primary School in Mirganj, Bihar",
    description:
      "Admissions Open 2026-27! CBSE primary school in Mirganj (est. 2020). Pre-Primary to Class 8. NEP 2020-aligned, smart classes, sports, arts. Parent portal with report cards, notices & private photo gallery. Call +91 70522 24726.",
    siteName: "Ridgewood School, Mirganj",
    type: "website",
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        url: "/brand/ridgewood-full-logo.png",
        width: 1506,
        height: 600,
        alt: "Ridgewood School, Mirganj — Best CBSE Primary School in Mirganj, Bihar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ridgewood School Mirganj | Best CBSE Primary School in Mirganj, Bihar",
    description:
      "Admissions Open 2026-27! CBSE primary school in Mirganj. Pre-Primary to Class 8. NEP 2020-aligned. Call +91 70522 24726.",
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
        {/* JSON-LD structured data for SEO — School + EducationalOrganization schema.
            Rich snippets help Google show your school with rating, address, phone,
            opening hours, and grade levels in search results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["School", "EducationalOrganization", "LocalBusiness", "Place"],
              "@id": `${SITE_URL}/#school`,
              name: "Ridgewood School, Mirganj",
              alternateName: ["Ridgewood Mirganj", "Ridgewood School", "Ridgewood"],
              description:
                "Ridgewood School Mirganj — the best CBSE primary school in Mirganj, Bihar. Established 2020 under the Ashok Educational and Social Welfare Trust. Pre-Primary to Class 8. NEP 2020-aligned, child-centred learning with smart classes, library, sports, music & arts. Admissions open 2026-27.",
              url: SITE_URL,
              logo: `${SITE_URL}/brand/ridgewood-full-logo.png`,
              image: `${SITE_URL}/brand/ridgewood-full-logo.png`,
              telephone: "+91-70522-24726",
              faxNumber: "+91-70522-24726",
              email: "Ridgewoodmirganj@gmail.com",
              priceRange: "₹₹",
              currenciesAccepted: "INR",
              address: {
                "@type": "PostalAddress",
                "@id": `${SITE_URL}/#address`,
                streetAddress:
                  "Rajmohan Colony, Dr B N Chaudhary Lane, Near Hathwa Mor",
                addressLocality: "Mirganj",
                addressRegion: "Bihar",
                postalCode: "841438",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 26.2568,
                longitude: 84.3421,
              },
              hasMap:
                "https://www.google.com/maps/search/?api=1&query=Rajmohan+Colony+Dr+B+N+Chaudhary+Lane+Near+Hathwa+Mor+Mirganj+841438",
              foundingDate: "2020",
              foundingOrganization: {
                "@type": "NGO",
                name: "Ashok Educational and Social Welfare Trust",
              },
              affiliation: "Central Board of Secondary Education (CBSE)",
              board: "CBSE",
              areaServed: [
                { "@type": "City", name: "Mirganj" },
                { "@type": "State", name: "Bihar" },
                { "@type": "Country", name: "India" },
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "08:00",
                  closes: "16:00",
                },
              ],
              departments: [
                { "@type": "EducationalOrganization", name: "Pre-Primary (Bachpan)" },
                { "@type": "EducationalOrganization", name: "Primary School (Class 1-5)" },
                { "@type": "EducationalOrganization", name: "Middle School (Class 6-8)" },
              ],
              knowsAbout: [
                "CBSE Primary Education",
                "NEP 2020 Aligned Curriculum",
                "Pre-Primary Education",
                "Child-Centred Pedagogy",
                "Multiple Intelligence Theory",
                "Smart Classes",
                "Holistic Education",
                "Experiential Learning",
              ],
              amenities: [
                "Smart Classes",
                "Library",
                "Smart Lab",
                "Sports Club",
                "Music & Dance Club",
                "Art & Craft Club",
              ],
              sameAs: [
                "https://www.instagram.com/ridgewoodmirganj/",
                "https://www.facebook.com/share/1DoZFeZJ41/",
                "https://youtube.com/@ridgewoodmirganj",
              ],
            }),
          }}
        />
        {/* FAQ structured data — gives rich FAQ snippets in Google search results.
            Targets common queries parents search for. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Ridgewood School Mirganj?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ridgewood School, Mirganj is a CBSE curriculum primary school in Mirganj, Bihar, established in 2020 under the Ashok Educational and Social Welfare Trust. It offers classes from Pre-Primary (in collaboration with Bachpan) up to Class 8, with NEP 2020-aligned, child-centred learning. From Roots to Ridges.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Ridgewood School Mirganj a CBSE school?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Ridgewood School, Mirganj follows the CBSE (Central Board of Secondary Education) curriculum. It is one of the best CBSE primary schools in Mirganj, Bihar, with NEP 2020-aligned learning, smart classes, and modern teaching methods.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What classes does Ridgewood School Mirganj offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ridgewood School Mirganj offers admissions from Pre-Primary (Play Group, Nursery, LKG, UKG in collaboration with Bachpan) to Class 8 (8th Standard). Classes follow the CBSE curriculum with NEP 2020 alignment.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are admissions open at Ridgewood School Mirganj for 2026-27?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, admissions are open for the academic year 2026-2027 at Ridgewood School, Mirganj for Pre-Primary to Class 8. Limited seats. Parents can apply online at ridgewoodschools.com or call +91 70522 24726 for enquiries.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can parents apply for admission at Ridgewood School Mirganj?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Parents can apply online by filling the registration form at ridgewoodschools.com/admissions, or visit the campus at Rajmohan Colony, Dr B N Chaudhary Lane, Near Hathwa Mor, Mirganj 841438. For enquiries, call +91 70522 24726 or email Ridgewoodmirganj@gmail.com.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What facilities does Ridgewood School Mirganj have?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ridgewood School Mirganj facilities include Smart Classes with audio-visual tools, a well-stocked Library, Smart Lab for hands-on learning, Sports Club (football, cricket, badminton), Music & Dance Club, and Art & Craft Club. The school also offers a Parent Portal for tracking report cards, notices, and a private photo gallery.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where is Ridgewood School Mirganj located?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ridgewood School, Mirganj is located at Rajmohan Colony, Dr B N Chaudhary Lane, Near Hathwa Mor, Mirganj 841438, Bihar, India. Office hours: Monday to Saturday, 8:00 AM to 4:00 PM. Phone: +91 70522 24726.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Ridgewood School Mirganj have a parent portal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Ridgewood School Mirganj has a Parent Portal where parents can log in with their registered phone number to view their child's report cards, school notices, participation in events, and a private photo & video gallery. The portal is available at ridgewoodschools.com/#parent-login.",
                  },
                },
              ],
            }),
          }}
        />
        {/* BreadcrumbList schema — helps Google understand the site hierarchy */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: SITE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Admissions",
                  item: `${SITE_URL}/#admissions`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Parent Portal",
                  item: `${SITE_URL}/#parent-login`,
                },
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
