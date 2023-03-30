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

export const newSelectedPreferences = (): SelectedPreferences => {
    return {
        preferenceOne: null,
        preferenceTwo: null,
        preferenceThree: null
    };
};

export const getPreferencesAsList = (obj: SelectedPreferences): string[] => {
    const arr = [obj.preferenceOne, obj.preferenceTwo, obj.preferenceThree];
    return arr.filter(pref => !!pref && pref !== '') as string[];
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
    arePreferencesValid: boolean;
    setPreferencesInvalid: React.Dispatch<React.SetStateAction<boolean>>;
}
