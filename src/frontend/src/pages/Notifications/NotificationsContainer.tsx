import { useGroupApplicationsForStudent, useSession } from "hooks";
import { default as NotificationsView } from './NotificationsView';
import { LoadingSpinner } from "components";

export default function NotificationsContainer() {
    const { user, updateGroup } = useSession();
    const { potentialInvites, rejectInvites, acceptInvite, isLoading } = useGroupApplicationsForStudent(user.id);

    // allows the datatable to automatically provide keys
    const preparedInviteData = potentialInvites.map(i => { return { id: i.inviteId, ...i } })

    const accept = async (selectedRows: any[]) => {
        if (!selectedRows || selectedRows.length === 0) {
            console.warn('no rows were found when attempting to accept an invite, so none will be accepted');
            return;
        }

        if (selectedRows.length > 1) {
            console.warn("attempted to accept an extra invite, only the first of several will be considered");
        }

        const groupId = await acceptInvite(selectedRows[0].id);
        if (groupId) {
            updateGroup(groupId);
        }
    };

    const batchReject = async (selectedRows: any[]) => {
        if (!selectedRows || selectedRows.length === 0) {
            console.warn('no rows were found when attempting to reject invites, so none will be rejected');
            return;
        }

        await rejectInvites(selectedRows.map(r => r.id));
    };

    return (isLoading
        ? <LoadingSpinner />
        : <NotificationsView invites={preparedInviteData} batchReject={batchReject} acceptInvite={accept} hasGroup={false} />
    );
}