import axios from 'axios';

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '03ad5f93-01ed-40ac-88ea-6633adf807bd'
  }
})

export const registrAPI = {
  registration(data:RegistrationParamsType) {
    return instance.post('auth/register', data)
  }
}

export type  RegistrationParamsType = {
  email: string,
  password: string,
  captcha?: string
}