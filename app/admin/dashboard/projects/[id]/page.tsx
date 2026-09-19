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
    <div className="space-y-10">
      <div>
        <Link href="/admin/dashboard/projects" className="text-xs text-stone hover:text-silver">
          ← Projects
        </Link>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-black tracking-tight text-bone">{project.clientNames}</h1>
            <p className="font-editorial mt-1 text-lg text-stone">
              {project.category} · {new Date(project.shootDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={project.status} />
            <DeleteProjectButton projectId={project.id} clientNames={project.clientNames} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 border border-bone/10 p-6">
        <CopyField label="Access code" value={project.accessCode} />
        <CopyField label="Gallery link" value={galleryUrl} />
        <div>
          <p className="font-editorial text-base text-stone">Selections</p>
          <p className="font-editorial mt-1 border border-bone/15 px-3 py-2 text-lg text-bone">
            {project.selections.length} / {project.maxSelections}
          </p>
        </div>
      </div>

      {project.selectionSubmittedAt && (
        <div className="border border-silver-dim/40 bg-charcoal p-6">
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

      <div>
        <h2 className="font-display font-bold tracking-tight text-lg text-bone">Upload proofs</h2>
        <p className="font-editorial mt-1 text-lg text-stone">
          Uploaded images appear immediately in the client's private gallery.
        </p>
        <div className="mt-4">
          <ProjectUploader projectId={project.id} />
        </div>
      </div>

      <div>
        <h2 className="font-display font-bold tracking-tight text-lg text-bone">
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
      </div>
    </div>
  );
}
