import { LoadingSpinner } from "components";
import { useGroup } from "hooks";
import GroupView from "./GroupView";
import { Navigate, useParams } from "react-router-dom";
import AppRoutes from "navigation/AppRoutes";
import { Guid } from "guid-typescript";

export default function GroupContainer() {
    const { groupId } = useParams();

    if (!groupId) {
        return <Navigate to={AppRoutes.error} replace />
    }

    const groupIdAsGuid = Guid.parse(groupId);
    if (groupIdAsGuid.isEmpty()) {
        return <Navigate to={AppRoutes.error} replace />
    }

    const { group, isLoading } = useGroup(groupIdAsGuid);

    return isLoading ? <LoadingSpinner /> : <GroupView group={group} />
}