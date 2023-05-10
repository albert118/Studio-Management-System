import AssignStudentsToGroupView from './AssignStudentsToGroupView';
import { useGroups, useStudentContactsWithoutGroup } from 'hooks';
import { LoadingSpinner } from 'components';
import { useNavigate } from 'react-router-dom';
import { AssignedStudentsFormData } from './types';

export default function AddProjectContainer() {
    const { studentContacts, isLoading: isLoadingStudents } = useStudentContactsWithoutGroup();
    const { groups, isLoading: isLoadingGroups } = useGroups();
    const navigate = useNavigate();

    const availableGroups = groups.filter(group => group.memberInfo.count < group.memberInfo.max);

    const onSubmit = (e: React.SyntheticEvent, formData: AssignedStudentsFormData) => {
        e.preventDefault();
        console.log(formData);
    }

    const isLoading = isLoadingGroups || isLoadingStudents;

    return (
        isLoading
            ? <LoadingSpinner />
            : <AssignStudentsToGroupView
                assignableStudents={studentContacts}
                availableGroups={availableGroups}
                onSubmit={onSubmit}
                onFinish={() => navigate(-1)}
            />
    );
}
