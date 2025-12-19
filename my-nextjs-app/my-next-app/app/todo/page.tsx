import { Metadata } from "next";
import { SubjectList } from "../../lib/ui/lists/subjectList";

export const metadata: Metadata = {
  title: "To-Do",
  description:
    "Organize your subjects, projects and tasks in a clear academic workflow.",
};

export default function TodoPage() {
  return <SubjectList />;
}
