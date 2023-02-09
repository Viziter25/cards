import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, ForgotPasswordType, LoginType, NewPasswordType} from '../../api/authAPI';
import {setIsInitialized} from "../../app/appReducer";
import {getProfileAC} from "../Profile/profile-reducer";
import {AxiosError} from "axios";
import {errorUtil} from "../../common/utils/error utils";
import {registrAPI} from '../../api/registrAPI';

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
  try {
    const res = await authAPI.login(data)
    dispatch(setIsLoggedInAC({isLoggedIn: true}))
    dispatch(getProfileAC({profile: res}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
  }
}

export const authMeTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me()
    dispatch(getProfileAC({profile: res.data}))
    dispatch(setIsLoggedInAC({isLoggedIn: true}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
  } finally {
    dispatch(setIsInitialized({isInitialized :true}))
  }
}

export const recPasswordTC = (data: ForgotPasswordType) => async (dispatch: Dispatch) => {
  try {
    await authAPI.forgotPassword(data)
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    return e
  }
}


export const registerTC = (data: any) => async (dispatch: Dispatch) => {

  try {
    await registrAPI.registration(data)
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    return e
  }
}

export const createPasswordTC = (data:NewPasswordType) => async (dispatch: Dispatch) => {
  try {
    await authAPI.createPassword(data)
  } catch (e) {
    errorUtil(e as AxiosError<{error: string}>, dispatch)
    return e
  }
}
