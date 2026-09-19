import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata = {
  title: "Studio Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[100svh] items-center justify-center px-6 pt-24">
        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>
      </main>
    </>
  );
}
