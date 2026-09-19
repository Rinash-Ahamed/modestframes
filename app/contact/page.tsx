import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { studio } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact - ${studio.fullName}`,
  description: "Check availability and start a conversation about your shoot.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="container-studio grid gap-12 pb-28 pt-40 md:grid-cols-12 md:gap-8 md:pt-48">
          <Reveal className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone">Contact</span>
            </div>
            <h1 className="mt-6 text-balance font-display text-5xl font-black tracking-tight text-bone md:text-6xl">
              Let&rsquo;s talk <span className="heading-lean">about your date.</span>
            </h1>
            <p className="font-editorial mt-6 text-lg leading-relaxed text-stone">
              Availability is confirmed on a first-enquiry basis, especially in wedding season. The sooner you
              reach out, the more likely we can hold your date.
            </p>

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="text-stone">WhatsApp</dt>
                <dd className="mt-1 text-bone">
                  <a
                    href={studio.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-silver"
                  >
                    {studio.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-stone">Studio</dt>
                <dd className="mt-1 text-bone">
                  {studio.city}, {studio.region}
                </dd>
              </div>
              <div>
                <dt className="text-stone">Instagram</dt>
                <dd className="mt-1 text-bone">
                  <a
                    href={studio.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-silver"
                  >
                    {studio.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
