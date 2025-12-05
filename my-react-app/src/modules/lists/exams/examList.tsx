import { useEffect, useState } from "react";
import type { Exam } from "../../../types/exam/exam";
import { AddExamForm } from "../../forms/addExamForm";
import { ExamItem } from "./examItem";
import type { NewExam } from "../../../types/exam/newExam";
import { ExamController } from "../../../controllers/examController";
import type { Subject } from "../../../types/subject/subject";
import { SubjectController } from "../../../controllers/subjectController";

export function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const examController = new ExamController();
  const subjectController = new SubjectController();

  async function loadExams() {
    const newExamList = await examController.getExams();
    setExams(newExamList!);
  }

  async function loadSubjects() {
    const newSubjectList = await subjectController.getSubjects();
    setSubjects(newSubjectList!);
  }

  useEffect(() => {
    loadExams();
    loadSubjects();
  });

  async function handleAddExam(
    minScore: number,
    maxScore: number,
    date: string,
    subjectId: string,
  ) {
    const newExam: NewExam = {
      minScore: minScore,
      maxScore: maxScore,
      date: new Date(date),
      subjectId: subjectId,
    };

    await examController.postExam(newExam);
    loadExams();
  }

  async function handleDeleteExam(id: string) {
    await examController.deleteExam(id);
    loadExams();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Subjects</h2>
        <AddExamForm subjects={subjects} onAddExam={handleAddExam} />
      </div>

      <div className="space-y-4">
        {exams.map((exam) => (
          <ExamItem
            key={exam.id}
            exam={exam}
            subjectName={
              subjects.find((s) => s.id === exam.subjectId)?.name ??
              "Unknown subject"
            }
            onDelete={handleDeleteExam}
          />
        ))}
      </div>
    </div>
  );
}
