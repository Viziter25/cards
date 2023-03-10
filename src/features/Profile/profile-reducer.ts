import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import { profileAPI, ProfileType } from "./profileAPI"
import { setIsLoggedInAC } from "../Auth/auth-reducer"
import {errorUtil} from "common/utils/errorUtils";
import {AxiosError} from "axios";
import {setIsLoading} from "app/appReducer";

const slice = createSlice({
    name: 'PROFILE',
    initialState: {} as ProfileType,
    reducers: {
        getProfileAC: (draftState, action: PayloadAction<{profile: ProfileType}>) => {
            return action.payload.profile.avatar ? {...action.payload.profile} : {...action.payload.profile, avatar: ''}
        },
        updateProfileAC: (draftState, action: PayloadAction<{profile: ProfileType}>) => {
            draftState.name = action.payload.profile.name
            draftState.avatar = action.payload.profile.avatar
        },
        logOutAC: () => {
            return ({} as ProfileType)
        },
    }
})

//reducer
export const profileReducer = slice.reducer

//actions
export const {getProfileAC, updateProfileAC, logOutAC} = slice.actions

//thunks
export const updateProfileTC = (name: string, avatar: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading({isLoading: 'loading'}))
    try {
        const res = await profileAPI.updateProfile(name, avatar)
        dispatch(updateProfileAC({profile: res.data.updatedUser}))
        dispatch(setIsLoading({isLoading: 'succeeded'}))
    } catch (e) {
        errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    }
}
export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading({isLoading: 'loading'}))
    try {
        await profileAPI.logOut()
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
        dispatch(logOutAC())
        dispatch(setIsLoading({isLoading: 'succeeded'}))
    } catch (e) {
        errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    }
}
/* export const getProfileTC = () => (dispatch: Dispatch) => {
    profileAPI.getProfile()
        .then(res => {
            dispatch(getProfileAC({profile: res.data}))
        })
        .catch(err => {
            alert(err)
        })
} */