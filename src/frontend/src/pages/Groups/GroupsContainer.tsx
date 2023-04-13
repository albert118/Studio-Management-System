import useGroups from 'hooks/GroupHooks';
import GroupsView from './GroupsView';

export default function GroupsContainer() {
    const { groups } = useGroups();

    return <GroupsView groups={groups} />;
}
