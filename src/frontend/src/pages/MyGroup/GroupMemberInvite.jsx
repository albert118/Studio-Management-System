import { Column, MultiSelect, Form, TextArea } from '@carbon/react';
import { LoadingSpinner, Stack } from 'components';
import { FormContainer } from 'components/Forms';
import { useStudentContacts } from 'hooks';

export function GroupMemberInvite({ inviteData, setInviteData }) {
    const { studentContacts, isLoading } = useStudentContacts();

    return isLoading ? (
        <LoadingSpinner />
    ) : (
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
                    {/* fake the submit to as a workaround for the modal wrapper */}
                    <Form onSubmit={() => {}}>
                        <Stack>
                            <MultiSelect
                                helperText='You can select up to as many as your group can fit'
                                name='studentContact'
                                id='invitees'
                                titleText='Invitees'
                                label='Create multiple invites by selecting multiple people'
                                onChange={output => {
                                    setInviteData({
                                        ...inviteData,
                                        // set with ID directly, as the hook data already exists as a string
                                        studentIds: output.selectedItems.map(item => item.id)
                                    });
                                }}
                                items={studentContacts}
                                itemToString={item => (item ? item.name : '')}
                            />
                            <TextArea
                                helperText='Add a message with your invite (optional)'
                                name='message'
                                id='invitation-message'
                                labelText='Message (optional)'
                                placeholder='Optionally include a message with your invitation'
                                rows={2}
                                onChange={e => {
                                    setInviteData({
                                        ...inviteData,
                                        [e.target.name]: e.target.value
                                    });
                                }}
                                maxLength={100}
                            />
                        </Stack>
                    </Form>
                </Column>
            </FormContainer>
        </Stack>
    );
}
