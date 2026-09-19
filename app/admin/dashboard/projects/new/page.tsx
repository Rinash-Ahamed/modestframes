import Link from "next/link";
import { NewProjectForm } from "@/components/NewProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/dashboard/projects" className="font-mono text-[9px] uppercase tracking-[0.12em] text-smoke hover:text-bone">
          ← Projects
        </Link>
        <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-bone">New project</h1>
        <p className="mt-2 max-w-xl font-editorial text-lg text-stone">
          Creates a private gallery and a random access code you can share with the client.
        </p>
      </div>
      <NewProjectForm />
    </div>
  );
}
