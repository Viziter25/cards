import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import { profileAPI, ProfileType } from "../../api/profileAPI"
import { setIsLoggedInAC } from "../Login/auth-reducer"
import {errorUtil} from "../../common/utils/error utils";
import {AxiosError} from "axios";

export const initState = {} as ProfileType

const slice = createSlice({
    name: 'PROFILE',
    initialState: initState,
    reducers: {
        getProfileAC: (draftState, action: PayloadAction<{profile: ProfileType}>) => {
            return action.payload.profile.avatar ? {...action.payload.profile} : {...action.payload.profile, avatar: ''}
        },
        updateProfileAC: (draftState, action: PayloadAction<{profile: ProfileType}>) => {
            draftState.name = action.payload.profile.name
            draftState.avatar = action.payload.profile.avatar
        },
        logOutAC: (draftState, action: PayloadAction) => {
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

    try {
        const res = await profileAPI.updateProfile(name, avatar)
        dispatch(updateProfileAC({profile: res.data.updatedUser}))
    } catch (e) {
        errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    }
}
export const logOutTC = () => async (dispatch: Dispatch) => {

    try {
        await profileAPI.logOut()
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
        dispatch(logOutAC())
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