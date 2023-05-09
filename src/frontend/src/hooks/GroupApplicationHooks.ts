import { useState, useEffect } from 'react';
import { Nullable, NewGroupApplicationDto, IGroupApplication, IPotentialInvite } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { KestrelServerError, ApiError } from './types';
import { Guid } from 'guid-typescript';
import { handleErrors } from './helpers';

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

        if (response.ok) {
            retVal = true;
        } else {
            await handleErrors(response, setErrors);
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

        setLoading(false);

        if (response.ok) {
            retVal = true;
        } else {
            await handleErrors(response, setErrors);
            retVal = false;
        }

        return retVal;
    };

    return { rejectGroupApplication, isLoading, errors };
}

export function useGroupApplicationsForStudent(studentId: Guid) {
    const [potentialInvites, setPotentialInvites] = useState<IPotentialInvite[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchGroupApplications = async () => {
            setLoading(true);

            const response = await fetch(
                `${ApiConfig.API_URL}/groupapplication/forstudent/${studentId}`,
                {
                    ...defaultRequestOptions
                }
            );

            setPotentialInvites(await response.json());

            setLoading(false);
        };

        fetchGroupApplications();
    }, []);

    const rejectInvites = async (rejectedInviteIds: Guid[]) => {
        setLoading(true);

        const response = await fetch(`${ApiConfig.API_URL}/groupapplication/rejectforstudent`, {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(rejectedInviteIds.map(id => id.toString()))
        });

        if (response.ok) {
            setPotentialInvites(
                potentialInvites.filter(i => !rejectedInviteIds.includes(i.inviteId))
            );
        } else {
            await handleErrors(response, setErrors);
        }

        setLoading(false);
    };

    const acceptInvite = async (acceptedInviteId: Guid): Promise<Guid | undefined> => {
        setLoading(true);

        let retValue = undefined;
        const response = await fetch(
            `${ApiConfig.API_URL}/groupapplication/acceptforstudent/${acceptedInviteId.toString()}`,
            {
                ...defaultRequestOptions
            }
        );

        if (response.ok) {
            setPotentialInvites([] as IPotentialInvite[]);
            // returns group ID
            retValue = Guid.parse(await response.json());
        } else {
            await handleErrors(response, setErrors);
        }

        setLoading(false);
        return retValue;
    };

    return { potentialInvites, rejectInvites, acceptInvite, isLoading, errors };
}
