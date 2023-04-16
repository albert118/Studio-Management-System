import { Grid, Column } from '@carbon/react';
import AppRoutes from 'navigation/AppRoutes';
import {
    Stack,
    InlineDetail,
    BlockDetail,
    SimpleCard,
    GoToButton,
    VerticalDivider
} from 'components';

import { Size } from 'types/enums';

export default function ProjectView({ project }) {
    return (
        <Grid className='project-page'>
            <Column lg={16} md={8} sm={4} className='project-page__r1'>
                <h1 className='project-page__heading'>{project.title}</h1>
            </Column>
            <Column lg={16} md={8} sm={4} className='project-page__r2'>
                <Grid className='project-page__overview-content'>
                    <Column lg={7} md={4} sm={4} className='overview'>
                        <Stack>
                            <InlineDetail label='title' detail={project.title} />
                            <InlineDetail label='owners' detail={project.owners?.join(', ')} />
                            <InlineDetail label='year' detail={project.meta?.createdYear} />
                            <InlineDetail label='domain' detail={project.meta?.domain} />
                        </Stack>

                        <BlockDetail
                            label='Groups'
                            detail={`${project.assignedGroups?.length} groups have worked on this project.`}
                        >
                            <Stack>
                                {project.assignedGroups &&
                                    project.assignedGroups.map(flyweight => (
                                        <SimpleCard
                                            key={flyweight.groupId}
                                            size={Size.sm}
                                            title={flyweight.name}
                                            label='...A label...'
                                        >
                                            <GoToButton
                                                url={`${AppRoutes.group}/${flyweight.groupId}`}
                                            />
                                        </SimpleCard>
                                    ))}
                            </Stack>
                        </BlockDetail>
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
