import { useState, useEffect } from 'react';
import { IProject } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';

const useProjects = () => {
    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(`${ApiConfig.API_URL}/projects/all`, {
                ...defaultRequestOptions
            });
            const data = await response.json();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    const addProject = async (project: Omit<IProject, 'id'>) => {
        const response = await fetch(ApiConfig.API_URL + '/project', {
            ...defaultRequestOptions,
            method: 'POST',
            body: JSON.stringify(project)
        });
        const newProject = await response.json();
        setProjects([...projects, newProject]);
    };

    const updateProject = async (project: IProject) => {
        const response = await fetch(`${ApiConfig.API_URL}/project/${project.id}`, {
            ...defaultRequestOptions,
            method: 'PUT',
            body: JSON.stringify(project)
        });
        const updatedProject = await response.json();
        setProjects(projects.map(p => (p.id === updatedProject.id ? updatedProject : p)));
    };

    const deleteProject = async (projectId: number) => {
        await fetch(`${ApiConfig.API_URL}/project/${projectId}`, {
            ...defaultRequestOptions,
            method: 'DELETE'
        });
        setProjects(projects.filter(project => project.id !== projectId));
    };

    return { projects, addProject, updateProject, deleteProject };
};

export default useProjects;
