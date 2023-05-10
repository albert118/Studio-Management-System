import AssignStudentsToGroupView from './AssignStudentsToGroupView';
import { useGroups, useStudentContactsWithoutGroup } from 'hooks';
import { LoadingSpinner } from 'components';
import { useNavigate } from 'react-router-dom';
import { AssignedStudentsFormData } from './types';
import { useState } from 'react';

export default function AddProjectContainer() {
    const { studentContacts, isLoading: isLoadingStudents } = useStudentContactsWithoutGroup();
    const { groups, assignStudents, isLoading: isLoadingGroups } = useGroups();
    const navigate = useNavigate();

    const [assignedStudentsFormData, setAssignedStudentsFormData] = useState({} as AssignedStudentsFormData);

    const availableGroups = groups.filter(group => group.memberInfo.count < group.memberInfo.max);

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await assignStudents(assignedStudentsFormData.groupId, assignedStudentsFormData.studentIds);
        setAssignedStudentsFormData({} as AssignedStudentsFormData);
    };

    const isLoading = isLoadingGroups || isLoadingStudents;

    return (
        isLoading
            ? <LoadingSpinner />
            : <AssignStudentsToGroupView
                assignableStudents={studentContacts}
                availableGroups={availableGroups}
                onSubmit={onSubmit}
                onFinish={() => navigate(-1)}
                assignedStudentsFormData={assignedStudentsFormData}
                setAssignedStudentsFormData={setAssignedStudentsFormData}
            />
    );
}
