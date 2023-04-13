import { useState, useEffect } from 'react';
import { IGroup } from 'types/types';
import ApiConfig from 'config/ApiConfig';

const useGroups = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch(ApiConfig.API_URL + '/group');
            const data = await response.json();
            setGroups(data);
        };
        fetchGroups();
    }, []);

    const addGroup = async (group: Omit<IGroup, 'id'>) => {
        const response = await fetch(ApiConfig.API_URL + '/group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        });
        const newGroup = await response.json();
        setGroups([...groups, newGroup]);
    };

    const updateGroup = async (group: IGroup) => {
        const response = await fetch(ApiConfig.API_URL + '/group/${group.id}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        });
        const updatedGroup = await response.json();
        setGroups(groups.map(g => (g.id === updatedGroup.id ? updatedGroup : g)));
    };

    const deleteGroup = async (groupId: number) => {
        await fetch(ApiConfig.API_URL + '/group/${groupId}', {
            method: 'DELETE'
        });
        setGroups(groups.filter(group => group.id !== groupId));
    };

    return { groups, addGroup, updateGroup, deleteGroup };
};

export default useGroups;
