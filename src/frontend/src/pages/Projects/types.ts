export interface IViewProps {
    projects: Array<IProject>;
}

export interface IProject {
    id: number | string;
    description: string;
}
