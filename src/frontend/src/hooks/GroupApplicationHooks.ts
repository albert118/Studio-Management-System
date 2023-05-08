import { useState, useEffect } from 'react';
import { Nullable, NewGroupApplicationDto, IGroupApplication, IPotentialInvite } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { KestrelServerError, ApiError } from './types';
import { Guid } from 'guid-typescript';

export default function useGroupApplications(groupId: Guid) {
    const [groupApplications, setgroupApplications] = useState<IGroupApplication[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchGroup = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/groupapplication/${groupId}`, {
                ...defaultRequestOptions
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setgroupApplications(data);
            } else {
                setgroupApplications([data]);
            }
            setLoading(false);
        };

        fetchGroup();
    }, []);

    const addGroupApplication = async (
        groupApplications: NewGroupApplicationDto
    ): Promise<boolean> => {
        const response = await fetch(`${ApiConfig.API_URL}/groupapplication`, {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(groupApplications)
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

    return { groupApplications, addGroupApplication, errors, isLoading };
}

export function useManageGroupApplication() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    const rejectGroupApplication = async (rejectApplicationDto: Guid[]): Promise<boolean> => {
        setLoading(true);

        const response = await fetch(`${ApiConfig.API_URL}/groupapplication/rejectgroup`, {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(rejectApplicationDto)
        });

        let retVal;
        const data = await response.json();

        setLoading(false);

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

    return { rejectGroupApplication, isLoading, errors };
}

export function useGroupApplicationsForStudent(studentId: Guid) {
    const [potentialInvites, setPotentialInvites] = useState<IPotentialInvite[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGroup = async () => {
            const response = await fetch(
                `${ApiConfig.API_URL}/groupapplication/forstudent/${studentId}`,
                {
                    ...defaultRequestOptions
                }
            );

            setPotentialInvites(await response.json());
        };

        setLoading(true);
        fetchGroup();
        setLoading(false);
    }, []);

    return { potentialInvites, isLoading };
}
