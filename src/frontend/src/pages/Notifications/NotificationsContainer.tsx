import { useGroupApplicationsForStudent, useSession } from "hooks";
import { default as NotificationsView } from './NotificationsView';
import { Guid } from "guid-typescript";

export default function NotificationsContainer() {
    const { user } = useSession();
    const { potentialInvites } = useGroupApplicationsForStudent(Guid.parse(user.id));

    // allows the datatable to automatically provide keys
    const preparedInviteData = potentialInvites.map(i => { return { id: i.inviteId, ...i } })

    return <NotificationsView invites={preparedInviteData} />
}