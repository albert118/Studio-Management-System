import { useState } from 'react';
import { NewGroupApplicationDto } from 'types/types';
import { useGroupApplications, useGroup } from 'hooks';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { Guid } from 'guid-typescript';
import { LoadingSpinner } from 'components';
import MyGroupView from './MyGroupView';

export default function MyGroupContainer() {
    const { groupId } = useParams();
    const navigate = useNavigate();

    if (!groupId) {
        return <Navigate to={AppRoutes.error} />
    }

    const groupIdAsGuid = Guid.parse(groupId);

    const { group, updateGroup, leaveGroup, isLoading, refreshGroup } = useGroup(groupIdAsGuid);
    const { groupApplications, addGroupApplication } = useGroupApplications(groupIdAsGuid);

    const [editingGroup, setEditingGroup] = useState(group);
    const [invite, setInvite] = useState(NewGroupApplicationDto([], groupIdAsGuid, ''));

    const handleNewApplication = async () => {
        // @ts-ignore
        const submittedSuccessfully = await addGroupApplication(invite)

        if (submittedSuccessfully) {
            setInvite(NewGroupApplicationDto([], groupIdAsGuid, ''));
            await refreshGroup();
            window.location.reload();
        }
    };

    const handleGroupUpdate = async () => {
        await updateGroup(editingGroup);
        await refreshGroup();
        window.location.reload();
    };

    const onLeave = async () => {
        if (await leaveGroup()) {
            navigate(AppRoutes.root);
        }
    };

    return (
        isLoading
            ? <LoadingSpinner />
            : <MyGroupView
                group={group}
                groupApplications={groupApplications}
                refreshGroup={refreshGroup}
                inviteData={invite}
                setInviteData={setInvite}
                handleNewApplication={handleNewApplication}
                editingGroup={editingGroup}
                setEditingGroup={setEditingGroup}
                handleGroupUpdate={handleGroupUpdate}
                onLeave={onLeave}
            />
    );
}
