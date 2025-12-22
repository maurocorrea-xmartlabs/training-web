import { Metadata } from "next";
import { SubjectList } from "@/lib/ui/lists/subjectList";
import { getSubjects } from "@/controllers/subjectController";

export const metadata: Metadata = {
  title: "To-Do",
  description:
    "Organize your subjects, projects and tasks in a clear academic workflow.",
};

export default async function TodoPage() {
  const subjects = await getSubjects();
  return <SubjectList subjects={subjects} />;
}
