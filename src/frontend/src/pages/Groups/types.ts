export interface IViewProps {
    groups: Array<IGroup>;
}

export interface IMemberInfo {
    max: number;
    count: number;
    members: Array<string>;
}

export interface IGroup {
    id: string;
    name: string;
    description: string;
    MemberInfo: IMemberInfo;
}
