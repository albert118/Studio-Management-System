import { useState, useEffect } from 'react';
import { IOwnerContact, Nullable } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { ApiError } from './types';
import { Guid } from 'guid-typescript';

export default function useOwnerContacts() {
    const [ownerContacts, setOwnerContacts] = useState<IOwnerContact[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, _] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch(`${ApiConfig.API_URL}/ownercontacts`, {
                ...defaultRequestOptions
            });

            const data = await response.json();

            setOwnerContacts(data);
            setLoading(false);
        };
        fetchContacts();
    }, []);

    const getOwnerContacts = async (ownerContactIds: Guid[]) => {
        setLoading(true);

        const response = await fetch(`${ApiConfig.API_URL}/ownercontacts`, {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify({ ids: ownerContactIds.map(id => id.toString()) })
        });

        const data = await response.json();

        setOwnerContacts(data);
        setLoading(false);
    };

    return { ownerContacts, getOwnerContacts, isLoading, errors };
}
