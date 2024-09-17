

import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post('/projects', formData);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.err)
        }

    }
}
export async function getProjects() {


    try {
        const { data } = await api.get('/projects');
        const response = dashboardProjectSchema.safeParse(data)
        if (response.success) return response.data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.err)
        }

    }
}
export async function getProjectById(id: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${id}`);
        const response = editProjectSchema.safeParse(data)
        if(response.success){
            return response.data;
        }
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.err)
        }

    }
}
export async function getFullProject(id: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${id}`);
        const response = projectSchema.safeParse(data)
        if(response.success){
            return response.data;
        }
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.err)
        }

    }
}

type ProjectAPIType = {
    formData:ProjectFormData,
    projectId:Project['_id']
}
export async function updateProject({formData,projectId}:ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`,formData);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.err)
        }

    }
}

export async function deleteProject(id: Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.err)
        }

    }
}