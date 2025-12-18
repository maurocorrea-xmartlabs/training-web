import { useEffect, useState } from "react";
import type { Exam, NewExam } from "../../../types/exam";
import { AddExamForm } from "../../forms/addExamForm";
import { ExamItem } from "./examItem";
import {
  getExams,
  postExam,
  deleteExam,
} from "../../../controllers/examController";
import type { Subject } from "../../../types/subject";
import { getSubjects } from "../../../controllers/subjectController";

export function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  async function loadExams() {
    const newExamList = await getExams();
    setExams(newExamList || []);
  }

  async function loadSubjects() {
    const newSubjectList = await getSubjects();
    setSubjects(newSubjectList || []);
  }

  useEffect(() => {
    loadExams();
    loadSubjects();
  }, []);

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

    await postExam(newExam);
    loadExams();
  }

  async function handleDeleteExam(id: string) {
    await deleteExam(id);
    loadExams();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Exams</h2>
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
