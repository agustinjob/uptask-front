import { isAxiosError } from "axios";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";

export async function updateProfile(formDta:UserProfileForm) {
    try {
        const url = '/auth/profile'
        const {data} = await api.put<string>(url,formDta)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function chengePassword(formDta:UpdateCurrentUserPasswordForm) {
    try {
        const url = '/auth/update-password'
        const {data} = await api.post<string>(url,formDta)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}