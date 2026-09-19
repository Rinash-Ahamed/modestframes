import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "@/lib/db";
import { StatusPill } from "@/components/StatusPill";

export default function AdminProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-smoke">Gallery management</p>
          <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-bone">Projects</h1>
          <p className="mt-2 font-editorial text-lg text-stone">Every client shoot from upload through final selection.</p>
        </div>
        <Link
          href="/admin/dashboard/projects/new"
          className="flex w-fit items-center gap-2 border border-bone bg-bone px-5 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-void transition-colors hover:bg-transparent hover:text-bone"
        >
          <Plus size={14} /> New project
        </Link>
      </header>

      <section className="admin-panel divide-y divide-bone/10">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/admin/dashboard/projects/${project.id}`}
            className="grid gap-4 px-5 py-5 transition-colors hover:bg-bone/[0.025] md:grid-cols-[1fr_auto] md:items-center md:px-6"
          >
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-bold text-bone">{project.clientNames}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-smoke">
                {project.category} &middot; {new Date(project.shootDate).toLocaleDateString("en-IN")} &middot; {project.images.length} images
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-stone">
                {project.selections.length}/{project.maxSelections} selected
              </p>
              <StatusPill status={project.status} />
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <p className="px-6 py-14 text-center font-editorial text-lg text-stone">
            No projects yet. <Link href="/admin/dashboard/projects/new" className="text-bone underline underline-offset-4">Create your first project</Link>.
          </p>
        )}
      </section>
    </div>
  );
}
