import ProjectView from './ProjectView';
import { useProject } from 'hooks/ProjectHooks';
import { Guid } from 'guid-typescript';
import { useParams } from 'react-router-dom';

export default function ProjectContainer() {
    const { projectId } = useParams();

    if (!projectId) {
        // TODO: develop an error page and handle this better
        return <div>Error! No project ID</div>;
    }

    const { project, isLoading } = useProject(Guid.parse(projectId));
    console.log(project);

    return isLoading ? <>loading...</> : <ProjectView project={project} />;
}
