import {AxiosResponse} from "axios";
import {ProfileType} from "../Profile/profileAPI"
import {instance} from '../../common/constants/instanceAPI';


export const authAPI = {
  registration(data:RegistrationParamsType) {
    return instance.post<'', AxiosResponse, RegistrationParamsType>('auth/register', data)
  },
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

export type  RegistrationParamsType = {
  email: string,
  password: string,
  captcha?: string
}

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