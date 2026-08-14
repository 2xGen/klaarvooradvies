import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { DisclaimerBar } from "@/components/DisclaimerBar";
import { FloatingSituatieschetsButton } from "@/components/FloatingSituatieschetsButton";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Distinctive display — paired with Inter body (not “template serif”). */
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

const defaultOgImage =
  "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/og%20image%20klaar%20voor%20advies.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hoeveel hypotheek kun je krijgen? Gratis berekenen | Klaar voor advies",
    template: "%s | Klaar voor advies",
  },
  description:
    "Bereken wat je ongeveer kunt lenen en maak gratis een persoonlijk hypotheekoverzicht. Geen account. Daarna kun je het laten meekijken door een erkend adviseur.",
  keywords: [
    "klaar voor advies",
    "hoeveel hypotheek kan ik krijgen",
    "maximale hypotheek berekenen",
    "gratis hypotheekoverzicht",
    "hypotheek berekenen",
    "hypotheek voorbereiden",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteUrl,
    siteName: "Klaar voor advies",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Klaar voor advies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <DisclaimerBar />
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <FloatingSituatieschetsButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
