import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { profileAPI, ProfileType } from "./profileAPI"
import { authMeTC, loginTC } from "features/Auth/auth-reducer"
import { errorUtil } from "common/utils/errorUtil"

//async thunks
export const updateProfileTC = createAsyncThunk("profile/updateProfile", async (params: {name: string, avatar: string}, thunkAPI) => {
    try {
        const res = await profileAPI.updateProfile(params.name, params.avatar)
        return {isLoading: 'succeeded', profile: res.data.updatedUser}
    } catch (e) {
        errorUtil(e as Error | AxiosError<{error: string}>, thunkAPI.dispatch)
    }
})
export const logOutTC = createAsyncThunk("profile/logOut", async (params, thunkAPI) => {
    try {
        await profileAPI.logOut()
        return {isLoading: 'succeeded', isLoggedIn: false}
    } catch (e) {
        errorUtil(e as Error | AxiosError<{error: string}>, thunkAPI.dispatch)
    }
})

const slice = createSlice({
    name: 'profile',
    initialState: {} as ProfileType,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginTC.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload.profile.avatar ? {...action.payload.profile} : {...action.payload.profile, avatar: ''}
            }
        })
        .addCase(authMeTC.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload.profile.avatar ? {...action.payload.profile} : {...action.payload.profile, avatar: ''}
            }
        })
        .addCase(updateProfileTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.name = action.payload.profile.name
                state.avatar = action.payload.profile.avatar
            }
        })
        .addCase(logOutTC.fulfilled, (state, action) => {
            if (action.payload) {
                return ({} as ProfileType)
            }
        })
    },
})

//reducer
export const profileReducer = slice.reducer