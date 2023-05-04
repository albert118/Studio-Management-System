import { useState, useEffect } from 'react';
import { Project, IProject, Nullable } from 'types/types';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { NewProjectDto } from 'types/types';
import { KestrelServerError, ApiError } from './types';
import { Guid } from 'guid-typescript';
import useAuth from './AuthHooks';

export default function useProjects() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);
    const {session} = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/projects/all`, {
                ...defaultRequestOptions, ...{headers: {Authorisation: `Bearer ${session?.access_token}`}}
            });
            const data = await response.json();

            setProjects(data);
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const addProject = async (project: NewProjectDto): Promise<string> => {
        const response = await fetch(ApiConfig.API_URL + '/project', {
            ...defaultRequestOptions, ...{headers: {Authorisation: `Bearer ${session?.access_token}`}},
            method: 'POST',
            body: JSON.stringify(project)
        });

        let newProjectId: string = '';
        const data = await response.json();

        if (response.ok) {
            newProjectId = data;
        } else {
            const errorData = data as KestrelServerError;
            const apiError = { error: errorData.title, message: errorData.errors };
            console.error(JSON.stringify(apiError));
            setErrors(apiError);
        }

        return newProjectId;
    };

    return { projects, addProject, isLoading, errors };
}

export function useProject(projectId: Guid) {
    const [project, setProject] = useState<IProject>({} as IProject);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<Nullable<ApiError>>(null);
    const {session} = useAuth();

    useEffect(() => {
        const fetchGroup = async () => {
            setLoading(true);

            const response = await fetch(`${ApiConfig.API_URL}/project/${projectId}`, {
                ...defaultRequestOptions, ...{headers: {Authorisation: `Bearer ${session?.access_token}`}}
            });
            const data = await response.json();

            if (response.ok) {
                setProject(data);
                setErrors(null);
            } else {
                const errorData = data as KestrelServerError;
                const apiError = { error: errorData.title, message: errorData.errors };
                console.error(JSON.stringify(apiError));
                setErrors(apiError);
                setProject(new Project());
            }

            setLoading(false);
        };
        fetchGroup();
    }, []);

    const updateProject = async (project: IProject) => {
        const response = await fetch(`${ApiConfig.API_URL}/project/${project.id}`, {
            ...defaultRequestOptions, ...{headers: {Authorisation: `Bearer ${session?.access_token}`}},
            method: 'PUT',
            body: JSON.stringify(project)
        });

        if (response.ok) {
            const updatedProject = await response.json();
            setProject(updatedProject);
        }
    };

    const deleteProject = async (projectId: number) => {
        await fetch(`${ApiConfig.API_URL}/project/${projectId}`, {
            ...defaultRequestOptions, ...{headers: {Authorisation: `Bearer ${session?.access_token}`}},
            method: 'DELETE'
        });

        setProject({} as IProject);
    };

    return { project, updateProject, deleteProject, isLoading, errors };
}
