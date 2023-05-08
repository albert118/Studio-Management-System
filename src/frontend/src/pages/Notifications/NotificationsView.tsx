import { Grid, Column } from '@carbon/react';
import { IPotentialInvite } from "types/types";
import { PotentialInvites } from './PotentialInvite';

export type Props = {
    invites: IPotentialInvite[];
};

export default function NotificationsView({ invites }: Props) {
    return (<Grid className="notifications-page">
        <Column lg={16} md={8} sm={4} className='notifications-page__r1'>
            <PotentialInvites invites={invites} />
        </Column>
    </Grid>);
}
