export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    uploading: "text-smoke border-smoke/40",
    ready: "text-silver border-silver-dim",
    selected: "text-bone border-bone/40",
    delivered: "text-stone border-stone/40",
  };
  return (
    <span className={`border px-2.5 py-1 text-[11px] capitalize ${map[status] || "text-stone border-stone/40"}`}>
      {status}
    </span>
  );
}
