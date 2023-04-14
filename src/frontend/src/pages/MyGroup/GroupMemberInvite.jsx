import { Column, MultiSelect, Form, TextArea } from '@carbon/react';
import { Stack } from 'components/Forms';
import { FormContainer } from 'components/Forms';

export function GroupMemberInvite() {
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
                    {/* fake the submit to as a workaround for the modal wrapper */}
                    <Form onSubmit={() => {}}>
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
