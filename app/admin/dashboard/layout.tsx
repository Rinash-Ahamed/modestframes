import { AdminHeader } from "@/components/AdminHeader";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell min-h-screen bg-void">
      <AdminHeader />
      <main className="container-studio py-8 md:py-12">
        <div className="admin-page">{children}</div>
      </main>
    </div>
  );
}
