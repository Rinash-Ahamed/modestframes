import { AdminHeader } from "@/components/AdminHeader";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-void">
      <AdminHeader />
      <main className="container-studio py-10">{children}</main>
    </div>
  );
}
