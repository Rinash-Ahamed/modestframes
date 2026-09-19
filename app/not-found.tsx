import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cta } from "@/components/Cta";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="font-editorial numeral-ghost text-[10rem] text-bone/10 sm:text-[13rem]">404</p>
        <p className="font-editorial -mt-10 max-w-sm text-lg text-stone">
          This page doesn&rsquo;t exist, or the moment it was pointing to has already passed.
        </p>
        <div className="mt-8">
          <Cta href="/">Back to the studio</Cta>
        </div>
      </main>
      <Footer />
    </>
  );
}
