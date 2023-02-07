import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginType} from "../../api/authAPI";
import {setError} from "../../app/appReducer";

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
    await authAPI.login(data)
    dispatch(setIsLoggedInAC({isLoggedIn: true}))
  } catch (e) {
    //доделать после маржа
    dispatch(setError({error: 'some error'}))
  }
}