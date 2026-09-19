"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Project } from "@/lib/types";
import clsx from "clsx";

export function GalleryView({ project: initialProject }: { project: Project }) {
  const [project, setProject] = useState(initialProject);
  const [selections, setSelections] = useState<string[]>(initialProject.selections);
  const [note, setNote] = useState(initialProject.selectionNote);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const submitted = !!project.selectionSubmittedAt;
  const atLimit = selections.length >= project.maxSelections;

  const persist = useCallback(
    async (nextSelections: string[], submit = false) => {
      setSaving(true);
      try {
        const res = await fetch(`/api/gallery/${project.slug}/select`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageIds: nextSelections, note, submit }),
        });
        const body = await res.json();
        if (res.ok) {
          if (submit) {
            setProject((p) => ({ ...p, selectionSubmittedAt: new Date().toISOString(), status: "selected" }));
          }
          setJustSaved(true);
          setTimeout(() => setJustSaved(false), 1500);
        }
      } finally {
        setSaving(false);
      }
    },
    [project.slug, note]
  );

  function toggle(id: string) {
    if (submitted) return;
    setSelections((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= project.maxSelections
        ? prev
        : [...prev, id];
      persist(next);
      return next;
    });
  }

  async function handleSubmit() {
    setSubmitting(true);
    await persist(selections, true);
    setSubmitting(false);
  }

  const lightboxImage = lightboxIndex !== null ? project.images[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-void pb-32">
      {/* Sticky selection bar */}
      <div className="sticky top-20 z-40 border-b border-bone/10 bg-void/95 backdrop-blur-md">
        <div className="container-studio flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-editorial text-2xl italic text-bone">{project.clientNames}</p>
            <p className="font-editorial text-base text-stone">
              {project.category} · {new Date(project.shootDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {submitted ? (
            <div className="flex items-center gap-2 border border-silver-dim/60 px-4 py-2 text-sm text-silver">
              <Check size={16} /> Selection submitted
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <p className={clsx("text-sm", atLimit ? "text-silver" : "text-stone")}>
                {selections.length} / {project.maxSelections} selected
              </p>
              <button
                onClick={handleSubmit}
                disabled={selections.length === 0 || submitting}
                className="font-mono border border-bone/30 px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-bone transition-all duration-500 ease-studio hover:border-silver hover:text-silver disabled:opacity-40"
              >
                {submitting ? "Submitting…" : "Submit selection"}
              </button>
            </div>
          )}
        </div>
      </div>

      {submitted && (
        <div className="container-studio pt-8">
          <div className="border border-silver-dim/40 bg-charcoal p-6 text-sm leading-relaxed text-stone">
            Your selection of {project.selections.length} image{project.selections.length === 1 ? "" : "s"} was
            submitted on{" "}
            {new Date(project.selectionSubmittedAt as string).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            . The studio has been notified and retouching will begin shortly - no further action needed.
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="container-studio grid grid-cols-2 gap-2 pt-8 sm:grid-cols-3 md:grid-cols-4">
        {project.images.map((img, i) => {
          const selected = selections.includes(img.id);
          const orderIndex = selections.indexOf(img.id);
          return (
            <div key={img.id} className="group relative aspect-[4/5] overflow-hidden bg-ash">
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="absolute inset-0 h-full w-full"
                aria-label={`Open image ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt={`${project.clientNames} proof ${i + 1}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-studio group-hover:scale-105"
                />
              </button>
              <div
                className={clsx(
                  "pointer-events-none absolute inset-0 transition-colors duration-300",
                  selected ? "bg-void/10 ring-2 ring-inset ring-silver" : "bg-void/0"
                )}
              />
              <button
                type="button"
                onClick={() => toggle(img.id)}
                disabled={submitted}
                aria-pressed={selected}
                aria-label={selected ? "Remove from selection" : "Add to selection"}
                className={clsx(
                  "absolute right-2 top-2 flex h-8 w-8 items-center justify-center border text-xs transition-colors duration-200",
                  selected
                    ? "border-silver bg-silver text-void"
                    : "border-bone/40 bg-void/50 text-bone opacity-0 backdrop-blur-sm group-hover:opacity-100"
                )}
              >
                {selected ? orderIndex + 1 : <Check size={14} />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Note */}
      {!submitted && (
        <div className="container-studio mt-10">
          <label className="block max-w-xl">
            <span className="text-xs text-stone">Notes for the studio (optional)</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => persist(selections)}
              rows={3}
              placeholder="Anything specific about your selection - cropping preferences, must-have shots, etc."
              className="mt-2 w-full resize-none border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-silver"
            />
          </label>
          <p className="font-editorial mt-2 text-base text-smoke">
            {saving ? "Saving…" : justSaved ? "Saved" : "Selections save automatically as you go."}
          </p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            project={project}
            index={lightboxIndex as number}
            selections={selections}
            submitted={submitted}
            onClose={() => setLightboxIndex(null)}
            onNav={(i) => setLightboxIndex(i)}
            onToggle={toggle}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({
  project,
  index,
  selections,
  submitted,
  onClose,
  onNav,
  onToggle,
}: {
  project: Project;
  index: number;
  selections: string[];
  submitted: boolean;
  onClose: () => void;
  onNav: (i: number) => void;
  onToggle: (id: string) => void;
}) {
  const img = project.images[index];
  const selected = selections.includes(img.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-void/97 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 text-bone/70 transition-colors hover:text-bone"
      >
        <X size={26} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + project.images.length) % project.images.length);
        }}
        aria-label="Previous image"
        className="absolute left-2 z-10 p-3 text-bone/60 transition-colors hover:text-bone sm:left-6"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % project.images.length);
        }}
        aria-label="Next image"
        className="absolute right-2 z-10 p-3 text-bone/60 transition-colors hover:text-bone sm:right-6"
      >
        <ChevronRight size={28} />
      </button>

      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-4"
      >
        <div className="relative max-h-[75vh] w-full">
          <Image
            src={img.url}
            alt={`${project.clientNames} proof ${index + 1}`}
            width={1400}
            height={1750}
            className="max-h-[75vh] w-auto object-contain"
            priority
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-smoke">
            {index + 1} / {project.images.length}
          </span>
          {!submitted && (
            <button
              onClick={() => onToggle(img.id)}
              className={clsx(
                "flex items-center gap-2 border px-5 py-2 text-sm transition-colors duration-200",
                selected ? "border-silver bg-silver text-void" : "border-bone/40 text-bone hover:border-silver hover:text-silver"
              )}
            >
              <Check size={14} /> {selected ? "Selected" : "Select this image"}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
