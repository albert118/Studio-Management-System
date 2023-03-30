import { preferenceValidtor } from './Validators';
import { SelectedPreferences } from './types';

export const usePreferenceValidator = (existingPreferences: SelectedPreferences) => {
    const validate = () => {
        return preferenceValidtor(existingPreferences);
    };

    return {
        validate
    };
};
