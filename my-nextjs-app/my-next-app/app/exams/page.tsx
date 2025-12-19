import { ExamList } from "@/lib/ui/lists/examList";
import { getExams } from "@/controllers/examController";
import { getSubjects } from "@/controllers/subjectController";

export default async function ExamsPage() {
  const [exams, subjects] = await Promise.all([getExams(), getSubjects()]);

  return <ExamList exams={exams} subjects={subjects} />;
}
