import { IViewProps } from './types';

import { Grid, Column } from '@carbon/react';
import { Button, Breadcrumb, BreadcrumbItem } from 'carbon-components-react';

import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';

function _GroupsView({ groups }: IViewProps) {
    return (
        <div>
            <div className='bx--row landing-page__banner'>
                <div className='bx--col-lg-16'>
                    <Breadcrumb noTrailingSlash>
                        <BreadcrumbItem>
                            <a href={AppRoutes.root}>Project</a>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className='landing-page__heading'>Groups</h1>
                </div>
            </div>
        </div>
    );
}

export default function GroupsView({ groups }: IViewProps) {
    const navigate = useNavigate();

    return (
        <Grid fullwidth>
            <Column lg={16} md={8} sm={4} className='groups-page__banner'>
                <h1 className='groups-page__heading'>All Projects</h1>
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
            <Column lg={16} md={8} sm={4} className='groups-page__table'>
                IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS
                IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS
                IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS IM IN YOUR WALLS
            </Column>
        </Grid>
    );
}
