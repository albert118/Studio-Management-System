import AddGroupView from './AddGroupView';
import { NewGroupDto } from './types';

export default function AddGroupContainer() {
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

    const saveGroup = async (group: NewGroupDto) => {
        console.log(JSON.stringify(group));
    };

    return <AddGroupView availableProjects={availableProjects} saveGroup={saveGroup} />;
}
