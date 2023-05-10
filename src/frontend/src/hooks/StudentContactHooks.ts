import { useState, useEffect } from 'react';
import { IStudentContact, Nullable } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { ApiError } from './types';
import { handleErrors } from './helpers';

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
                await handleErrors(response, setErrors);
            }

            setLoading(false);
        };

        fetchContacts();
    }, []);

    return { studentContacts, isLoading, errors };
}

export function useStudentContactsWithoutGroup() {
    const [studentContacts, setStudentContacts] = useState<IStudentContact[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

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
            await handleErrors(response, setErrors);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return { studentContacts, refreshStudentContacts: fetchContacts, isLoading, errors };
}
