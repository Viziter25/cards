import thunkMiddlewear from 'redux-thunk'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { profileReducer } from './profile-reducer'

const rootReduser = combineReducers({
    profile: profileReducer,
})

export const store = configureStore({
    reducer: rootReduser,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddlewear)
})
export type AppStateType = ReturnType<typeof rootReduser>
export type AppDispatchType = typeof store.dispatch