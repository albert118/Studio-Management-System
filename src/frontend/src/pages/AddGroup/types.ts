export interface IViewProps {
    availableProjects: ProjectPreferenceOption[];
}

export type ProjectPreferenceOption = {
    description: string;
    id: string;
};

export type SelectedPreferences = {
    preferenceOne: null | string;
    preferenceTwo: null | string;
    preferenceThree: null | string;
};

export type NewGroupDto = {
    name: string;
    description: undefined | string;
    preferences: SelectedPreferences;
};

export interface IFormData {
    name: undefined | string;
    description: undefined | string;
}

export interface ITrippleSelectProps extends React.PropsWithChildren {
    preferences: SelectedPreferences;
    setPreferences: React.Dispatch<React.SetStateAction<SelectedPreferences>>;
    placeholderOption: string;
}
