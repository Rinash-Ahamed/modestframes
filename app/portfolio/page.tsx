import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CoverageGrid } from "@/components/CoverageGrid";
import { Reveal } from "@/components/Reveal";
import { studio } from "@/lib/site";

export const metadata: Metadata = {
  title: `Portfolio - ${studio.fullName}`,
  description: "Wedding, maternity, newborn, family and event photography.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="container-studio pb-20 pt-40 md:pt-48">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">Portfolio</span>
            </div>
            <h1 className="mt-6 max-w-2xl text-balance font-display text-5xl font-black tracking-tight text-bone md:text-6xl">
              Nine kinds of days, photographed the same careful way.
            </h1>
          </Reveal>
        </section>

        <section className="container-studio pb-28 md:pb-36">
          <Reveal delay={0.08}>
            <CoverageGrid />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
