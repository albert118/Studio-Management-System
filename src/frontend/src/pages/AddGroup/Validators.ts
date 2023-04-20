import { SelectedPreferences } from 'types/types';
import { getPreferencesAsList } from './types';
import { isUnique } from 'utils/array';
import { IFormData } from './types';

export const preferenceValidtor = (existingPreferences: SelectedPreferences): boolean => {
    return isUnique(getPreferencesAsList(existingPreferences));
};

export const nonEmptyFormValidator = (data: IFormData) => {
    return data.name === '' && data.description === '';
};

export const groupNameValidator = (name: string): boolean => {
    return !!name && name.length < 50;
};
