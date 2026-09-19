import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjects, getInquiries } from "@/lib/db";
import { StatusPill } from "@/components/StatusPill";

export default function AdminOverviewPage() {
  const projects = getProjects();
  const inquiries = getInquiries();

  const stats = [
    { label: "Total projects", value: projects.length },
    { label: "Awaiting selection", value: projects.filter((project) => project.status === "ready").length },
    { label: "Submitted", value: projects.filter((project) => project.status === "selected").length },
    { label: "New enquiries", value: inquiries.filter((inquiry) => inquiry.status === "new").length },
  ];

  return (
    <div className="space-y-10">
      <header>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">Admin overview</p>
        <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-bone">Studio at a glance</h1>
        <p className="mt-2 max-w-xl font-editorial text-lg text-stone">Projects, selections, and enquiries in one place.</p>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Studio statistics">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-panel group p-5 transition-colors hover:border-bone/20 md:p-6">
            <p className="font-display text-4xl font-black tracking-tight text-bone md:text-5xl">{stat.value}</p>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="admin-panel">
          <div className="flex items-center justify-between border-b border-bone/10 px-5 py-4 md:px-6">
            <h2 className="font-display text-xl font-bold tracking-tight text-bone">Recent projects</h2>
            <Link href="/admin/dashboard/projects" className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke hover:text-bone">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-bone/10">
            {projects.slice(0, 6).map((project) => (
              <Link
                key={project.id}
                href={`/admin/dashboard/projects/${project.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-bone/[0.025] md:px-6"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-bold text-bone">{project.clientNames}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-smoke">
                    {project.category} &middot; {project.images.length} images
                  </p>
                </div>
                <StatusPill status={project.status} />
              </Link>
            ))}
            {projects.length === 0 && <p className="px-6 py-10 text-center font-editorial text-lg text-stone">No projects yet.</p>}
          </div>
        </section>

        <section className="admin-panel">
          <div className="flex items-center justify-between border-b border-bone/10 px-5 py-4 md:px-6">
            <h2 className="font-display text-xl font-bold tracking-tight text-bone">Recent enquiries</h2>
            <Link href="/admin/dashboard/inquiries" className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-smoke hover:text-bone">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-bone/10">
            {inquiries.slice(0, 6).map((inquiry) => (
              <div key={inquiry.id} className="px-5 py-4 md:px-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-base font-bold text-bone">{inquiry.name}</p>
                  <p className="shrink-0 font-mono text-[9px] text-smoke">{new Date(inquiry.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-smoke">
                  {inquiry.category}{inquiry.eventDate && <> &middot; {inquiry.eventDate}</>}
                </p>
              </div>
            ))}
            {inquiries.length === 0 && <p className="px-6 py-10 text-center font-editorial text-lg text-stone">No enquiries yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
