import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profileAPI, ProfileType } from "./profileAPI"
import { AppDispatchType } from "./store"

//удалить после мержа
export const initState:ProfileType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: ''
}
//удалить после мержа

//использовать после мержа
//export const initState = {} as ProfileType

const slice = createSlice({
    name: 'PROFILE',
    initialState: initState,
    reducers: {
        getProfileAC: (draftState, action: PayloadAction<{profile: ProfileType}>) => {
            return {...action.payload.profile}
        },
        //переделать после мержа
        updateProfileAC: (draftState, action: PayloadAction<{name: string, avatar: string}>) => {
            draftState.name = action.payload.name
            draftState.avatar = action.payload.avatar
        },
        //переделать после мержа
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
export const getProfileTC = () => (dispatch: AppDispatchType) => {
    //profileAPI.getProfile()
    //    .then()
    //   .catch()
}
export const updateProfileTC = (name: string, avatar: string) => (dispatch: AppDispatchType) => {
    
    //удалить после мержа
    dispatch(updateProfileAC({name, avatar}))

    //использовать после мержа
    //profileAPI.updateProfile(name, avatar)
    //    .then()
    //    .catch()
}
export const logOutTC = () => (dispatch: AppDispatchType) => {
    //profileAPI.logOut()
    //    .then()
    //    .catch()
}