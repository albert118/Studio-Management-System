import { useState, useEffect } from 'react';
7230;
import { IProject } from 'pages/Projects/types';
import ApiConfig from 'config/ApiConfig';

const useProjects = () => {
    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(ApiConfig.API_URL + '/project');
            const data = await response.json();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    const addProject = async (project: Omit<IProject, 'id'>) => {
        const response = await fetch(ApiConfig.API_URL + '/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        const newProject = await response.json();
        setProjects([...projects, newProject]);
    };

    const updateProject = async (project: IProject) => {
        const response = await fetch(ApiConfig.API_URL + '/project/${project.id}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        const updatedProject = await response.json();
        setProjects(projects.map(p => (p.id === updatedProject.id ? updatedProject : p)));
    };

    const deleteProject = async (projectId: number) => {
        await fetch(ApiConfig.API_URL + '/project/${projectId}', {
            method: 'DELETE'
        });
        setProjects(projects.filter(project => project.id !== projectId));
    };

    return { projects, addProject, updateProject, deleteProject };
};

export default useProjects;
