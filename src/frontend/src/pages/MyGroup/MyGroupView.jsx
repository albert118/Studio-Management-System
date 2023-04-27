import { useState } from 'react';
import { ModalWrapper, Tile, Grid, Column } from '@carbon/react';
import { Stack, EmailModalButton } from 'components';
import { EmailNew, Collaborate, Edit, Exit } from '@carbon/icons-react';
import { ProjectPreferenceCard, NoProjectPreferenceCard } from './ProjectPreferenceCard';
import { EditGroup } from './EditGroup';
import { LeaveGroup } from './LeaveGroup';
import { GroupMemberInvite } from './GroupMemberInvite';
import { PendingApplications } from './PendingApplications';
import { MyGroupMembers } from './MyGroupMembers';
import { NewGroupApplicationDto } from 'types/types';
import { useGroupApplication } from 'hooks';

export default function MyGroupView({ group, updateGroup }) {
    const [editingGroup, setEditingGroup] = useState(group);
    const { groupApplication, addGroupApplication } = useGroupApplication(group.id);

    const [inviteData, setInviteData] = useState({
        studentIds: [],
        group: group.id,
        message: ''
    });

    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r1'>
                <h1 className='mygroup-page__heading'>{group.name}</h1>
                <p className='mygroup-page__p'>{group.description}</p>
            </Column>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r2'>
                <Tile className='mygroup-page__application-management'>
                    <h3>Manage your group</h3>
                    <Stack>
                        <div className='simple-card'>
                            <Collaborate size={32} />
                            <div>
                                <h5>View existing group members</h5>
                                See who's current members and contact details.
                            </div>
                            <ModalWrapper
                                buttonTriggerText='View'
                                modalHeading={group.name + ' Group Members'}
                                passiveModal
                            >
                                <MyGroupMembers memberInfo={group.memberInfo} />
                            </ModalWrapper>
                        </div>
                        <div className='simple-card'>
                            <EmailNew size={32} />
                            <div>
                                <h5>Manage group applications</h5>
                                Approve (or deny) new member applications.
                            </div>
                            <ModalWrapper
                                buttonTriggerText='View'
                                modalHeading='Pending applications'
                                passiveModal
                            >
                                <PendingApplications groupApplications={groupApplication} />
                            </ModalWrapper>
                        </div>
                        <div className='simple-card'>
                            <EmailModalButton
                                title='Invite new group members'
                                description='Create and send invitations to new members.'
                                buttonText='Invite'
                                modalHeading='Create invitations'
                                handleSubmit={async () =>
                                    await addGroupApplication(
                                        NewGroupApplicationDto(...Object.values(inviteData))
                                    )
                                }
                            >
                                <GroupMemberInvite
                                    inviteData={inviteData}
                                    setInviteData={setInviteData}
                                />
                            </EmailModalButton>
                        </div>
                    </Stack>
                </Tile>
                <Tile className='mygroup-page__project-preference-management'>
                    <h3>Project Preferences</h3>
                    <Stack>
                        {group.preferences ? (
                            group.preferences.map(preference => {
                                return (
                                    <ProjectPreferenceCard
                                        key={preference.rank}
                                        title={preference.title}
                                        rank={preference.rank}
                                        projectId={preference.projectId}
                                    />
                                );
                            })
                        ) : (
                            <NoProjectPreferenceCard />
                        )}
                    </Stack>
                </Tile>
            </Column>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r3'>
                <Tile className='mygroup-page__dangerous-management-options'>
                    <h3>Danger Zone</h3>
                    <Stack>
                        <div className='simple-card danger ghost'>
                            <Edit className='danger ghost' size={32} />
                            <div>
                                <h5>Edit your group</h5>
                                Update details such as group name.
                            </div>
                            <ModalWrapper
                                buttonTriggerText='Edit group'
                                danger
                                modalHeading='Edit group'
                                handleSubmit={async () => await updateGroup(editingGroup)}
                            >
                                <EditGroup group={editingGroup} setGroup={setEditingGroup} />
                            </ModalWrapper>
                        </div>
                        <div className='simple-card danger ghost'>
                            <Exit className='danger ghost' size={32} />
                            <div>
                                <h5>Leave your group</h5>
                                You will have to reapply to join back.
                            </div>
                            <ModalWrapper
                                buttonTriggerText='Leave group'
                                modalHeading='Leave group'
                                danger
                                primaryButtonText='Leave'
                            >
                                <LeaveGroup />
                            </ModalWrapper>
                        </div>
                    </Stack>
                </Tile>
            </Column>
        </Grid>
    );
}
