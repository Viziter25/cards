import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  isLoading: 'idle' as RequestStatusType,
  error: null as null | string,
  idDisabled: ''
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
    },
    setIsLoading(state, action: PayloadAction<{isLoading: RequestStatusType}>) {
      state.isLoading = action.payload.isLoading
    },
    setIdDisabled(state, action:PayloadAction<{idDisabled: string}> ) {
      state.idDisabled = action.payload.idDisabled
    }
  }
})

export const appReducer = slice.reducer
export const {setError, setIsInitialized, setIsLoading, setIdDisabled} = slice.actions


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
