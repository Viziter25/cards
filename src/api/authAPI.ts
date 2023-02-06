import axios, {AxiosResponse} from "axios";
import {ProfileType} from "./profileAPI"


const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})

export const authAPI = {
  login(data: LoginType) {
    return instance.post<LoginType, AxiosResponse<ProfileType>>('/auth/login', data)
      .then(res => res.data)
  }
}

//types
export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}
