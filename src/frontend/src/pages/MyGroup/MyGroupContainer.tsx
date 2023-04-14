import MyGroupView from './MyGroupView';
import { useGroup } from 'hooks/GroupHooks';
import { useParams } from 'react-router-dom';

export default function MyGroupContainer() {
    const { groupId } = useParams();

    if (!groupId) {
        // TODO: develop an error page and handle this better
        return <div>Error! No group ID</div>;
    }

    const { group, updateGroup, isLoading } = useGroup(groupId);

    // TODO: add a spinner
    return isLoading ? 'loading...' : <MyGroupView group={group} updateGroup={updateGroup} />;
}
