import type { Metadata } from "next";
import "./globals.css";
import { studio } from "@/lib/site";
import { CameraLensIntro } from "@/components/CameraLensIntro";
import { PublicPageMotion } from "@/components/PublicPageMotion";

export const metadata: Metadata = {
  title: `${studio.fullName} - Wedding, Maternity & Family Photography in ${studio.city}`,
  description: studio.tagline,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: studio.fullName,
    description: studio.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-editorial">
        <CameraLensIntro />
        <PublicPageMotion>{children}</PublicPageMotion>
      </body>
    </html>
  );
}
