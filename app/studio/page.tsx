import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { studio } from "@/lib/site";

export const metadata: Metadata = {
  title: `Studio - ${studio.fullName}`,
  description: "About the studio, the approach, and the equipment.",
};

const principles = [
  {
    n: "01",
    title: "Documentary first",
    body: "Most of a gallery is unposed. Directed portraits are used sparingly, for the handful of frames that genuinely need them.",
  },
  {
    n: "02",
    title: "One editor, one eye",
    body: "Every image in every gallery passes through the same pair of hands. Nothing is outsourced to a bulk-editing service.",
  },
  {
    n: "03",
    title: "Shot for print",
    body: "Framing accounts for how an image will be printed and hung, not just how it looks on a phone screen.",
  },
  {
    n: "04",
    title: "Quiet on the day",
    body: "The best coverage is the coverage no one notices is happening. Minimal gear, no crowding the moment.",
  },
];

export default function StudioPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="container-studio grid gap-10 pb-20 pt-40 md:grid-cols-12 md:gap-8 md:pt-48">
          <Reveal className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">The Studio</span>
            </div>
            <h1 className="mt-6 text-balance font-display text-5xl font-black tracking-tight text-bone md:text-6xl">
              A studio built around one photographer&rsquo;s eye, not a package menu.
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5 md:col-start-8">
            <p className="font-editorial text-lg leading-relaxed text-stone">
              {studio.fullName} works out of {studio.city}, covering weddings and family milestones across Tamil
              Nadu and beyond. The studio stays deliberately small - a single lead photographer, with a trusted
              second shooter brought in for full wedding-day coverage - so every gallery is shaped by one
              consistent point of view.
            </p>
            <p className="font-editorial mt-4 text-lg leading-relaxed text-stone">
              What that means in practice: fewer clients taken on each season, more time spent on each edit, and a
              photographer who has usually met your family before the shoot day arrives.
            </p>
          </Reveal>
        </section>

        <section className="container-studio pb-24">
          <Reveal className="plate-frame">
            <Plate index={7} alt="Studio at work" className="aspect-[16/9] w-full" priority />
          </Reveal>
        </section>

        <section className="border-t border-bone/10 bg-charcoal py-24 md:py-32">
          <div className="container-studio">
            <Reveal className="mb-16 max-w-lg">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">Approach</span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-bone">How we work</h2>
            </Reveal>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={(i % 2) * 0.08} className="relative overflow-hidden">
                  <span aria-hidden="true" className="numeral-ghost absolute -left-2 -top-8 text-8xl">
                    {p.n}
                  </span>
                  <h3 className="font-display font-bold tracking-tight relative text-lg text-bone">{p.title}</h3>
                  <p className="font-editorial relative mt-3 text-lg leading-relaxed text-stone">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="container-studio py-24 text-center md:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-xl text-balance font-display text-4xl font-black tracking-tight text-bone">
              Want to know if we&rsquo;re free on your date?
            </h2>
            <div className="mt-8 flex justify-center">
              <Cta href="/contact">Ask about availability</Cta>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
