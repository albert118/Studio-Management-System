import { useProjects } from 'hooks';
import { IProject } from 'types/types';
import ProjectsView from './ProjectsView';

export default function ProjectsContainer() {
    const { projects } = useProjects();

    const prepareProjects = (projects: IProject[]) => {
        return projects.map(project => {
            return {
                ...project,
                ownerNames: project.owners.map(owner => owner.name).join(', '),
                principalOwnerName: project.principalOwner.name
            };
        });
    };

    return <ProjectsView projects={prepareProjects(projects)} />;
}
