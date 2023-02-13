import axios, { AxiosResponse } from 'axios'

//instance
const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

//api
export const profileAPI = {
    updateProfile(name: string, avatar: string) {
        return instance.put<'', AxiosResponse<{updatedUser: ProfileType, error: string}>, UpdateProfileType>('auth/me', {name, avatar})
    },
    logOut() {
        return instance.delete<{info: string, error: string}>('auth/me')
    },
    /* getProfile() {
        return instance.post<null, AxiosResponse<ProfileType>>('auth/me')
    }, */
}

// types
export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number    // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean               // подтвердил ли почту
    rememberMe: boolean
    error?: string
    token: string
    tokenDeathTime: number
    __v: number
}
export type UpdateProfileType = {
    name: string
    avatar: string
}