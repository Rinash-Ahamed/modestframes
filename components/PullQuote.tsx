import { Reveal } from "./Reveal";

export function PullQuote({ eyebrow, children }: { eyebrow?: string; children: string }) {
  return (
    <section className="border-y border-bone/10 bg-void py-24 md:py-36">
      <div className="container-studio">
        <Reveal>
          {eyebrow && (
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">{eyebrow}</span>
            </div>
          )}
          <p className="max-w-5xl text-balance font-editorial text-4xl italic leading-[1.15] text-bone sm:text-5xl md:text-6xl">
            {children}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
