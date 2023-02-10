import axios, {AxiosResponse} from "axios";
import {ProfileType} from "./profileAPI"


const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})

export const authAPI = {
  login(data: LoginType) {
    return instance.post<'', AxiosResponse<ProfileType>, LoginType>('auth/login', data)
      .then(res => res.data)
  },
  me() {
    return instance.post<ProfileType>('auth/me')
  },
  forgotPassword(data: ForgotPasswordType) {
    return instance.post<'', AxiosResponse<{info: string}>, ForgotPasswordType>('https://neko-back.herokuapp.com/2.0/auth/forgot', data)
  },
  createPassword(data: NewPasswordType) {
    return instance.post<'', AxiosResponse, NewPasswordType>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', data)
  }
}

//types
export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ForgotPasswordType = {
  email: string // кому восстанавливать пароль
  from: string // можно указать разработчика фронта)
  message: string
}

export type NewPasswordType = {
  password: string
  resetPasswordToken?: string
}