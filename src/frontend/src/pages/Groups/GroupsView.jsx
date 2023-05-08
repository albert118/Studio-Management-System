import { Grid, Column } from '@carbon/react';
import { GroupsDataTable } from './GroupsDataTable';

export default function GroupsView({ groups }) {
    const currentSession = 'Autumn 2023';

    return (
        <Grid className='groups-page'>
            <Column lg={16} md={8} sm={4} className='groups-page__banner'>
                <h1 className='groups-page__heading'>{currentSession} Groups</h1>
                <p className='groups-page__p'>Browse all active groups</p>
                <p className='groups-page__p'>
                    Looking to create a new group? Let's get you setup!
                </p>
            </Column>
            <Column lg={16} md={8} sm={4} className='groups-page__datatable'>
                <GroupsDataTable groups={groups} />
            </Column>
        </Grid>
    );
}
