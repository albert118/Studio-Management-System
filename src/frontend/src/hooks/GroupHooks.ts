import { useState, useEffect } from 'react';
import { Nullable, IGroup, NewGroupDto } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { KestrelServerError, ApiError } from './types';
import { Guid } from 'guid-typescript';

export default function useGroups() {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/groups/all`, {
                ...defaultRequestOptions
            });
            const data = await response.json();

            setGroups(data);
            setLoading(false);
        };
        fetchGroups();
    }, []);

    const addGroup = async (group: NewGroupDto): Promise<string> => {
        const response = await fetch(`${ApiConfig.API_URL}/group`, {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(group)
        });

        let newGroupId: string = '';
        const data = await response.json();

        if (response.ok) {
            newGroupId = data;
        } else {
            const errorData = data as KestrelServerError;
            const apiError = { error: errorData.title, message: errorData.errors };
            console.error(JSON.stringify(apiError));
            setErrors(apiError);
        }

        return newGroupId;
    };

    return { groups, addGroup, isLoading, errors };
}

export function useGroup(groupId: Guid) {
    const [group, setGroup] = useState<IGroup>({} as IGroup);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGroup = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/group/${groupId}`, {
                ...defaultRequestOptions
            });
            const data = await response.json();

            setGroup(data);
            setLoading(false);
        };
        fetchGroup();
    }, []);

    const updateGroup = async (updatedGroup: IGroup) => {
        const response = await fetch(`${ApiConfig.API_URL}/group/${group.id}`, {
            ...defaultRequestOptions,
            method: 'PATCH',
            body: JSON.stringify(updatedGroup)
        });

        if (response.ok) {
            const updatedGroup = await response.json();
            setGroup(updatedGroup);
        }
    };

    const deleteGroup = async (groupId: number) => {
        await fetch(`${ApiConfig.API_URL}/group/${groupId}`, {
            ...defaultRequestOptions,
            method: 'DELETE'
        });
        setGroup({} as IGroup);
    };

    return { group, updateGroup, deleteGroup, isLoading };
}
