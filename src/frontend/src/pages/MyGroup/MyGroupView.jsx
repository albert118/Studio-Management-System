import { ModalWrapper, Grid, Column } from '@carbon/react';
import { LongFormatButton, ManagementTile } from 'components';
import { EmailNew, Collaborate, WarningHex, Roadmap } from '@carbon/icons-react';
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
        <Grid className='mygroup-page'>
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
        <ManagementTile title='Manage your group' icon={<Collaborate size={48} />}>
            <LongFormatButton
                title='View members'
                icon={<Collaborate size={32} />}
                buttonText='View'
                modalHeading={`Members`}
                passiveModal
            >
                <MyGroupMembers memberInfo={group.memberInfo} />
            </LongFormatButton>
            <LongFormatButton
                title='Manage invites'
                icon={<Collaborate size={32} />}
                buttonText='Manage'
                modalHeading='Pending applications'
                passiveModal
            >
                <PendingApplications
                    groupApplications={groupApplications}
                    onSubmit={onSubmitPendingApplications}
                />
            </LongFormatButton>
            <LongFormatButton
                title='Invite members'
                buttonText='Invite'
                icon={<EmailNew size={32} />}
                modalHeading='Create invitations'
                handleSubmit={onSubmitInvites}
            >
                <GroupMemberInvite inviteData={invites} setInviteData={setInvites} />
            </LongFormatButton>
        </ManagementTile>
    );
}

function ProjectPreferences({ group }) {
    return (
        <ManagementTile title='Project preferences' icon={<Roadmap size={48} />}>
            {group.preferences && group.preferences.length !== 0 ? (
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
        </ManagementTile>
    );
}

function DangerZone({ group, setGroup, onSubmit }) {
    return (
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
    );
}
