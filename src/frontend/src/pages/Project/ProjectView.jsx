import { Grid, Column } from '@carbon/react';
import AppRoutes from 'navigation/AppRoutes';
import {
    Stack,
    InlineDetail,
    BlockDetail,
    SimpleCard,
    GoToButton,
    VerticalDivider,
    VerticalSocialDivider,
    EmailModalButton
} from 'components';

import { Size } from 'types/enums';

export default function ProjectView({ project }) {
    const groupsDetailText = () => {
        const detailText = {
            0: 'No one has worked on this project yet',
            1: 'Only one group has worked on this project',
            default: `${project.assignedGroups?.length} groups have worked on this project`
        };

        return detailText[project.assignedGroups?.length] || detailText['default'];
    };

    return (
        <Grid className='project-page'>
            <Column lg={16} md={8} sm={4} className='project-page__r1'>
                <Grid className='project-page__overview-content'>
                    <Column lg={1}>
                        <VerticalSocialDivider />
                    </Column>
                    <Column lg={{ span: 5, offset: 2 }} md={4} sm={4} className='overview'>
                        <h1 className='project-page__heading'>{project.title}</h1>
                        <Stack>
                            <InlineDetail
                                label='owners'
                                detail={project.owners.map(owner => owner.name).join(', ')}
                            />
                            <InlineDetail label='year' detail={project.meta?.createdYear} />
                            <InlineDetail label='domain' detail={project.meta?.domain} />
                        </Stack>

                        <BlockDetail label='Groups' detail={groupsDetailText()}>
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

                        <BlockDetail
                            label='Product Owners'
                            detail='Contact these stakeholders for further information'
                        >
                            <Stack>
                                <EmailModalButton
                                    title='Product Owner(s)'
                                    description=''
                                    buttonText='Contact'
                                    modalHeading='Create email'
                                >
                                    this
                                </EmailModalButton>

                                <EmailModalButton
                                    title='Industry sponsor'
                                    description=''
                                    buttonText='Contact'
                                    modalHeading='Create email'
                                >
                                    this
                                </EmailModalButton>

                                <EmailModalButton
                                    title='Previous group(s)'
                                    description=''
                                    buttonText='Contact'
                                    modalHeading='Create email'
                                >
                                    this
                                </EmailModalButton>
                            </Stack>
                        </BlockDetail>
                    </Column>
                    <Column lg={{ span: 1, offset: 8 }}>
                        <VerticalDivider />
                    </Column>
                    <Column lg={{ span: 6, offset: 10 }} md={4} sm={4}>
                        <p>{project.description}</p>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    );
}
