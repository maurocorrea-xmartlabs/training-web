import { ExamList } from "@/lib/ui/lists/examList";
import { getExams } from "@/services/examService";
import { getSubjects } from "@/services/subjectService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exams",
  description:
    "View and manage your exams, including dates, scores and associated subjects.",
};

export default async function ExamsPage() {
  const [exams, subjects] = await Promise.all([getExams(), getSubjects()]);

  return <ExamList exams={exams} subjects={subjects} />;
}
