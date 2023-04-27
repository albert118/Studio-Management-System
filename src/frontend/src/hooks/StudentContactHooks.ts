import { useState, useEffect } from 'react';
import { IStudentContact, Nullable } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { ApiError } from './types';

export default function useStudentContacts() {
    const [studentContacts, setStudentContacts] = useState<IStudentContact[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, _] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch(`${ApiConfig.API_URL}/studentcontacts`, {
                ...defaultRequestOptions
            });

            const data = await response.json();

            setStudentContacts(data);
            setLoading(false);
        };
        fetchContacts();
    }, []);

    return { studentContacts, isLoading, errors };
}
