import { Guid } from 'guid-typescript';

export type Nullable<T> = T | null;

export interface IMemberInfo {
    max: number;
    count: number;
    members: Array<IMemberDetail>;
}

export interface IMemberDetail {
    id: Guid;
    name: string;
}

export interface IPreference {
    title: string;
    rank: number; // 1, 2, 3, etc...
    projectId: Guid;
}

export interface IGroup {
    id: Guid;
    name: string;
    description: string;
    memberInfo: IMemberInfo;
    preferences: IPreference[];
    memberCount: string;
    project: string;
}

export interface IGroupApplication {
    id: Guid;
    groupId: Guid;
    contactId: Guid;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export const NewGroupDto = (
    name: string,
    description: string,
    maxMembers: number,
    preferences: SelectedPreferences
): NewGroupDto => {
    return {
        name,
        description,
        maxMembers,
        preferences
    } as NewGroupDto;
};

export type NewGroupDto = {
    name: string;
    description: undefined | string;
    maxMembers: number;
    preferences: SelectedPreferences;
};

export type SelectedPreferences = {
    preferenceOne: Nullable<string>;
    preferenceTwo: Nullable<string>;
    preferenceThree: Nullable<string>;
};

export const NewProjectDto = (
    title: string,
    description: string,
    domain: string,
    principalProductOwner: Guid,
    owners: Guid[]
): NewProjectDto => {
    return {
        title,
        description,
        domain,
        principalOwnerContactId: principalProductOwner,
        ownerContactIds: owners
    } as NewProjectDto;
};

export type NewProjectDto = {
    title: string;
    description: string;
    domain: string;
    principalOwnerContactId: Guid;
    ownerContactIds: Guid[];
};

export const NewGroupApplicationDto = (
    studentIds: Guid[],
    group: Guid,
    message: String
): NewGroupApplicationDto => {
    return {
        studentIds,
        group,
        message
    } as NewGroupApplicationDto;
};

export type NewGroupApplicationDto = {
    studentIds: Guid[];
    group: Guid;
    message: undefined | string;
};

export interface IGroupFlyweight {
    groupId: Guid;
    name: string;
}

export interface IProjectMeta {
    createdYear: string;
    domain: string;
}

export interface IProject {
    id: Guid;
    description: string;
    title: string;
    principalOwner: PrincipalOwner;
    owners: PrincipalOwner[];
    assignedGroups: IGroupFlyweight[];
    meta: IProjectMeta;
}

export class Project implements IProject {
    id: Guid;
    description: string;
    title: string;
    principalOwner: PrincipalOwner;
    owners: PrincipalOwner[];
    assignedGroups: IGroupFlyweight[];
    meta: IProjectMeta;

    constructor() {
        this.id = Guid.parse(Guid.EMPTY);
        this.description = '';
        this.title = '';
        this.owners = [];
        this.principalOwner = {} as PrincipalOwner;
        this.assignedGroups = [];
        this.meta = {
            createdYear: '',
            domain: ''
        };
    }
}

export interface IOwnerContact {
    id: Guid;
    name: string;
    email: string;
}

export interface IStudentContact {
    id: Guid;
    name: string;
    email: string;
}

export type PrincipalOwner = {
    id: Guid;
    name: string;
    email: string;
};
