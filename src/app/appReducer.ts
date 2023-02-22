import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  isLoading: 'idle' as RequestStatusType,
  error: null as null | string,
  idDisabled: '',
  isOpen: false,
  buttonName: ''
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
    },
    isOpenModal(state, action:PayloadAction<{ isOpen: boolean  }> ) {
      state.isOpen = action.payload.isOpen
    },
    buttonModal(state, action:PayloadAction<{ buttonName: string  }> ) {
      state.buttonName = action.payload.buttonName
    }
  }
})

export const appReducer = slice.reducer
export const {setError, setIsInitialized, setIsLoading, setIdDisabled, isOpenModal, buttonModal} = slice.actions


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
