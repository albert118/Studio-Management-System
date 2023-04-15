import { Grid, Column } from '@carbon/react';
import { Button } from '@carbon/react';

import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { ProjectsDataTable } from './ProjectsDataTable';

export default function ProjectsView({ projects }) {
    const navigate = useNavigate();

    const currentSession = 'Autumn 2023';

    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className='projects-page__banner'>
                <h1 className='projects-page__heading'>{currentSession} Projects</h1>
                <p className='projects-page__p'>Browse all active projects</p>
                <p className='projects-page__p'>
                    Looking to create a new project? Let's get you setup!
                </p>
                {/* remove this once the admin interface is added */}
                <Button
                    className='projects-page__new-project-prompt'
                    onClick={() => navigate(`${AppRoutes.projects}/add`)}
                    kind='ghost'
                >
                    (*temp) Create a new project
                </Button>
            </Column>
            <Column lg={16} md={8} sm={4} className='projects-page__datatable'>
                <ProjectsDataTable projects={projects} />
            </Column>
        </Grid>
    );
}
