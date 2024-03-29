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
    const projectDetailsText = (idx: number) => {
        return !idx || idx === 0 ? 'This group hasn\'t added any preferences just yet' : '';
    };

    const indexString = (idx: number) => {
        return {
            1: '1st',
            2: '2nd',
            3: '3rd',
        }[idx + 1]
    };

    const truncate = (input: string, limit = 1000) => `${input.substring(0, limit)}...`;

    return (
        <Grid className='project-page'>
            <Column lg={16} md={8} sm={4} className='project-page__r1'>
                <Grid className='project-page__overview-content'>
                    <Column lg={1}>
                        <VerticalSocialDivider onClickFigma={null} onClickGitHub={null} onClickJupyter={null} />
                    </Column>
                    <Column lg={{ span: 5, offset: 2 }} md={4} sm={4} className='overview'>
                        <h1 className='project-page__heading'>{group.name}</h1>
                        <Stack>
                            <InlineDetail
                                label='Group size'
                                detail={`${group.memberInfo.count}/${group.memberInfo.max}`}
                            />
                            <InlineDetail label='year' detail={group.meta?.createdYear} />
                        </Stack>

                        <BlockDetail label='Project preferences' detail={projectDetailsText(group.preferences.length)}>
                            <Stack>
                                {group.preferences &&
                                    group.preferences.map((flyweight, idx) => (
                                        <SimpleCard
                                            key={flyweight.projectId.toString()}
                                            size={Size.sm}
                                            title={flyweight.title}
                                            label={`${indexString(idx)} preference`}
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
                        <p>{truncate(group.description)}</p>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    );
}

function MemberContactList({ members }: { members: IMemberDetail[] }) {
    return (
        <BlockDetail
            label='Group member contacts'
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