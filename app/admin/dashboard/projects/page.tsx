import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "@/lib/db";
import { StatusPill } from "@/components/StatusPill";

export default function AdminProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight text-bone">Projects</h1>
          <p className="font-editorial mt-1 text-lg text-stone">Every client shoot, from upload through final selection.</p>
        </div>
        <Link
          href="/admin/dashboard/projects/new"
          className="font-mono tracking-[0.04em] flex items-center gap-2 border border-silver-dim px-5 py-2.5 text-xs text-silver transition-colors hover:border-silver hover:bg-silver hover:text-void"
        >
          <Plus size={16} /> New project
        </Link>
      </div>

      <div className="divide-y divide-bone/10 border-y border-bone/10">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/admin/dashboard/projects/${p.id}`}
            className="flex flex-col gap-2 py-5 hover:bg-bone/[0.02] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-editorial text-bone">{p.clientNames}</p>
              <p className="font-editorial text-base text-stone">
                {p.category} · {new Date(p.shootDate).toLocaleDateString("en-IN")} · {p.images.length} images ·
                code {p.accessCode}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-editorial text-base text-stone">
                {p.selections.length} / {p.maxSelections} selected
              </p>
              <StatusPill status={p.status} />
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <p className="font-editorial py-10 text-center text-lg text-stone">
            No projects yet.{" "}
            <Link href="/admin/dashboard/projects/new" className="text-silver underline decoration-silver-dim">
              Create your first project
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
