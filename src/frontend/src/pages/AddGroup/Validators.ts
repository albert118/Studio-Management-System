import { SelectedPreferences, getPreferencesAsList } from './types';
import { isUnique } from 'utils/array';

export const preferenceValidtor = (existingPreferences: SelectedPreferences): boolean => {
    return !isUnique(getPreferencesAsList(existingPreferences));
};
