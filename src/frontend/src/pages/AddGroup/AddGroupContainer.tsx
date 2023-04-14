import { NewGroupDto } from 'types/types';
import AddGroupView from './AddGroupView';
import useGroups from 'hooks/GroupHooks';

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
    const { addGroup } = useGroups();
    const saveGroup = async (group: NewGroupDto) => {
        console.log(JSON.stringify(group));
        await addGroup(group);
    };

    return <AddGroupView availableProjects={availableProjects} saveGroup={saveGroup} />;
}
