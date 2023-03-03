import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {authAPI, ForgotPasswordType, LoginType, NewPasswordType, RegistrationParamsType} from './authAPI'
import {logOutTC} from "features/Profile/profile-reducer"
import {AxiosError} from "axios"
import {errorUtil} from "common/utils/errorUtil"

//async thunks
export const authMeTC = createAsyncThunk("auth/authMe", async (params, thunkAPI) => {
  try {
    const res = await authAPI.me()
    return {isLoading: 'succeeded', isLoggedIn: true, isInitialized: true, profile: res.data}
  } catch (e) {
    return thunkAPI.rejectWithValue ({isLoading: 'failed', isInitialized: true})
  }
})

export const registerTC = createAsyncThunk("auth/register", async (params: {registerData: RegistrationParamsType}, thunkAPI) => {
  try {
    await authAPI.registration(params.registerData)
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, thunkAPI.dispatch)
  }
})

export const loginTC = createAsyncThunk("auth/login", async (params: {loginData: LoginType}, thunkAPI) => {
  try {
    const res = await authAPI.login(params.loginData)
    return {isLoading: 'succeeded', isLoggedIn: true, profile: res}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, thunkAPI.dispatch)
  }
})

export const recPasswordTC = createAsyncThunk("auth/recPassword", async (params: {data: ForgotPasswordType}, thunkAPI) => {
  try {
    await authAPI.forgotPassword(params.data)
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, thunkAPI.dispatch)
  }
})

export const createPasswordTC = createAsyncThunk("auth/createPassword", async (params: {data: NewPasswordType}, thunkAPI) => {
  try {
    await authAPI.createPassword(params.data)
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as AxiosError<{error: string}>, thunkAPI.dispatch)
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {isLoggedIn: false},
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(authMeTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoggedIn = action.payload.isLoggedIn}
    })
    .addCase(loginTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoggedIn = action.payload.isLoggedIn}
    })
    .addCase(logOutTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoggedIn = action.payload.isLoggedIn}
    })
  },
})

export const authReducer = slice.reducer