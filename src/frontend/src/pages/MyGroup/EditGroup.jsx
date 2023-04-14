import { Column, Form, TextArea, TextInput, NumberInput } from '@carbon/react';
import { Stack } from 'components/Forms';
import { FormContainer } from 'components/Forms';

const defaultGroupSize = 2;

export function EditGroup({ group, setGroup }) {
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
                            <TextInput
                                helperText='Make sure to add a memorable group name'
                                name='name'
                                id='name'
                                defaultValue={group.name}
                                labelText='Group name'
                                placeholder='Add a memorable and unique group name'
                                invalidText='A group name is required to create a new group'
                                maxLength={50}
                                onChange={e =>
                                    setGroup({ ...group, [e.target.name]: e.target.value })
                                }
                            />
                            <TextArea
                                helperText='Optional, this will will appear when people view your group details'
                                name='description'
                                id='description'
                                defaultValue={group.description}
                                labelText='Description (optional)'
                                placeholder='Add an optional description of your group'
                                rows={4}
                                onChange={e =>
                                    setGroup({ ...group, [e.target.name]: e.target.value })
                                }
                            />
                            <NumberInput
                                name='maxMembers'
                                id='maxMembers'
                                onChange={(_, data) => {
                                    setGroup({ ...group, maxMembers: data.value });
                                }}
                                label='Group size'
                                helperText='The number of group members (min. 2, max. 10)'
                                value={defaultGroupSize}
                                min={defaultGroupSize}
                                max={10}
                            />
                        </Stack>
                    </Form>
                </Column>
            </FormContainer>
        </Stack>
    );
}
