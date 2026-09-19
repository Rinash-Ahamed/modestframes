import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AccessGate } from "@/components/AccessGate";
import { studio } from "@/lib/site";

export const metadata: Metadata = {
  title: `Client Gallery - ${studio.fullName}`,
  robots: { index: false },
};

export default function GalleryLandingPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[100svh] items-center justify-center px-6 pt-24">
        <AccessGate />
      </main>
      <Footer />
    </>
  );
}
