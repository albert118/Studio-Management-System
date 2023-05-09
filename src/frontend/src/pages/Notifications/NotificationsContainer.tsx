import { useGroupApplicationsForStudent, useSession } from "hooks";
import { default as NotificationsView } from './NotificationsView';
import { Guid } from "guid-typescript";
import { LoadingSpinner } from "components";

export default function NotificationsContainer() {
    const { user } = useSession();
    const { potentialInvites, isLoading } = useGroupApplicationsForStudent(Guid.parse(user.id));

    // allows the datatable to automatically provide keys
    const preparedInviteData = potentialInvites.map(i => { return { id: i.inviteId, ...i } })

    return isLoading ? <LoadingSpinner /> : <NotificationsView invites={preparedInviteData} />
}