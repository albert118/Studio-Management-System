import MyGroupView from './MyGroupView';
import { useGroup } from 'hooks/GroupHooks';
import { useParams } from 'react-router-dom';
import { Guid } from 'guid-typescript';
import { LoadingSpinner } from 'components';
import { Navigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';

export default function MyGroupContainer() {
    const { groupId } = useParams();

    if (!groupId) {
        return <Navigate to={AppRoutes.error} />
    }

    const { group, updateGroup, isLoading, refreshGroup } = useGroup(Guid.parse(groupId));

    return isLoading ? <LoadingSpinner /> : <MyGroupView group={group} updateGroup={updateGroup} refreshGroup={refreshGroup} />;
}
