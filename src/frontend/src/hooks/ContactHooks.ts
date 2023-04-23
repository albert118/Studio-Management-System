import { useState, useEffect } from 'react';
import { IOwnerContact, Nullable } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { KestrelServerError, ApiError } from './types';
import { Guid } from 'guid-typescript';

export default function useOwnerContacts(ownerContactIds:Guid[]) {

    const [ownerContacts, setOwnerContacts] = useState<IOwnerContact[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/ownercontacts`, {
                ...defaultRequestOptions,
                method: 'POST',
                body: JSON.stringify(
                    {ids: ownerContactIds.map(id => id.toString())}
                )
            });
        
            const data = await response.json();

            setOwnerContacts(data);
            setLoading(false);
        };
        fetchContacts();
    }, []);

    return { ownerContacts, isLoading, errors };
}

