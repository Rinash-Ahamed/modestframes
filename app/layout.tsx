import type { Metadata, Viewport } from "next";
import "./globals.css";
import { studio } from "@/lib/site";
import { CameraLensIntro } from "@/components/CameraLensIntro";
import { PublicPageMotion } from "@/components/PublicPageMotion";
import { Playfair_Display, Cormorant_Garamond, Space_Mono } from "next/font/google";

// Fix 1: Self-hosted via next/font — eliminates FOUT and Google Fonts network round-trip.
// Each font declares its own CSS variable so globals.css @theme tokens remain as fallback.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: studio.fullName,
  title: `${studio.fullName} - Wedding, Maternity & Family Photography in ${studio.city}`,
  description: studio.tagline,
  metadataBase: new URL("https://modestframes.studio"),
  openGraph: {
    title: studio.fullName,
    description: studio.tagline,
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${spaceMono.variable}`}>
      <body className="font-editorial">
        <CameraLensIntro />
        <PublicPageMotion>{children}</PublicPageMotion>
      </body>
    </html>
  );
}
