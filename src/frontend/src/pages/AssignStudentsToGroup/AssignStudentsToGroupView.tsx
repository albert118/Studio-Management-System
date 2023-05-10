import { FormContainer } from "components/Forms";
import { ViewProps } from "./types";
import { Column } from "@carbon/react";
import StudentsToGroupForm from "./StudentsToGroupForm";

export default function AssignStudentsToGroupView({ assignableStudents, availableGroups, onSubmit, onFinish, assignedStudentsFormData, setAssignedStudentsFormData }: ViewProps) {
    return (
        <FormContainer>
            <Column lg={16} md={8} sm={4} className='add-project-page__heading'>
                <h1>Assign students to a group</h1>
                <p>
                    Use this form to manually assign students to a group. The form will save your assignment and reset on save to repeat as many times as needed.
                    <br />
                    Click 'Done' when you're finished.
                </p>
            </Column>
            <Column lg={16} md={8} sm={4}>
                <StudentsToGroupForm
                    assignableStudents={assignableStudents}
                    availableGroups={availableGroups}
                    onSubmit={onSubmit}
                    onFinish={onFinish}
                    formData={assignedStudentsFormData}
                    setFormData={setAssignedStudentsFormData}
                />
            </Column>
        </FormContainer>
    );
}