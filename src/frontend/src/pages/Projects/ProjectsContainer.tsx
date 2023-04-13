import useProjects from 'hooks/ProjectHooks';
import ProjectsView from './ProjectsView';

export default function ProjectsContainer() {
    const { projects } = useProjects();

    return <ProjectsView projects={projects} />;
}
