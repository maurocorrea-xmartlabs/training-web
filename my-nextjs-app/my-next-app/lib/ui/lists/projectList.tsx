import { getProjectsBySubjectId } from "@/services/projectService";
import { ProjectItem } from "../items/projectItem/projectItem";
import { ProjectItemClientWrapper } from "../items/projectItem/projectItemClientWrapper";

type Props = {
  subjectId: number;
};

export async function ProjectList({ subjectId }: Props) {
  const projects = await getProjectsBySubjectId(subjectId);

  if (projects.length === 0) {
    return <p className="text-sm text-gray-500 italic">No projects yet</p>;
  }

  return (
    <div className="space-y-3 mt-2">
      <p className="text-md font-semibold">Projects</p>

      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectItemClientWrapper key={project.id} projectId={project.id}>
            <ProjectItem project={project} />
          </ProjectItemClientWrapper>
        ))}
      </div>
    </div>
  );
}
