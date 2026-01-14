import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (!session) redirect("/logIn");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="w-full max-w-3xl px-16 py-32 bg-white border border-zinc-200 rounded-xl">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Uni-Do</h1>

          <p className="text-lg text-zinc-600 leading-relaxed">
            Uni-Do is a simple productivity app designed to help you organize
            your academic workflow in a clear and structured way.
          </p>

          <div className="space-y-4 text-zinc-700">
            <p>
              Create subjects, split them into projects, and manage tasks
              without unnecessary complexity.
            </p>

            <p>
              Keep track of your exams and deadlines while maintaining a clear
              overview of everything you need to do.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
