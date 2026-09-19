import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/db";
import { StatusPill } from "@/components/StatusPill";
import { CopyField } from "@/components/CopyField";
import { ProjectUploader } from "@/components/ProjectUploader";
import { ImageGridAdmin } from "@/components/ImageGridAdmin";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";

export default async function AdminProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const galleryUrl = `/gallery/${project.slug}`;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/dashboard/projects" className="font-mono text-[10px] uppercase tracking-[0.12em] text-smoke hover:text-bone">
          ← Projects
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-black tracking-tight text-bone">{project.clientNames}</h1>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-smoke">
              {project.category} · {new Date(project.shootDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={project.status} />
            <DeleteProjectButton projectId={project.id} clientNames={project.clientNames} />
          </div>
        </div>
      </div>

      <section className="admin-panel flex flex-wrap gap-6 p-5 md:p-6">
        <CopyField label="Access code" value={project.accessCode} />
        <CopyField label="Gallery link" value={galleryUrl} />
        <div>
          <p className="admin-label">Selections</p>
          <p className="border border-bone/15 bg-void/40 px-3 py-2 font-mono text-xs text-bone">
            {project.selections.length} / {project.maxSelections}
          </p>
        </div>
      </section>

      {project.selectionSubmittedAt && (
        <div className="admin-panel border-bone/20 p-5 md:p-6">
          <p className="font-editorial text-lg text-bone">
            Client submitted their selection on{" "}
            {new Date(project.selectionSubmittedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            .
          </p>
          {project.selectionNote && (
            <p className="font-editorial mt-3 text-lg text-stone">
              <span className="text-xs text-smoke">Client note: </span>
              {project.selectionNote}
            </p>
          )}
        </div>
      )}

      <section className="admin-panel p-5 md:p-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-bone">Upload proofs</h2>
        <p className="mt-1 font-editorial text-base text-stone">
          Uploaded images appear immediately in the client's private gallery.
        </p>
        <div className="mt-4">
          <ProjectUploader projectId={project.id} />
        </div>
      </section>

      <section className="admin-panel p-5 md:p-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-bone">
          Images <span className="text-stone">({project.images.length})</span>
        </h2>
        <div className="mt-4">
          <ImageGridAdmin
            projectId={project.id}
            images={project.images}
            coverImageId={project.coverImageId}
            selections={project.selections}
          />
        </div>
      </section>
    </div>
  );
}
