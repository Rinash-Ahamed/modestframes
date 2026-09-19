import Link from "next/link";
import { getProjects, getInquiries } from "@/lib/db";
import { ArrowUpRight } from "lucide-react";
import { StatusPill } from "@/components/StatusPill";

export default function AdminOverviewPage() {
  const projects = getProjects();
  const inquiries = getInquiries();

  const stats = [
    { label: "Total projects", value: projects.length },
    { label: "Awaiting client selection", value: projects.filter((p) => p.status === "ready").length },
    { label: "Selections submitted", value: projects.filter((p) => p.status === "selected").length },
    { label: "New enquiries", value: inquiries.filter((i) => i.status === "new").length },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl font-black tracking-tight text-bone">Overview</h1>
        <p className="font-editorial mt-1 text-lg text-stone">A quick read on where every project and enquiry stands.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-bone/10 p-6">
            <p className="font-editorial text-4xl italic text-bone">{s.value}</p>
            <p className="font-editorial mt-2 text-base text-stone">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold tracking-tight text-lg text-bone">Recent projects</h2>
            <Link href="/admin/dashboard/projects" className="flex items-center gap-1 text-xs text-stone hover:text-silver">
              All projects <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-bone/10 border-y border-bone/10">
            {projects.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                href={`/admin/dashboard/projects/${p.id}`}
                className="font-mono tracking-[0.04em] flex items-center justify-between py-4 text-xs hover:bg-bone/[0.02]"
              >
                <div>
                  <p className="font-editorial text-bone">{p.clientNames}</p>
                  <p className="font-editorial text-base text-stone">
                    {p.category} · {p.images.length} images
                  </p>
                </div>
                <StatusPill status={p.status} />
              </Link>
            ))}
            {projects.length === 0 && <p className="font-editorial py-6 text-lg text-stone">No projects yet.</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold tracking-tight text-lg text-bone">Recent enquiries</h2>
            <Link href="/admin/dashboard/inquiries" className="flex items-center gap-1 text-xs text-stone hover:text-silver">
              All enquiries <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-bone/10 border-y border-bone/10">
            {inquiries.slice(0, 6).map((i) => (
              <div key={i.id} className="py-4 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-editorial text-bone">{i.name}</p>
                  <p className="font-editorial text-base text-smoke">{new Date(i.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <p className="font-editorial mt-1 text-base text-stone">
                  {i.category} {i.eventDate && `· ${i.eventDate}`}
                </p>
              </div>
            ))}
            {inquiries.length === 0 && <p className="font-editorial py-6 text-lg text-stone">No enquiries yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

