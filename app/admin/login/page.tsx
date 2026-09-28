import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata = {
  title: "Studio Access · Private Administration",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-void px-6 py-24">
        {/* Ambient atmospheric studio lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(240,239,236,0.035),transparent)]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-[70%] -translate-x-1/2 bg-bone/[0.02] blur-[90px]" />

        <div className="relative z-10 w-full">
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </main>
    </>
  );
}
