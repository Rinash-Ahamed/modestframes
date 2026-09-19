"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import clsx from "clsx";

export function ProjectUploader({ projectId }: { projectId: string }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const upload = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (list.length === 0) return;
      setUploading(true);
      setMessage("");

      const formData = new FormData();
      list.forEach((f) => formData.append("files", f));

      try {
        const res = await fetch(`/api/admin/projects/${projectId}/upload`, {
          method: "POST",
          body: formData,
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Upload failed.");
        setMessage(
          `${body.saved} image${body.saved === 1 ? "" : "s"} uploaded${
            body.skipped?.length ? ` - ${body.skipped.length} skipped (unsupported type or too large)` : ""
          }.`
        );
        router.refresh();
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [projectId, router]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          upload(e.dataTransfer.files);
        }}
        className={clsx(
          "flex flex-col items-center justify-center gap-3 border border-dashed px-6 py-14 text-center transition-colors",
          dragging ? "border-silver bg-silver/5" : "border-bone/20"
        )}
      >
        <UploadCloud size={22} className="text-stone" />
        <p className="font-editorial text-lg text-stone">
          Drag proof images here, or{" "}
          <button type="button" onClick={() => inputRef.current?.click()} className="text-silver underline decoration-silver-dim">
            browse files
          </button>
        </p>
        <p className="font-editorial text-base text-smoke">JPEG, PNG, WebP, or AVIF - up to 25MB each</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && upload(e.target.files)}
        />
      </div>
      {(uploading || message) && (
        <p className="font-editorial mt-3 text-base text-stone">{uploading ? "Uploading…" : message}</p>
      )}
    </div>
  );
}
