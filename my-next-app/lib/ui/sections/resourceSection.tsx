import type { Subject } from "@/generated/prisma/client";
import { ResourceItem } from "../items/resourceItem/resourceItem";
import { getResourcesBySubjectAction } from "@/app/(app)/resources/action";

type Props = {
  subject: Subject;
};

export async function ResourceSection({ subject }: Props) {
  const result = await getResourcesBySubjectAction(subject.id);

  if (!result.ok || result.data.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h3 className="font-medium text-lg">{subject.name}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {result.data.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
