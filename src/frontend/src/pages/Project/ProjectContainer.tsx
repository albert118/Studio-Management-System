import ProjectView from './ProjectView';
import { useProject } from 'hooks/ProjectHooks';
import { Guid } from 'guid-typescript';
import { Navigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from 'components';
import AppRoutes from 'navigation/AppRoutes';

export default function ProjectContainer() {
    const { projectId } = useParams();

    if (!projectId) {
        return <Navigate to={AppRoutes.error} replace />
    }

    const projectIdAsGuid = Guid.parse(projectId);
    if (projectIdAsGuid.isEmpty()) {
        return <Navigate to={AppRoutes.error} replace />
    }

    const { project, isLoading } = useProject(projectIdAsGuid);

    return isLoading ? <LoadingSpinner /> : <ProjectView project={project} />;
}
