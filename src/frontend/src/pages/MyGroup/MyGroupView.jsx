import {
    ModalWrapper,
    Tile,
    Grid,
    Column,
    MultiSelect,
    Form,
    TextArea,
    TextInput
} from '@carbon/react';
import { Stack } from 'components/Forms';
import { MailAll, EmailNew, Collaborate, Edit, Exit } from '@carbon/icons-react';
import { ProjectPreferenceCard } from './ProjectPreferenceCard';
import { FormContainer } from 'components/Forms';

export default function MyGroupView({ myGroup }) {
    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r1'>
                <h1 className='mygroup-page__heading'>{myGroup.name}</h1>
                <p className='mygroup-page__p'>{myGroup.description}</p>
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
                                modalHeading='Group members'
                                passiveModal
                            >
                                <MyGroupMembers members={myGroup.memberInfo.members} />
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
                                <PendingApplications />
                            </ModalWrapper>
                        </div>
                        <div className='simple-card'>
                            <MailAll size={32} />
                            <div>
                                <h5>Invite new group members</h5>
                                Create and send invitations to new members.
                            </div>
                            <ModalWrapper
                                buttonTriggerText='Invite'
                                modalHeading='Create invitations'
                                primaryButtonText='Send invitations'
                            >
                                <GroupMemberInvite />
                            </ModalWrapper>
                        </div>
                    </Stack>
                </Tile>
                <Tile className='mygroup-page__project-preference-management'>
                    <h3>Project Preferences</h3>
                    <Stack>
                        {myGroup.preferences.map(preference => {
                            return (
                                <ProjectPreferenceCard
                                    key={preference.rank}
                                    title={preference.title}
                                    rank={preference.rank}
                                    projectId={preference.projectId}
                                />
                            );
                        })}
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
                            >
                                <EditGroup />
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

function MyGroupMembers({ members }) {
    return (
        <Stack>
            {members.map((member, idx) => (
                <span key={idx}>{member}</span>
            ))}
        </Stack>
    );
}

function PendingApplications() {
    return (
        <Stack>
            <div className='simple-card invitation'>
                <p>Jeremy would like to join the group</p>
                <p>Hi you're group looked cool!</p>
            </div>
        </Stack>
    );
}

function GroupMemberInvite() {
    return (
        <Stack>
            <FormContainer>
                <Column lg={16} md={8} sm={4} className='__form-prompt'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus id,
                        consequuntur corporis quibusdam magni quos eaque commodi in dicta voluptatum
                        omnis? Eos ullam assumenda tempora. Earum sapiente dolorem eveniet
                        accusamus?
                    </p>
                </Column>
                <Column lg={16} md={8} sm={4}>
                    <Form onSubmit={e => console.log(e)}>
                        <Stack>
                            <MultiSelect
                                helperText='You can select up to as many as your group can fit'
                                name='invitees'
                                id='invitees'
                                titleText='Invitees'
                                label='Create multiple invites by selecting multiple people'
                                items={['Abbey', 'Mark', 'Melody']}
                            />
                            <TextArea
                                helperText='Add a message with your invite (optional)'
                                name='invitation-message'
                                id='invitation-message'
                                labelText='Message (optional)'
                                placeholder='Optionally include a message with your invitation'
                                rows={2}
                                maxLength={100}
                            />
                        </Stack>
                    </Form>
                </Column>
            </FormContainer>
        </Stack>
    );
}

function EditGroup() {
    return (
        <Stack>
            <FormContainer>
                <Column lg={16} md={8} sm={4} className='__form-prompt'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus id,
                        consequuntur corporis quibusdam magni quos eaque commodi in dicta voluptatum
                        omnis? Eos ullam assumenda tempora. Earum sapiente dolorem eveniet
                        accusamus?
                    </p>
                </Column>
                <Column lg={16} md={8} sm={4}>
                    <Form onSubmit={e => console.log(e)}>
                        <Stack>
                            <TextInput
                                helperText='Make sure to add a memorable group name'
                                name='name'
                                id='name'
                                labelText='Group name'
                                placeholder='Add a memorable and unique group name'
                                invalidText='A group name is required to create a new group'
                                maxLength={50}
                            />
                            <TextArea
                                helperText='Optional, this will will appear when people view your group details'
                                name='description'
                                id='description'
                                labelText='Description (optional)'
                                placeholder='Add an optional description of your group'
                                rows={4}
                            />
                        </Stack>
                    </Form>
                </Column>
            </FormContainer>
        </Stack>
    );
}

function LeaveGroup() {
    return (
        <p>
            Are you sure you want to leave this group? This will mean you have to re-apply to join
            back again.
        </p>
    );
}
