import { useState, useEffect } from 'react';
import { Column, Button, Form, TextArea, TextInput, SelectItem, NumberInput } from '@carbon/react';
import { FormContainer, Stack } from 'components/Forms';
import TrippleSelectDropdown from './TrippleSelectDropdown';
import { NewGroupDto } from 'types/types';
import { newSelectedPreferences } from './types';
import { useSubmissionValidator } from './useSubmissionValidator';

const defaultItem = 'placeholder-item';

export default function AddGroupView({ availableProjects, saveGroup }) {
    const [selectedPreferences, setSelectedPreferences] = useState(newSelectedPreferences());
    const [arePreferencesValid, setPreferenceValidity] = useState(true);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [isSubmittable, setSubmittable] = useState(false);

    const { validate, errors } = useSubmissionValidator(formData, arePreferencesValid);

    useEffect(() => {
        setSubmittable(validate());
    }, [formData, arePreferencesValid]);

    const submit = e => {
        e.preventDefault();
        saveGroup(NewGroupDto(...Object.values(formData), selectedPreferences));
    };

    return (
        <FormContainer>
            <Column lg={16} md={8} sm={4} className='add-group-page__heading'>
                <h1>Create a new group</h1>
                <p>
                    Creating a new group will allow you to join a project and collaborate with your
                    team mates.
                    <br />
                    Not everyone has to create a new group, feel free discover an existing group.
                </p>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <Form onSubmit={submit}>
                    <Stack>
                        <TextInput
                            name='name'
                            id='name'
                            onChange={e =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            labelText='Group name'
                            helperText='Keep it memorable and less than 50 characters'
                            placeholder='Add a memorable and unique group name'
                            invalidText='A group name is required to create a new group'
                            invalid={errors.name}
                            maxLength={50}
                        />
                        <TextArea
                            name='description'
                            onChange={e =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            labelText='Description (optional)'
                            helperText='Optional, this will will appear when people view your group details'
                            placeholder='Add an optional description of your group'
                            rows={4}
                        />

                        <NumberInput
                            name='maxMembers'
                            onChange={e =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            label='Group size'
                            helperText='The number of group members (min. 2, max. 10)'
                            min={2}
                            max={10}
                        />

                        <div className='subheading'>
                            <h2>Choose your preferred projects</h2>
                            <p>
                                You may select up to three projects. The first is your most
                                preferred project. You will be assigned to whichever project has
                                space left first-to-last.
                                <br />
                                These preferences will become your group's default preferences too.
                                Although they can change them, this is the recommended path to
                                allocate your group to a single project.
                            </p>
                        </div>

                        <TrippleSelectDropdown
                            preferences={selectedPreferences}
                            setPreferences={setSelectedPreferences}
                            placeholderOption={defaultItem}
                            arePreferencesValid={arePreferencesValid}
                            setPreferenceValidity={setPreferenceValidity}
                        >
                            <PlaceholderSelectItem />
                            {availableProjects.map(project => (
                                <SelectItem
                                    text={project.description}
                                    value={project.id}
                                    key={project.id}
                                />
                            ))}
                        </TrippleSelectDropdown>

                        <Button kind='primary' type='submit' disabled={!isSubmittable}>
                            Create
                        </Button>
                    </Stack>
                </Form>
            </Column>
        </FormContainer>
    );
}

function PlaceholderSelectItem() {
    return <SelectItem text='Choose a project preference' value={defaultItem} />;
}
