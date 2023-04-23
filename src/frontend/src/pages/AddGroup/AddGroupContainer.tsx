import AddGroupView from './AddGroupView';
import { useProjects } from 'hooks';

export default function AddGroupContainer() {
    const { projects, isLoading } = useProjects();

    // TODO: add a spinner
    return isLoading ? <>loading...</> : <AddGroupView availableProjects={projects} />;
}
