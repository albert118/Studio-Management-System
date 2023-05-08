import { Grid, Column } from '@carbon/react';
import { IGroupApplication } from "types/types";
import { PotentialInvites } from './PotentialInvite';

export type Props = {
    user: object;
    invites: IGroupApplication[];
};

export default function NotificationsView({ user, invites }: Props) {
    return (<Grid className="notifications-page">
        <Column lg={16} md={8} sm={4} className='notifications-page__r1'>
            <PotentialInvites invites={invites} />
        </Column>
    </Grid>);
}
