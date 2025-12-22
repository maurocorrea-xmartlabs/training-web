"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Subject } from "@/generated/prisma/client";
import {
  getSubjects,
  postSubject,
  deleteSubject as deleteSubjectApi,
} from "../controllers/subjectController";

type SubjectsContextType = {
  subjects: Subject[];
  reloadSubjects: () => Promise<void>;
  addSubject: (name: string, monthlyCost: number) => Promise<void>;
  deleteSubject: (id: number) => Promise<void>;
};

const SubjectsContext = createContext<SubjectsContextType | null>(null);

export function SubjectsProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  async function reloadSubjects() {
    const data = await getSubjects();
    if (data) setSubjects(data);
  }

  async function addSubject(name: string, monthlyCost: number) {
    await postSubject({ name, monthlyCost });
    await reloadSubjects();
  }

  async function deleteSubject(id: number) {
    await deleteSubjectApi(id);
    await reloadSubjects();
  }

  useEffect(() => {
    reloadSubjects();
  }, []);

  return (
    <SubjectsContext.Provider
      value={{ subjects, reloadSubjects, addSubject, deleteSubject }}
    >
      {children}
    </SubjectsContext.Provider>
  );
}

export function useSubjects() {
  const ctx = useContext(SubjectsContext);
  if (!ctx) throw new Error("useSubjects must be inside SubjectsProvider");
  return ctx;
}
