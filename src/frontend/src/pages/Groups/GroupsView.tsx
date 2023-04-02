import { IViewProps } from './types';

import { Grid, Column } from '@carbon/react';
import { Button } from 'carbon-components-react';

import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { GroupsDataTable } from './GroupsDataTable';
import useGroups from '~/hooks/GroupHooks';

// TODO
// <Breadcrumb noTrailingSlash>
//     <BreadcrumbItem>
//         <a href={AppRoutes.root}>Project</a>
//     </BreadcrumbItem>
// </Breadcrumb>

export default function GroupsView() {
    const navigate = useNavigate();

    const currentSession = 'Autumn 2023';

    const { groups } = useGroups();

    return (
        <Grid fullwidth>
            <Column lg={16} md={8} sm={4} className='groups-page__banner'>
                <h1 className='groups-page__heading'>{currentSession} Groups</h1>
                <p className='groups-page__p'>Browse all active groups</p>
                <p className='groups-page__p'>
                    Looking to create a new group? Let's get you setup!
                </p>
                <Button
                    className='groups-page__new-group-prompt'
                    onClick={() => navigate(`${AppRoutes.groups}/add`)}
                >
                    Create a new group
                </Button>
            </Column>
            <Column lg={16} md={8} sm={4} className='groups-page__datatable'>
                <GroupsDataTable groups={groups} />
            </Column>
        </Grid>
    );
}
