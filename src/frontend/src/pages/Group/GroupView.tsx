import { EmailNew } from '@carbon/icons-react';
import { Grid, Column } from '@carbon/react';
import { BlockDetail, GoToButton, InlineDetail, LongFormatButton, SimpleCard, Stack, VerticalDivider, VerticalSocialDivider } from "components";
import AppRoutes from "navigation/AppRoutes";
import { Size } from "types/enums";
import { IGroup, IMemberDetail } from "types/types";

export type Props = {
    group: IGroup
};

export default function GroupView({ group }: Props) {
    const projectDetailsText = () => {
        const detailText = {
            0: 'This group hasn\'t worked on any projects yet',
            1: 'This group has worked on one project',
            // default: `${group.pre ?.length} groups have worked on this project`
        };

        // return detailText[project.assignedGroups?.length] || detailText['default'];
        return detailText[0];
    };

    return (
        <Grid className='project-page'>
            <Column lg={16} md={8} sm={4} className='project-page__r1'>
                <Grid className='project-page__overview-content'>
                    <Column lg={1}>
                        {/* TODO: similar group page social divider links */}
                        {/* <VerticalSocialDivider /> */}
                    </Column>
                    <Column lg={{ span: 5, offset: 2 }} md={4} sm={4} className='overview'>
                        <h1 className='project-page__heading'>{group.name}</h1>
                        <Stack>
                            <InlineDetail
                                label='Group size'
                                detail={`${group.memberInfo.count}/${group.memberInfo.max}`}
                            />
                            {/* TODO: add group metadata to API */}
                            {/* <InlineDetail label='year' detail={group.meta?.createdYear} />
                            <InlineDetail label='domain' detail={group..meta?.domain} /> */}
                        </Stack>

                        <BlockDetail label='Projects' detail={projectDetailsText()}>
                            <Stack>
                                {group.preferences &&
                                    group.preferences.map(flyweight => (
                                        <SimpleCard
                                            key={flyweight.projectId.toString()}
                                            size={Size.sm}
                                            title={flyweight.title}
                                            label='...A label...'
                                        >
                                            <GoToButton
                                                url={`${AppRoutes.project}/${flyweight.projectId}`}
                                            />
                                        </SimpleCard>
                                    ))}
                            </Stack>
                        </BlockDetail>
                        <MemberContactList members={group.memberInfo.members} />
                    </Column>
                    <Column lg={{ span: 1, offset: 8 }}>
                        <VerticalDivider />
                    </Column>
                    <Column lg={{ span: 6, offset: 10 }} md={4} sm={4}>
                        <p>{group.description}</p>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    );
}

function MemberContactList({ members }: { members: IMemberDetail[] }) {
    return (
        <BlockDetail
            label='Group members contacts'
            detail='Contact for further information'
        >
            <br />
            <Stack>
                {members.length > 0 ? members.map(member => <MemberContact member={member} />) : 'This group has no members yet'}
            </Stack>
        </BlockDetail>
    );
}

function MemberContact({ member }: { member: IMemberDetail }) {
    return (
        <LongFormatButton
            title={member.name}
            description=''
            icon={<EmailNew size={32} />}
            buttonText='Contact'
            modalHeading='Send message'
            passiveModal={false}
            handleSubmit={() => console.log('handled on contact email')}
        >
            Email {member.name}
        </LongFormatButton>
    );
}