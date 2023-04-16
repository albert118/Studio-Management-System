import { Guid } from 'guid-typescript';

export type Nullable<T> = T | null;

export interface IMemberInfo {
    max: number;
    count: number;
    members: Array<string>;
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
    name: string,
    description: string,
    owners: ProjectOwner[]
): NewProjectDto => {
    return {
        name,
        description,
        owners
    } as NewProjectDto;
};

export type NewProjectDto = {
    name: string;
    description: undefined | string;
    owners: ProjectOwner[];
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
    title: string | null;
    Owners: string[];
    assignedGroups: IGroupFlyweight[];
    meta: IProjectMeta;
}

export type ProjectOwner = {
    id: Guid;
    name: string;
    email: string;
};
