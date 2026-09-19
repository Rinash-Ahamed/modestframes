import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { process_, faqs, studio } from "@/lib/site";

export const metadata: Metadata = {
  title: `Process - ${studio.fullName}`,
  description: "From first enquiry to final delivery - how a shoot with the studio works.",
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="container-studio pb-16 pt-40 md:pt-48">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">Process</span>
            </div>
            <h1 className="mt-6 max-w-2xl text-balance font-display text-5xl font-black tracking-tight text-bone md:text-6xl">
              From first message to final delivery.
            </h1>
          </Reveal>
        </section>

        <section className="container-studio pb-24 md:pb-32">
          <div className="divide-y divide-bone/10 border-y border-bone/10">
            {process_.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05}>
                <div className="group relative grid gap-3 overflow-hidden py-12 md:grid-cols-12 md:items-start md:gap-6">
                  <span
                    aria-hidden="true"
                    className="numeral-ghost pointer-events-none absolute -left-3 -top-10 text-[8rem] transition-colors duration-500 group-hover:text-silver/10 md:text-[9rem]"
                  >
                    {p.step}
                  </span>
                  <h2 className="font-display font-bold tracking-tight relative text-xl text-bone md:col-span-3">{p.title}</h2>
                  <p className="font-editorial relative text-lg leading-relaxed text-stone md:col-span-6 md:col-start-6">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-bone/10 bg-charcoal py-24 md:py-32">
          <div className="container-studio grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">FAQ</span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-bone">Common questions</h2>
              <p className="font-editorial mt-4 text-lg text-stone">
                About your private gallery, selections, and turnaround. Anything else,{" "}
                <Link href="/contact" className="text-silver underline decoration-silver-dim underline-offset-4">
                  reach out directly
                </Link>
                .
              </p>
            </Reveal>
            <div className="divide-y divide-bone/10 border-y border-bone/10 md:col-span-7 md:col-start-6">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05} className="py-6">
                  <h3 className="font-display font-bold tracking-tight text-xl text-bone">{f.q}</h3>
                  <p className="font-editorial mt-2 text-lg leading-relaxed text-stone">{f.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
