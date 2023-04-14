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

export const NewGroupDto = (
    name: string,
    description: string,
    preferences: SelectedPreferences
): NewGroupDto => {
    return {
        name,
        description,
        preferences
    } as NewGroupDto;
};

export type NewGroupDto = {
    name: string;
    description: undefined | string;
    preferences: SelectedPreferences;
};

export interface ITrippleSelectProps extends React.PropsWithChildren {
    preferences: SelectedPreferences;
    setPreferences: React.Dispatch<React.SetStateAction<SelectedPreferences>>;
    placeholderOption: string;
    arePreferencesValid: boolean;
    setPreferencesInvalid: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormData {
    name: string;
    description: string;
}

export interface IFormErrors {
    name: boolean;
}
