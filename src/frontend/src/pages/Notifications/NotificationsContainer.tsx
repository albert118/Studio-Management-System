import { useGroupApplicationsForStudent, useSession } from "hooks";
import { default as NotificationsView } from './NotificationsView';
import { Guid } from "guid-typescript";

export default function NotificationsContainer() {
    const { user } = useSession();
    const { studentApplications } = useGroupApplicationsForStudent(Guid.parse(user.id));

    return <NotificationsView user={user} invites={studentApplications} />
}