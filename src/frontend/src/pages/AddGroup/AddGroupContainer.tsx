import AddGroupView from './AddGroupView';
import { useProjects } from 'hooks';
import { LoadingSpinner } from 'components'

export default function AddGroupContainer() {
    const { projects, isLoading } = useProjects();

    return isLoading ? <LoadingSpinner/> : <AddGroupView availableProjects={projects} />;
}
