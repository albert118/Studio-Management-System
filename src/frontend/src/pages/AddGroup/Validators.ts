import { SelectedPreferences, getPreferencesAsList } from './types';

const distinct = (arr: any[]): any[] => [...new Set(arr.map(item => item))];

const isUnique = (arr: any[]): boolean => distinct(arr).length === arr.length;

export const preferenceValidtor = (existingPreferences: SelectedPreferences): boolean => {
    return !isUnique(getPreferencesAsList(existingPreferences));
};
