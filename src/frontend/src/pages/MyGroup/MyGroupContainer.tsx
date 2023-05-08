import { useState } from 'react';
import { NewGroupApplicationDto } from 'types/types';
import { useGroupApplications, useGroup } from 'hooks';
import { Navigate, useParams } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { Guid } from 'guid-typescript';
import { LoadingSpinner } from 'components';
import MyGroupView from './MyGroupView';

const getDefaultInviteData = (groupId: Guid): NewGroupApplicationDto => {
    return {
        studentIds: [],
        groupId: groupId,
        message: ''
    };
}

export default function MyGroupContainer() {
    const { groupId } = useParams();

    if (!groupId) {
        return <Navigate to={AppRoutes.error} />
    }

    const { group, updateGroup, isLoading, refreshGroup } = useGroup(Guid.parse(groupId));
    const [editingGroup, setEditingGroup] = useState(group);
    const { groupApplications, addGroupApplication } = useGroupApplications(group.id);
    const [inviteData, setInviteData] = useState(getDefaultInviteData(group.id));

    const handleNewApplication = async () => {
        // @ts-ignore
        const submittedSuccessfully = await addGroupApplication(NewGroupApplicationDto(...Object.values(inviteData)))

        if (submittedSuccessfully) {
            setInviteData(getDefaultInviteData(group.id));
            await refreshGroup();
            window.location.reload();
        }
    };

    const handleGroupUpdate = async () => {
        await updateGroup(editingGroup);
        await refreshGroup();
    };

    return (
        isLoading
            ? <LoadingSpinner />
            : <MyGroupView
                group={group}
                groupApplications={groupApplications}
                refreshGroup={refreshGroup}
                inviteData={inviteData}
                setInviteData={setInviteData}
                handleNewApplication={handleNewApplication}
                editingGroup={editingGroup}
                setEditingGroup={setEditingGroup}
                handleGroupUpdate={handleGroupUpdate}
            />
    );
}
