import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  error: null as null | string
}

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setError(state, action: PayloadAction<{error: null | string}>) {
      state.error = action.payload.error
    },
    setIsInitialized(state, action: PayloadAction<{isInitialized: boolean}>) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const appReducer = slice.reducer
export const {setError, setIsInitialized} = slice.actions
