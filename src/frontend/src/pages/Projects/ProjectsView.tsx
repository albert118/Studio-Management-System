import { IViewProps } from './types';

import { Grid, Column } from '@carbon/react';
import { Button } from 'carbon-components-react';

import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { ProjectsDataTable } from './ProjectsDataTable';
import useProjects from '~/hooks/ProjectHooks';

export default function ProjectsView() {
    const navigate = useNavigate();

    const currentSession = 'Autumn 2023';

    const { projects } = useProjects();

    return (
        <Grid fullwidth>
            <Column lg={16} md={8} sm={4} className='projects-page__banner'>
                <h1 className='projects-page__heading'>{currentSession} Projects</h1>
                <p className='projects-page__p'>Browse all active projects</p>
                <p className='projects-page__p'>
                    Looking to create a new project? Let's get you setup!
                </p>
                <Button
                    className='projects-page__new-project-prompt'
                    onClick={() => navigate(`${AppRoutes.projects}/add`)}
                >
                    Create a new project
                </Button>
            </Column>
            <Column lg={16} md={8} sm={4} className='projects-page__datatable'>
                <ProjectsDataTable projects={projects} />
            </Column>
        </Grid>
    );
}
