import { Guid } from 'guid-typescript';
import { IGroup, IStudentContact } from 'types/types';

export type AssignedStudentsFormData = {
    studentIds: Guid[];
    groupId: Guid;
};

export type ViewProps = {
    assignableStudents: IStudentContact[];
    availableGroups: IGroup[];
    onSubmit: Function;
    onFinish: Function;
};
