import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, ForgotPasswordType, LoginType, NewPasswordType, RegistrationParamsType} from './authAPI';
import {setIsInitialized, setIsLoading} from "../../app/appReducer";
import {getProfileAC} from "../Profile/profile-reducer";
import {AxiosError} from "axios";
import {errorUtil} from "../../common/utils/errorUtils";


const initialState = {
  isLoggedIn: false
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})


export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

//thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    const res = await authAPI.login(data)
    dispatch(setIsLoggedInAC({isLoggedIn: true}))
    dispatch(getProfileAC({profile: res}))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
  }
}

export const authMeTC = () => async (dispatch:Dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    const res = await authAPI.me()
    dispatch(getProfileAC({profile: res.data}))
    dispatch(setIsLoggedInAC({isLoggedIn: true}))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    dispatch(setIsLoading({isLoading: 'failed'}))
  } finally {
    dispatch(setIsInitialized({isInitialized :true}))
  }
}

export const recPasswordTC = (data: ForgotPasswordType) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await authAPI.forgotPassword(data)
    dispatch(setIsLoading({isLoading: 'succeeded'}))
    return true
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    return false
  }
}


export const registerTC = (data: RegistrationParamsType) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await authAPI.registration(data)
    dispatch(setIsLoading({isLoading: 'succeeded'}))
    return true
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    return false
  }
}

export const createPasswordTC = (data:NewPasswordType) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await authAPI.createPassword(data)
    dispatch(setIsLoading({isLoading: 'succeeded'}))
    return true
  } catch (e) {
    errorUtil(e as AxiosError<{error: string}>, dispatch)
    return false
  }
}
