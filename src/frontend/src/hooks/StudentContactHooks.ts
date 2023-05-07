import { useState, useEffect } from 'react';
import { IStudentContact, Nullable } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { ApiError } from './types';

export default function useStudentContacts() {
    const [studentContacts, setStudentContacts] = useState<IStudentContact[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            const response = await fetch(`${ApiConfig.API_URL}/studentcontacts`, {
                ...defaultRequestOptions
            });

            if (response.ok) {
                const data = await response.json();
                setStudentContacts(data);
            } else {
                const errorData = await response.json();
                const apiError = { error: errorData.title, message: errorData.errors };
                console.error(JSON.stringify(apiError));
                setErrors(apiError);
            }
        };

        fetchContacts();
    }, []);

    return { studentContacts, isLoading, errors };
}

export function useStudentContactsWithoutGroup() {
    const [studentContacts, setStudentContacts] = useState<IStudentContact[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/studentcontacts/withoutgroup`, {
                ...defaultRequestOptions
            });

            setLoading(false);

            if (response.ok) {
                const data = await response.json();
                setStudentContacts(data);
            } else {
                const errorData = await response.json();
                const apiError = { error: errorData.title, message: errorData.errors };
                console.error(JSON.stringify(apiError));
                setErrors(apiError);
            }
        };

        fetchContacts();
    }, []);

    return { studentContacts, isLoading, errors };
}
