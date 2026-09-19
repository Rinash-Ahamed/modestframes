import Link from "next/link";
import { NewProjectForm } from "@/components/NewProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/dashboard/projects" className="text-xs text-stone hover:text-silver">
          ← Projects
        </Link>
        <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-bone">New project</h1>
        <p className="font-editorial mt-1 text-lg text-stone">
          Creates a private gallery and a random access code you can share with the client.
        </p>
      </div>
      <NewProjectForm />
    </div>
  );
}
