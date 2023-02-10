import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})

export const registrAPI = {
  registration(data:RegistrationParamsType) {
    return instance.post<'', AxiosResponse, RegistrationParamsType>('auth/register', data)
  }
}

export type  RegistrationParamsType = {
  email: string,
  password: string,
  captcha?: string
}