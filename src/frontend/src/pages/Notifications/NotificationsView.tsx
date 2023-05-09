import { Grid, Column } from '@carbon/react';
import { IPotentialInvite } from "types/types";
import { PotentialInvites } from './PotentialInvites';
import { Stack } from 'components';

export type Props = {
    invites: IPotentialInvite[];
    batchReject: Function;
    acceptInvite: Function;
    hasGroup: boolean;
};

export default function NotificationsView({ invites, batchReject, acceptInvite, hasGroup }: Props) {
    return (<Grid className="notifications-page">
        <Column lg={16} md={8} sm={4} className='notifications-page__r1'>
            {
                invites && invites.length > 0
                    ? <PotentialInvites invites={invites} batchReject={batchReject} acceptInvite={acceptInvite} />
                    : <NoInvites hasGroup={hasGroup} />
            }
        </Column>
    </Grid>);
}

function NoInvites({ hasGroup }: { hasGroup: boolean }) {
    return (
        <Stack>
            <h3>
                {hasGroup ? 'You\'ve already joined a group, so we\'ve cleaned up any remaining invites' : 'No invites just yet'}
            </h3>
        </Stack>
    );
}