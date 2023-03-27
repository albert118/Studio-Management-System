import React, { useState } from 'react';
import { Column } from '@carbon/react';
import { Button, Form, TextArea, TextInput, SelectItem } from 'carbon-components-react';
import { FormContainer, Stack } from 'components/Forms';
import TrippleSelectDropdown from './TrippleSelectDropdown';
import { IViewProps, IFormData, SelectedPreferences, NewGroupDto } from './types';

const defaultItem = 'placeholder-item';

export default function AddGroupView({ availableProjects }: IViewProps) {
    const [selectedPreferences, setSelectedPreferences] = useState({} as SelectedPreferences);
    const [generalFormData, setFormData] = useState({} as IFormData);
    const [groupNameHasError, setGroupNameError] = useState(false);

    const updateFormData = (event: React.ChangeEvent<any>) => {
        setFormData({
            ...generalFormData,
            [event.target.name]: event.target.value
        });
    };

    const mapFormToDto = () => {
        const dto = {} as NewGroupDto;

        dto.name = generalFormData.name!;
        dto.description = generalFormData.description;
        dto.preferences = selectedPreferences;

        return dto;
    };

    const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (generalFormData.name) {
            setGroupNameError(true);
            return;
        }

        setGroupNameError(false);
        const dto = mapFormToDto();
        console.log(dto);
        // TODO: add datahook for API POST
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
                <Form onSubmit={submitHandler}>
                    <Stack>
                        <TextInput
                            helperText='Keep it memorable and less than 100 characters'
                            name='name'
                            id='name'
                            labelText='Group name'
                            placeholder='Add a memorable and unique group name'
                            onChange={updateFormData}
                            invalidText='A group name is required to create a new group'
                            invalid={groupNameHasError}
                        />
                        <TextArea
                            helperText='Optional, this will will appear when people view your group details'
                            name='description'
                            id='description'
                            labelText='Description (optional)'
                            placeholder='Add an optional description of your group'
                            rows={4}
                            onChange={updateFormData}
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

                        <Button kind='primary' type='submit'>
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
