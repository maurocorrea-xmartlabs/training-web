import type { Subject } from "@/generated/prisma/client";
import { ResourceSection } from "../sections/resourceSection";

type Props = {
  subjects: Subject[];
};

export async function ResourceList({ subjects }: Props) {
  if (subjects.length === 0) {
    return <p className="text-sm text-gray-500 italic">No subjects yet</p>;
  }

  return (
    <div className="space-y-6 mt-6">
      {subjects.map((subject) => (
        <ResourceSection key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
