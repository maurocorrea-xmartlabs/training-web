import { Metadata } from "next";
import { SubjectList } from "@/lib/ui/lists/subjectList";
import { getSubjects } from "@/services/subjectService";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "To-Do",
  description:
    "Organize your subjects, projects and tasks in a clear academic workflow.",
};

export default async function TodoPage() {
  const session = await getSession();
  if (!session) redirect("/logIn");

  const subjects = await getSubjects();
  return <SubjectList subjects={subjects} />;
}
