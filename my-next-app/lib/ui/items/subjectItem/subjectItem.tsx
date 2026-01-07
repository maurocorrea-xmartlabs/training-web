import type { Subject } from "@/generated/prisma/client";
import { AddProjectForm } from "../../forms/addProjectForm";
import { ProjectList } from "../../lists/projectList";

type Props = {
  subject: Subject;
};

export function SubjectItem({ subject }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{subject.name}</h3>
      <p className="text-sm text-gray-500">
        Monthly cost: ${subject.monthlyCost}
      </p>
      <AddProjectForm subjectId={subject.id} />
      <ProjectList subjectId={subject.id} />
    </div>
  );
}
