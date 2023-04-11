export interface IMemberInfo {
    max: number;
    count: number;
    members: Array<string>;
}

export interface IPreference {
    title: string;
    rank: number; // 1, 2, 3, etc...
}

export interface IGroup {
    id: number | string;
    name: string;
    description: string;
    memberInfo: IMemberInfo;
    preferences: Array<IPreference>;
    members: string;
    project: string;
}
