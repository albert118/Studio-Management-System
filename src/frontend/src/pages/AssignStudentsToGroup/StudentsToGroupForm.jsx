import { Stack } from 'components';
import { Button, Form, Select, SelectItem, MultiSelect } from '@carbon/react';
import { mapToDropdownItems } from './utils';

const defaultItem = 'placeholder-item';

export default function StudentsToGroupForm({
    assignableStudents,
    availableGroups,
    onSubmit,
    onFinish,
    formData,
    setFormData
}) {
    return (
        <Form onSubmit={onSubmit}>
            <Stack>
                <Select
                    defaultValue={defaultItem}
                    helperText='The group you want to assign students to'
                    id='group'
                    name='group'
                    invalidText='A group must be selected to assign students to it'
                    labelText='Group'
                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                >
                    <SelectItem text='Choose a group' value={defaultItem} />
                    {availableGroups &&
                        availableGroups.map(group => (
                            <SelectItem text={group.name} value={group.id} key={group.id} />
                        ))}
                </Select>

                <MultiSelect
                    defaultValue={defaultItem}
                    helperText='The students you want to assign to a group'
                    id='students'
                    name='students'
                    invalidText='Some students must be selected so that they can be assigned'
                    onChange={output => {
                        setFormData({
                            ...formData,
                            studentIds: output.selectedItems.map(item => item.id)
                        });
                    }}
                    items={mapToDropdownItems(assignableStudents)}
                    label='Select students to asasign'
                    titleText='Product owners'
                />

                <div className='inline-buttons'>
                    <Button kind='primary' type='submit'>
                        Assign (and repeat)
                    </Button>
                    <Button kind='secondary' type='button' onClick={onFinish}>
                        Create and view
                    </Button>
                </div>
            </Stack>
        </Form>
    );
}
