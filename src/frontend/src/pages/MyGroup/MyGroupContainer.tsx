import { useState } from 'react';
import { NewGroupApplicationDto } from 'types/types';
import { useGroupApplications, useGroup } from 'hooks';
import { Navigate, useParams } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { Guid } from 'guid-typescript';
import { LoadingSpinner } from 'components';
import MyGroupView from './MyGroupView';

export default function MyGroupContainer() {
    const { groupId } = useParams();

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
                leaveGroup={leaveGroup}
            />
    );
}
