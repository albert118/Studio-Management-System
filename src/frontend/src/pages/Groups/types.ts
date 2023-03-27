export interface IViewProps {
    groups: Array<IGroup>;
}

export interface IMemberInfo {
    max: number;
    count: number;
    members: Array<string>;
}

export interface IGroup {
    id: number | string;
    name: string;
    description: string;
    MemberInfo: IMemberInfo;
    members: string;
    project: string;
}
