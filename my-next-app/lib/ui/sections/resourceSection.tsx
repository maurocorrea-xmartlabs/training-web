import type { Subject } from "@/generated/prisma/client";
import { getFilesBySubject } from "@/services/s3Service";
import { ResourceItem } from "../items/resourceItem/resourceItem";

type Props = {
  subject: Subject;
};

export async function ResourceSection({ subject }: Props) {
  const resources = await getFilesBySubject(subject.id);

  if (resources.length === 0) return null;

  return (
    <section className="space-y-3">
      <h3 className="font-medium text-lg">{subject.name}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
