import axios, {AxiosResponse} from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})

export const authApi = {
  login(data: LoginType) {
    return instance.post<LoginType, AxiosResponse<LoginResponseType>>('/auth/login', data)
      .then(res => res.data)
  }
}

//types
export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}