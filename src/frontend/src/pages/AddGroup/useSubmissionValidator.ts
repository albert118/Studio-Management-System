import { useState } from 'react';
import { IFormData, IFormErrors } from './types';
import { nonEmptyFormValidator, groupNameValidator } from './Validators';

export const useSubmissionValidator = (
    existingFormData: IFormData,
    arePreferencesValid: boolean
) => {
    const [errors, setErrors] = useState({
        name: false
    } as IFormErrors);

    const validate = (): boolean => {
        const groupNameValid = groupNameValidator(existingFormData.name);
        errors.name = !groupNameValid;
        setErrors(errors);

        let valid = true;
        valid &&= !nonEmptyFormValidator(existingFormData);
        valid &&= arePreferencesValid;
        valid &&= groupNameValid;

        return valid;
    };

    return {
        validate,
        errors
    };
};
