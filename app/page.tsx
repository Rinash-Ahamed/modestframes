import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeHero } from "@/components/HomeHero";
import { CoverageGrid } from "@/components/CoverageGrid";
import { Reveal } from "@/components/Reveal";
import { Plate } from "@/components/Plate";
import { PullQuote } from "@/components/PullQuote";
import { Cta } from "@/components/Cta";
import { studio, CATEGORY_INFO } from "@/lib/site";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { VisualOrbit } from "@/components/VisualOrbit";
import { PhotographicProcess } from "@/components/PhotographicProcess";

const spreads = [
  CATEGORY_INFO[0], // Wedding
  CATEGORY_INFO[5], // Maternity
  CATEGORY_INFO[6], // Newborn
];

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">{children}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HomeHero />
        <VisualOrbit />

        {/* Editorial intro - asymmetric two-column statement */}
        <section className="container-studio py-16 md:py-22">
          <Reveal className="grid gap-10 md:grid-cols-12 md:gap-6">
            <p className="font-display text-3xl leading-snug text-bone md:col-span-6 md:text-4xl">
              <span className="font-display font-bold not-italic tracking-tight">A wedding is one continuous, unrepeatable day.</span>{" "}
              <span className="heading-lean">Everything here is built around not missing it.</span>
            </p>
            <div className="md:col-span-5 md:col-start-8">
              <p className="font-editorial text-lg leading-relaxed text-stone">
                {studio.fullName} is a single-photographer studio working across {studio.city} and beyond, covering
                weddings, maternity, newborn, and family sessions with the same close attention regardless of scale.
                No two shoots are edited from the same preset; every gallery is culled and toned by hand.
              </p>
              <Link
                href="/studio"
                className="font-mono tracking-[0.04em] mt-5 inline-block text-xs text-silver underline decoration-silver-dim underline-offset-4"
              >
                More about the studio
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Coverage grid */}
        <section className="container-studio pb-16 md:pb-22">
          <Reveal kind="heading" className="mb-10 flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Coverage</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-bone md:text-5xl">
                Nine kinds <span className="heading-lean">of days</span>
              </h2>
            </div>
            <Link href="/portfolio" className="font-mono tracking-[0.04em] hidden text-xs text-stone hover:text-silver md:block">
              View full portfolio
            </Link>
          </Reveal>
          <Reveal kind="media" delay={0.08}>
            <CoverageGrid />
          </Reveal>
          <Link href="/portfolio" className="font-mono tracking-[0.04em] mt-8 block text-xs text-stone hover:text-silver md:hidden">
            View full portfolio
          </Link>
        </section>

        <PullQuote>
          Most of what makes a gallery worth keeping isn&rsquo;t the posed frame. It&rsquo;s the fifteen minutes on
          either side of it, photographed like they mattered too.
        </PullQuote>

        {/* Featured editorial spreads — first 2 use asymmetric split, 3rd breaks to
            full-width cinematic overlay to satisfy the zigzag alternation cap. */}
        <section className="bg-charcoal">
          {spreads.map((s, i) =>
            i === 2 ? (
              // Full-width cinematic layout — image fills 16:9, text overlays from bottom-left
              <Reveal key={s.slug}>
                <div className="container-studio py-12 md:py-16">
                  <div className="plate-frame relative overflow-hidden rounded-[22px] border border-bone/15 shadow-2xl">
                    <Plate index={s.plate} alt={`${s.name} sample`} className="aspect-[16/9] w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/92 via-void/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                      <div className="max-w-lg">
                        <h3 className="font-display text-4xl font-black tracking-tight text-bone md:text-5xl">{s.name}</h3>
                        <p className="font-editorial mt-3 text-lg leading-relaxed text-stone">{s.description}</p>
                        <Link
                          href={`/portfolio/${s.slug}`}
                          className="font-mono tracking-[0.04em] mt-5 inline-block text-xs text-silver underline decoration-silver-dim underline-offset-4"
                        >
                          See {s.name.toLowerCase()} work
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal key={s.slug}>
                <div className="container-studio relative overflow-hidden py-12 md:py-16">
                  <span
                    aria-hidden="true"
                    className={`numeral-ghost absolute -top-6 select-none text-[8rem] sm:text-[11rem] md:text-[14rem] ${
                      i % 2 === 1 ? "-right-4 md:-right-8" : "-left-4 md:-left-8"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className="relative grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
                    <div className={`plate-frame overflow-hidden rounded-[22px] border border-bone/15 shadow-2xl md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <Plate index={s.plate} alt={`${s.name} sample`} className="aspect-[4/3] w-full" />
                    </div>
                    <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                      <h3 className="font-display text-4xl font-black tracking-tight text-bone md:text-5xl">{s.name}</h3>
                      <p className="font-editorial mt-4 text-lg leading-relaxed text-stone">{s.description}</p>
                      <Link
                        href={`/portfolio/${s.slug}`}
                        className="font-mono tracking-[0.04em] mt-5 inline-block text-xs text-silver underline decoration-silver-dim underline-offset-4"
                      >
                        See {s.name.toLowerCase()} work
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          )}
        </section>

        {/* Process */}
        <section className="container-studio py-16 md:py-22">
          <Reveal kind="heading" className="mb-10">
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-bone md:text-5xl">
              How a shoot <span className="heading-lean">comes together</span>
            </h2>
          </Reveal>
          <Reveal>
            <PhotographicProcess />
          </Reveal>
        </section>

        {/* Testimonials */}
        <section className="border-t border-bone/10 bg-charcoal py-16 md:py-22">
          <div className="container-studio">
            <Reveal>
              <TestimonialsCarousel />
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="container-studio py-18 text-center md:py-24">
          <Reveal kind="heading">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl font-black tracking-tight text-bone md:text-5xl">
              If your date is worth remembering, <span className="heading-lean">it&rsquo;s worth beginning with a conversation.</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <Cta href="/contact">Start the conversation</Cta>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
