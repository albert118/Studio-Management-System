import React from 'react';
import { Column } from '@carbon/react';
import { Button, Form, TextArea, TextInput, Select, SelectItem } from 'carbon-components-react';
import { FormContainer, Stack } from 'components/Forms';
import { useState } from 'react';
import { IViewProps } from './types';

export default function AddGroupView({ projectPreferenceOptions }: IViewProps) {
    const [availableOptions, setAvailableOptions] = useState(projectPreferenceOptions);

    const removeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const updatedList = availableOptions.filter(option => option.id !== event.target.value);
        setAvailableOptions(updatedList);
    };

    return (
        <FormContainer>
            <Column lg={16} md={8} sm={4} className='add-group-page__heading'>
                <h1>Create a new group</h1>
                <p>
                    Creating a new group will allow you to join a project and collaborate with your
                    team mates. Not everyone has to create a new group, feel free discover an
                    existing group.
                </p>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <Form>
                    <Stack>
                        <TextInput
                            helperText='Keep it memorable and less than 100 characters'
                            id='group-name'
                            labelText='Group name'
                            placeholder='Add a memorable and unique group name'
                        />
                        <TextArea
                            helperText='Optional, this will will appear when people view your group details'
                            id='group-description'
                            labelText='Description (optional)'
                            placeholder='Add an optional description of your group'
                            rows={4}
                        />

                        <div className='subheading'>
                            <h2>Choose your preferred projects</h2>
                            <p>
                                You may select up to three projects. The first is your most
                                preferred project. You will be assigned to whichever project has
                                space left first-to-last.
                            </p>
                        </div>

                        <Select
                            id='project-preference-one'
                            labelText='First preference'
                            defaultValue='placeholder-item'
                            invalidText='A valid project preference is required'
                            onChange={removeOption}
                        >
                            <PlaceholderSelectItem />
                            {availableOptions.map(option => (
                                <SelectItem
                                    text={option.description}
                                    value={option.id}
                                    key={option.id}
                                />
                            ))}
                        </Select>
                        <Select
                            id='project-preference-two'
                            labelText='Second preference (optional)'
                            defaultValue='placeholder-item'
                            invalidText='A valid project preference is required'
                            onChange={removeOption}
                        >
                            <PlaceholderSelectItem />
                            {availableOptions.map(option => (
                                <SelectItem
                                    text={option.description}
                                    value={option.id}
                                    key={option.id}
                                />
                            ))}
                        </Select>
                        <Select
                            id='project-preference-three'
                            labelText='Third preference (optional)'
                            defaultValue='placeholder-item'
                            invalidText='A valid project preference is required'
                            onChange={removeOption}
                        >
                            <PlaceholderSelectItem />
                            {availableOptions.map(option => (
                                <SelectItem
                                    text={option.description}
                                    value={option.id}
                                    key={option.id}
                                />
                            ))}
                        </Select>

                        <Button kind='primary' tabIndex={0} type='submit'>
                            Create
                        </Button>
                    </Stack>
                </Form>
            </Column>
        </FormContainer>
    );
}

function PlaceholderSelectItem() {
    return <SelectItem text='Choose a project preference' value='placeholder-item' />;
}
