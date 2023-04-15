import { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import AppRoutes from 'navigation/AppRoutes';
import { Stack, SimpleCard, GoToButton, VerticalDivider } from 'components';

export default function ProjectContainer() {
    const [project, setProject] = useState({
        name: 'Special Project',
        description: 'lorem ipsum',
        owners: ['Smith', 'John', 'Alex'],
        assignedGroups: [
            { id: 123, name: 'Group #1' },
            { id: 123, name: 'Group #2' },
            { id: 123, name: 'Group #3' }
        ]
    });

    return (
        <Grid className='project-page'>
            <Column lg={16} md={8} sm={4} className='project-page__r1'>
                <h1 className='project-page__heading'>{project.name}</h1>
            </Column>
            <Column lg={16} md={8} sm={4} className='project-page__r2'>
                <Grid className='project-page__overview-content'>
                    <Column lg={7} md={4} sm={4} className='overview'>
                        <label>Description</label>
                        <p>{project.description}</p>

                        <label>Groups</label>
                        <Stack>
                            {project?.assignedGroups &&
                                project.assignedGroups.map(group => (
                                    <SimpleCard title={group.name} label='X'>
                                        <GoToButton url={`${AppRoutes.group}/${group.id}`} />
                                    </SimpleCard>
                                ))}
                        </Stack>
                    </Column>
                    <Column lg={{ span: 1, offset: 7 }}>
                        <VerticalDivider />
                    </Column>
                    <Column lg={{ span: 8, offset: 8 }} md={4} sm={4}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cupiditate,
                            eum odio sapiente incidunt ratione sint, vitae inventore, amet molestias
                            eveniet dolorum eligendi a veniam ut quae atque aspernatur aliquam?
                        </p>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    );
}
