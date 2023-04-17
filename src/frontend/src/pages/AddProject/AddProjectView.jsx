import { FormContainer } from 'components/Forms';
import useProjects from 'hooks/ProjectHooks';
import { Stack } from 'components';
import {
    Column,
    Button,
    Form,
    TextArea,
    TextInput,
    Select,
    SelectItem,
    MultiSelect
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { useState, useEffect } from 'react';
import { mapToDropdownItems } from './utils';
import { NewProjectDto } from 'types/types';

const defaultItem = 'placeholder-item';

export default function AddProjectView({ availableOwners }) {
    const { addProject, apiErrors } = useProjects();
    const navigate = useNavigate();
    const errors = null; // TODO (add validators)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        domain: '',
        principalProductOwner: '',
        owners: []
    });

    const [isSubmittable, setSubmittable] = useState(false);

    useEffect(() => {
        setSubmittable(true);
    }, [formData]);

    const submit = async e => {
        e.preventDefault();
        const projectId = await addProject(NewProjectDto(...Object.values(formData)));

        if (apiErrors) {
            return;
        }

        navigate(`${AppRoutes.project}/${projectId}`);
    };

    return (
        <FormContainer>
            <Column lg={16} md={8} sm={4} className='add-project-page__heading'>
                <h1>Create a new project</h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, fuga. Ipsam
                    itaque, culpa deleniti laudantium ullam quidem? Voluptates nulla neque molestias
                    non excepturi illo, inventore ad et enim. Dolorem, ut!
                </p>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <Form onSubmit={submit}>
                    <Stack>
                        {/* TODO: improve this with an inline notification (CBS component ) https://carbondesignsystem.com/components/notification/usage/*/}
                        <div>{JSON.stringify(apiErrors)}</div>
                        <TextInput
                            name='title'
                            id='title'
                            onChange={e =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            labelText='Project name'
                            helperText='Keep it memorable and less than 50 characters'
                            placeholder='Add a memorable and unique project name'
                            invalidText='A project name is required to create a new project'
                            // invalid={errors.name}
                            maxLength={50}
                        />

                        <TextArea
                            name='description'
                            id='description'
                            onChange={e =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            labelText='Description (optional)'
                            helperText='A good description will help people understand the project'
                            placeholder='Add a description of your project'
                            rows={6}
                            maxLength={10000}
                        />

                        <TextInput
                            name='domain'
                            id='domain'
                            onChange={e =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                            labelText='Project domain'
                            helperText='software, electrical, etc.'
                            placeholder='Adding a domain will help groups narrow down the scope of your project'
                            invalidText='A project domain is required'
                            // invalid={errors.name}
                            maxLength={20}
                        />

                        <div className='subheading'>
                            <h2>Add product owners</h2>
                            <p>
                                There may be several product owners for a project. However, one
                                contact should be selected as the principle owner. Aside from the
                                principle owner, as many product owners can be linked as needed!
                            </p>
                            {/* TODO implement and add a navigation prompt */}
                            <p>You can add more contacts under the admin dashboard.</p>
                        </div>

                        <Select
                            defaultValue={defaultItem}
                            helperText='The primary point of contact and lead stakeholder of the product'
                            id='principal-product-owner'
                            name='principalProductOwner'
                            invalidText='A principal product owner is required'
                            labelText='Principal product owner'
                            onChange={e =>
                                setFormData({ ...formData, [e.target.name]: e.target.value })
                            }
                        >
                            <SelectItem text='Choose a principal owner' value={defaultItem} />
                            {availableOwners &&
                                availableOwners.map(owner => (
                                    <SelectItem text={owner.name} value={owner.id} key={owner.id} />
                                ))}
                        </Select>

                        <MultiSelect
                            defaultValue={defaultItem}
                            helperText='The principal product owner is not selectable again'
                            id='owners'
                            name='owners'
                            onChange={output => {
                                setFormData({
                                    ...formData,
                                    owners: output.selectedItems.map(item => item.id)
                                });
                            }}
                            items={mapToDropdownItems(availableOwners)}
                            label='Select as many remaining product owners as required'
                            titleText='Product owners'
                        />

                        <Button kind='primary' type='submit' disabled={!isSubmittable}>
                            Create and view
                        </Button>
                    </Stack>
                </Form>
            </Column>
        </FormContainer>
    );
}
