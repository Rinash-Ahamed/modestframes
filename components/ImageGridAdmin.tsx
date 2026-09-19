"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash2 } from "lucide-react";
import clsx from "clsx";
import { ProofImage } from "@/lib/types";

export function ImageGridAdmin({
  projectId,
  images,
  coverImageId,
  selections,
}: {
  projectId: string;
  images: ProofImage[];
  coverImageId: string | null;
  selections: string[];
}) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const router = useRouter();

  async function remove(imageId: string) {
    if (!confirm("Delete this image? This can't be undone.")) return;
    setBusyId(imageId);
    await fetch(`/api/admin/projects/${projectId}/images/${imageId}`, { method: "DELETE" });
    setBusyId(null);
    router.refresh();
  }

  async function setCover(imageId: string) {
    setBusyId(imageId);
    await fetch(`/api/admin/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverImageId: imageId }),
    });
    setBusyId(null);
    router.refresh();
  }

  if (images.length === 0) {
    return <p className="font-editorial py-8 text-lg text-stone">No images uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
      {images.map((img) => {
        const isCover = img.id === coverImageId;
        const isSelected = selections.includes(img.id);
        return (
          <div key={img.id} className="group relative aspect-[4/5] overflow-hidden bg-ash">
            <Image src={img.url} alt={img.filename} fill sizes="200px" className="object-cover" />
            {isSelected && (
              <span className="absolute left-1.5 top-1.5 border border-silver bg-void/70 px-1.5 py-0.5 text-[10px] text-silver">
                selected
              </span>
            )}
            <div className="absolute inset-0 flex items-start justify-end gap-1 bg-void/0 p-1.5 opacity-0 transition-opacity group-hover:bg-void/30 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => setCover(img.id)}
                disabled={busyId === img.id}
                title="Set as cover"
                className={clsx(
                  "flex h-7 w-7 items-center justify-center border text-xs",
                  isCover ? "border-silver bg-silver text-void" : "border-bone/40 bg-void/60 text-bone"
                )}
              >
                <Star size={13} fill={isCover ? "currentColor" : "none"} />
              </button>
              <button
                type="button"
                onClick={() => remove(img.id)}
                disabled={busyId === img.id}
                title="Delete image"
                className="flex h-7 w-7 items-center justify-center border border-bone/40 bg-void/60 text-bone hover:border-red-400 hover:text-red-400"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
