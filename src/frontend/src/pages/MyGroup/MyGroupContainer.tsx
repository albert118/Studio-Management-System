import { useState } from 'react';
import { NewGroupApplicationDto } from 'types/types';
import { useGroupApplications, useGroup } from 'hooks';
import { Navigate, useParams } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { Guid } from 'guid-typescript';
import { LoadingSpinner } from 'components';
import MyGroupView from './MyGroupView';
import { getDefaultInviteData } from './helpers';

export default function MyGroupContainer() {
    const { groupId } = useParams();

    if (!groupId) {
        return <Navigate to={AppRoutes.error} />
    }

    const { group, updateGroup, isLoading, refreshGroup } = useGroup(Guid.parse(groupId));
    const { groupApplications, addGroupApplication } = useGroupApplications(group.id);

    const [editingGroup, setEditingGroup] = useState(group);
    const [invite, setInvite] = useState(getDefaultInviteData(group.id));

    const handleNewApplication = async () => {
        // @ts-ignore
        const submittedSuccessfully = await addGroupApplication(NewGroupApplicationDto(...Object.values(invite)))

        if (submittedSuccessfully) {
            setInvite(getDefaultInviteData(group.id));
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
            />
    );
}
