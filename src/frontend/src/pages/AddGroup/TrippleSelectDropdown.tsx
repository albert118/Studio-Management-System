import { useState } from 'react';
import { Select } from 'carbon-components-react';
import { ITrippleSelectProps } from './types';
import { Stack } from '~/components/Forms';

export default function TrippleSelectDropdown({
    preferences,
    setPreferences,
    placeholderOption,
    children
}: ITrippleSelectProps) {
    const [preferencesInvalid, setPreferencesInvalid] = useState(false);

    const hasAlreadySelectedPreference = (selectedPreference: string) => {
        return (
            preferences.preferenceOne === selectedPreference ||
            preferences.preferenceTwo === selectedPreference ||
            preferences.preferenceThree === selectedPreference
        );
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        let newValue = event.target.name === placeholderOption ? null : event.target.value;

        if (hasAlreadySelectedPreference(event.target.value)) {
            setPreferencesInvalid(true);
            return;
        }

        setPreferences({
            ...preferences,
            [event.target.name]: newValue
        });

        setPreferencesInvalid(false);
    };

    return (
        <Stack>
            <Select
                name='preferenceOne'
                id='preference-one'
                labelText='First preference'
                defaultValue='placeholder-item'
                onChange={handleChange}
                invalidText='You can only select unique preferences'
                invalid={preferencesInvalid}
            >
                {children}
            </Select>
            <Select
                name='preferenceTwo'
                id='project-preference-two'
                labelText='Second preference (optional)'
                defaultValue='placeholder-item'
                onChange={handleChange}
                invalidText='You can only select unique preferences'
                invalid={preferencesInvalid}
            >
                {children}
            </Select>
            <Select
                name='preferenceThree'
                id='project-preference-three'
                labelText='Third preference (optional)'
                defaultValue='placeholder-item'
                onChange={handleChange}
                invalidText='You can only select unique preferences'
                invalid={preferencesInvalid}
            >
                {children}
            </Select>
        </Stack>
    );
}
