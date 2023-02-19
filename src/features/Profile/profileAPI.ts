import {AxiosResponse} from 'axios'
import {instance} from '../../common/constants/instanceAPI';


//api
export const profileAPI = {
  updateProfile(name: string, avatar: string) {
    return instance.put<'', AxiosResponse<{ updatedUser: ProfileType, error: string }>, UpdateProfileType>('auth/me', { name, avatar })
  },
  logOut() {
    return instance.delete<{ info: string, error: string }>('auth/me')
  },
  /* getProfile() {
      return instanceAPI.post<null, AxiosResponse<ProfileType>>('Auth/me')
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