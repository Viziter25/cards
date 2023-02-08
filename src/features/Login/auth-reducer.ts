import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, ForgotPasswordType, LoginType, NewPasswordType} from '../../api/authAPI';
import {setError, setIsInitialized} from "../../app/appReducer";
import {getProfileAC} from "../Profile/profile-reducer";
import axios, {AxiosError} from "axios";

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
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(setError({error}))
    } else {
      dispatch(setError({error: `native error ${err.message}` }))
    }
  }
}

export const authMeTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me()
    dispatch(getProfileAC({profile: res.data}))
    dispatch(setIsLoggedInAC({isLoggedIn: true}))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(setError({error}))
    } else {
      dispatch(setError({error: `native error ${err.message}` }))
    }
  } finally {
    dispatch(setIsInitialized({isInitialized :true}))
  }
}

export const recPasswordTC = (data: ForgotPasswordType) => async (dispatch: Dispatch) => {
  try {
    await authAPI.forgotPassword(data)
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(setError({error}))
    } else {
      dispatch(setError({error: `native error ${err.message}` }))
    }
    return err
  }
}

export const createPasswordTC = (data:NewPasswordType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.createPassword(data)
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(setError({error}))
    } else {
      dispatch(setError({error: `native error ${err.message}` }))
    }
    return err
  }
}
