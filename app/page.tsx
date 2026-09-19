import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeHero } from "@/components/HomeHero";
import { CoverageGrid } from "@/components/CoverageGrid";
import { Reveal } from "@/components/Reveal";
import { Plate } from "@/components/Plate";
import { PullQuote } from "@/components/PullQuote";
import { Cta } from "@/components/Cta";
import { process_, testimonials, studio, CATEGORY_INFO } from "@/lib/site";

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

        {/* Editorial intro - asymmetric two-column statement */}
        <section className="container-studio py-24 md:py-36">
          <Reveal className="grid gap-10 md:grid-cols-12 md:gap-6">
            <p className="font-display text-3xl leading-snug text-bone md:col-span-6 md:text-4xl">
              <span className="font-display font-bold not-italic tracking-tight">A wedding is one continuous, unrepeatable day.</span>{" "}
              <span className="heading-lean">Everything here is built around not missing it.</span>
            </p>
            <div className="md:col-span-5 md:col-start-8">
              <p className="font-editorial text-lg leading-relaxed text-stone">
                {studio.fullName} is a single-photographer studio working across {studio.city} and beyond, covering
                weddings, maternity, newborn and family sessions with the same close attention regardless of scale.
                No two shoots are edited from the same preset - every gallery is culled and toned by hand.
              </p>
              <Link
                href="/studio"
                className="font-mono tracking-[0.04em] mt-6 inline-block text-xs text-silver underline decoration-silver-dim underline-offset-4"
              >
                More about the studio
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Coverage grid */}
        <section className="container-studio pb-24 md:pb-36">
          <Reveal className="mb-14 flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Coverage</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-bone md:text-5xl">
                Nine kinds <span className="heading-lean">of days</span>
              </h2>
            </div>
            <Link href="/portfolio" className="font-mono tracking-[0.04em] hidden text-xs text-stone hover:text-silver md:block">
              View full portfolio
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <CoverageGrid />
          </Reveal>
          <Link href="/portfolio" className="font-mono tracking-[0.04em] mt-10 block text-xs text-stone hover:text-silver md:hidden">
            View full portfolio
          </Link>
        </section>

        <PullQuote eyebrow="Philosophy">
          Most of what makes a gallery worth keeping isn&rsquo;t the posed frame. It&rsquo;s the fifteen minutes on
          either side of it, photographed like they mattered too.
        </PullQuote>

        {/* Featured editorial spreads */}
        <section className="bg-charcoal">
          {spreads.map((s, i) => (
            <Reveal key={s.slug}>
              <div className="container-studio relative overflow-hidden py-20 md:py-28">
                <span
                  aria-hidden="true"
                  className={`numeral-ghost absolute -top-6 select-none text-[9rem] sm:text-[13rem] md:text-[16rem] ${
                    i % 2 === 1 ? "-right-4 md:-right-8" : "-left-4 md:-left-8"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="relative grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
                  <div className={`plate-frame md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <Plate index={s.plate} alt={`${s.name} sample`} className="aspect-[4/3] w-full" />
                  </div>
                  <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                    <h3 className="font-display text-4xl font-black tracking-tight text-bone md:text-5xl">{s.name}</h3>
                    <p className="font-editorial mt-5 text-lg leading-relaxed text-stone">{s.description}</p>
                    <Link
                      href={`/portfolio/${s.slug}`}
                      className="font-mono tracking-[0.04em] mt-6 inline-block text-xs text-silver underline decoration-silver-dim underline-offset-4"
                    >
                      See {s.name.toLowerCase()} work
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* Process */}
        <section className="container-studio py-24 md:py-36">
          <Reveal className="mb-16">
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-bone md:text-5xl">
              How a shoot <span className="heading-lean">comes together</span>
            </h2>
          </Reveal>
          <div className="divide-y divide-bone/10 border-y border-bone/10">
            {process_.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05}>
                <div className="group relative grid gap-2 overflow-hidden py-10 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span
                    aria-hidden="true"
                    className="numeral-ghost pointer-events-none absolute -left-2 -top-6 text-[7rem] transition-colors duration-500 group-hover:text-silver/10 md:text-[8rem]"
                  >
                    {p.step}
                  </span>
                  <h3 className="font-display font-bold tracking-tight relative text-xl text-bone md:col-span-3">{p.title}</h3>
                  <p className="font-editorial relative text-lg leading-relaxed text-stone md:col-span-7 md:col-start-6">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-bone/10 bg-charcoal py-24 md:py-36">
          <div className="container-studio">
            <Reveal className="mb-16">
              <Eyebrow>In their words</Eyebrow>
            </Reveal>
            <div className="grid gap-14 md:grid-cols-3 md:gap-10">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.06} className="flex flex-col">
                  <span aria-hidden="true" className="numeral-ghost text-6xl leading-none text-silver/20">
                    &ldquo;
                  </span>
                  <p className="-mt-4 font-editorial text-xl italic leading-snug text-bone">{t.quote}</p>
                  <div className="mt-8 border-t border-bone/10 pt-4">
                    <p className="font-editorial text-lg text-bone">{t.name}</p>
                    <p className="font-editorial text-base text-smoke">{t.context}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-studio py-28 text-center md:py-40">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl font-black tracking-tight text-bone md:text-5xl">
              If your date is worth remembering, <span className="heading-lean">it&rsquo;s worth beginning with a conversation.</span>
            </h2>
            <div className="mt-10 flex justify-center">
              <Cta href="/contact">Start the conversation</Cta>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
