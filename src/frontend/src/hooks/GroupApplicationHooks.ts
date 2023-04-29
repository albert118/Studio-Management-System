import { useState, useEffect } from 'react';
import { Nullable, NewGroupApplicationDto, IGroupApplication } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { KestrelServerError, ApiError } from './types';
import { Guid } from 'guid-typescript';
import useAuth from './AuthHooks';

export default function useGroupApplication(groupId: Guid) {
    const [groupApplication, setGroupApplication] = useState<IGroupApplication[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchGroup = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/groupapplication/${groupId}`, {
                ...defaultRequestOptions,
                ...{Authorization: useAuth().session}
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setGroupApplication(data);
            } else {
                setGroupApplication([data]);
            }
            setLoading(false);
        };
        fetchGroup();
    }, []);

    const addGroupApplication = async (
        groupApplication: NewGroupApplicationDto
    ): Promise<boolean> => {
        console.log(groupApplication);

        const response = await fetch(`${ApiConfig.API_URL}/groupapplication`, {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(groupApplication)
        });

        let retVal;
        const data = await response.json();

        if (response.ok) {
            retVal = true;
        } else {
            const errorData = data as KestrelServerError;
            const apiError = { error: errorData.title, message: errorData.errors };
            console.error(JSON.stringify(apiError));
            setErrors(apiError);
            retVal = false;
        }

        return retVal;
    };

    return { groupApplication, addGroupApplication, errors, isLoading };
}
