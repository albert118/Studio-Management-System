import { NewGroupDto } from 'types/types';
import AddGroupView from './AddGroupView';

const availableProjects = [
    {
        id: '1',
        description: 'Apple Inc.'
    },
    {
        id: '2',
        description: 'Microsft Corp.'
    },
    {
        id: '3',
        description: 'IBM'
    }
];
export default function AddGroupContainer() {
    return <AddGroupView availableProjects={availableProjects} />;
}
