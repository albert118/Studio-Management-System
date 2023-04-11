import { useEffect } from 'react';
import { Select } from '@carbon/react';
import { Stack } from 'components/Forms';
import { usePreferenceValidator } from './usePreferenceValidtor';

export default function TrippleSelectDropdown({
    preferences,
    setPreferences,
    placeholderOption,
    children,
    arePreferencesValid,
    setPreferencesInvalid
}) {
    const { validate } = usePreferenceValidator(preferences);

    const onUpdatePreference = event => {
        event.preventDefault();

        setPreferences({
            ...preferences,
            [event.target.name]:
                // let's not save the place-holder, as this will be confusing
                event.target.value === placeholderOption ? null : event.target.value
        });
    };

    useEffect(() => {
        setPreferencesInvalid(validate());
    }, [preferences]);

    return (
        <Stack>
            <Select
                name='preferenceOne'
                id='preference-one'
                labelText='First preference'
                defaultValue='placeholder-item'
                onChange={onUpdatePreference}
                invalidText='You can only select unique preferences'
                invalid={arePreferencesValid}
            >
                {children}
            </Select>
            <Select
                name='preferenceTwo'
                id='project-preference-two'
                labelText='Second preference (optional)'
                defaultValue='placeholder-item'
                onChange={onUpdatePreference}
                invalidText='You can only select unique preferences'
                invalid={arePreferencesValid}
            >
                {children}
            </Select>
            <Select
                name='preferenceThree'
                id='project-preference-three'
                labelText='Third preference (optional)'
                defaultValue='placeholder-item'
                onChange={onUpdatePreference}
                invalidText='You can only select unique preferences'
                invalid={arePreferencesValid}
            >
                {children}
            </Select>
        </Stack>
    );
}
