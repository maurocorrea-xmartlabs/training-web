import { SimpleDropzone } from "@/lib/ui/dropzones/basicDropzone";
import { ResourceList } from "@/lib/ui/lists/resourceList";
import { getSubjects } from "@/services/subjectService";

export default async function resources() {
  const subjects = await getSubjects();
  return (
    <div>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Upload or check some relevant resources for your subjects!
        </h1>
        <h2>Upload a resource</h2>
        <SimpleDropzone subjects={subjects} />
        <h2>Available resources</h2>
        <ResourceList subjects={subjects} />
      </div>
    </div>
  );
}
