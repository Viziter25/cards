import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import { profileAPI, ProfileType } from "../../api/profileAPI"
import { setIsLoggedInAC } from "../Login/auth-reducer"

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
/*export const getProfileTC = () => (dispatch: Dispatch) => {
    profileAPI.getProfile()
        .then(res => {
            dispatch(getProfileAC({profile: res.data}))
        })
        .catch(err => {
            alert(err)
        })
}*/
export const updateProfileTC = (name: string, avatar: string) => (dispatch: Dispatch) => {
    profileAPI.updateProfile(name, avatar)
        .then(res => {
            dispatch(getProfileAC({profile: res.data.updatedUser}))
        })
        .catch(err => {
            alert(err)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    profileAPI.logOut()
        .then(res => {
            if(res.status === 200) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                dispatch(logOutAC())
            }
        })
        .catch(err => {
            alert(err)
        })
}