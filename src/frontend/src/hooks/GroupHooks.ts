import { useState, useEffect } from 'react';
import { IGroup, NewGroupDto } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';

export default function useGroups() {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

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

    const addGroup = async (group: NewGroupDto) => {
        const response = await fetch(`${ApiConfig.API_URL}/group`, {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(group)
        });
        const newGroup = await response.json();
        setGroups([...groups, newGroup]);
    };

    return { groups, addGroup, isLoading };
}

export function useGroup(groupId: string) {
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

    const updateGroup = async (group: IGroup) => {
        const response = await fetch(`${ApiConfig.API_URL}/group/${group.id}`, {
            ...defaultRequestOptions,
            method: 'PUT',
            body: JSON.stringify(group)
        });
        const updatedGroup = await response.json();
        setGroup(updatedGroup);
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
