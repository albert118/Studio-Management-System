import { ModalWrapper, Tile, Grid, Column } from '@carbon/react';
import { Stack, EmailModalButton, ManagementTile } from 'components';
import { EmailNew, Collaborate, Edit, Exit, WarningHex } from '@carbon/icons-react';
import { ProjectPreferenceCard, NoProjectPreferenceCard } from './ProjectPreferenceCard';
import { EditGroup } from './EditGroup';
import { LeaveGroup } from './LeaveGroup';
import { GroupMemberInvite } from './GroupMemberInvite';
import { PendingApplications } from './PendingApplications';
import { MyGroupMembers } from './MyGroupMembers';

export default function MyGroupView({
    group,
    groupApplications,
    refreshGroup,
    inviteData,
    setInviteData,
    handleNewApplication,
    editingGroup,
    setEditingGroup,
    handleGroupUpdate
}) {
    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r1'>
                <h1 className='mygroup-page__heading'>{group.name}</h1>
                <p className='mygroup-page__p'>{group.description}</p>
            </Column>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r2'>
                <ManageGroup
                    group={group}
                    groupApplications={groupApplications}
                    onSubmitPendingApplications={refreshGroup}
                    invites={inviteData}
                    setInvites={setInviteData}
                    onSubmitInvites={handleNewApplication}
                />
                <ProjectPreferences group={group} />
            </Column>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r3'>
                <DangerZone
                    group={editingGroup}
                    setGroup={setEditingGroup}
                    onSubmit={handleGroupUpdate}
                />
            </Column>
        </Grid>
    );
}

function ManageGroup({
    group,
    groupApplications,
    onSubmitPendingApplications,
    invites,
    setInvites,
    onSubmitInvites
}) {
    return (
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
                        modalHeading={`${group.name} Group Members`}
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
                        <PendingApplications
                            groupApplications={groupApplications}
                            onSubmit={onSubmitPendingApplications}
                        />
                    </ModalWrapper>
                </div>
                <div className='simple-card'>
                    <EmailModalButton
                        title='Invite new group members'
                        description='Create and send invitations to new members.'
                        buttonText='Invite'
                        modalHeading='Create invitations'
                        handleSubmit={onSubmitInvites}
                    >
                        <GroupMemberInvite inviteData={invites} setInviteData={setInvites} />
                    </EmailModalButton>
                </div>
            </Stack>
        </Tile>
    );
}

function ProjectPreferences({ group }) {
    return (
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
    );
}

function DangerZone({ group, setGroup, onSubmit }) {
    return (
        <Tile className='mygroup-page__dangerous-management-options'>
            <ManagementTile
                title='Danger zone'
                className='danger ghost'
                icon={<WarningHex size={48} />}
            >
                <ModalWrapper
                    buttonTriggerText='Edit group'
                    danger
                    modalHeading='Edit group'
                    handleSubmit={onSubmit}
                >
                    <EditGroup group={group} setGroup={setGroup} />
                </ModalWrapper>

                <ModalWrapper
                    buttonTriggerText='Leave group'
                    modalHeading='Leave group'
                    danger
                    primaryButtonText='Leave'
                >
                    <LeaveGroup />
                </ModalWrapper>
            </ManagementTile>

            {/* <div className='simple-card danger ghost'>
                    <Edit className='danger ghost' size={32} />
                    <div>
                        <h5>Edit your group</h5>
                        Update details such as group name.
                    </div>
                    <ModalWrapper
                        buttonTriggerText='Edit group'
                        danger
                        modalHeading='Edit group'
                        handleSubmit={onSubmit}
                    >
                        <EditGroup group={group} setGroup={setGroup} />
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
                </div> */}
        </Tile>
    );
}
