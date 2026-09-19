import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/db";
import { hasGalleryAccess } from "@/lib/galleryAuth";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AccessGate } from "@/components/AccessGate";
import { GalleryView } from "@/components/GalleryView";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Private Gallery",
  robots: { index: false, follow: false },
};

export default async function ClientGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const authorized = await hasGalleryAccess(project.id);

  if (!authorized) {
    return (
      <>
        <Nav />
        <main className="flex min-h-[100svh] items-center justify-center px-6 pt-24">
          <AccessGate redirectSlug={project.slug} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="pt-20">
        <GalleryView project={project} />
      </main>
    </>
  );
}
