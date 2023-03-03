import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { authMeTC, createPasswordTC, loginTC, recPasswordTC, registerTC } from "features/Auth/auth-reducer"
import { createCardTC, deleteCardTC, getCardsTC, updateCardTC, updateGradeTC } from "features/Packs/Cards/cards-reducer"
import { createPackTC, deletePackTC, setPacksTC, updatePackTC } from "features/Packs/packs-reducer"
import { logOutTC, updateProfileTC } from "features/Profile/profile-reducer"

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
    setIsLoading(state, action: PayloadAction<{isLoading: RequestStatusType}>) {
      state.isLoading = action.payload.isLoading
    },
    setIdDisabled(state, action:PayloadAction<{idDisabled: string}> ) {
      state.idDisabled = action.payload.idDisabled
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(authMeTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(authMeTC.fulfilled, (state, action) => {
      if(action.payload) {
        state.isLoading = action.payload.isLoading as RequestStatusType
        state.isInitialized = action.payload.isInitialized
      }
    })
    .addCase(authMeTC.rejected, (state, action: PayloadAction<any>) => {
      if(action.payload) {
        state.isLoading = action.payload.isLoading as RequestStatusType
        state.isInitialized = action.payload.isInitialized
      }
    })

    .addCase(registerTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(registerTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(loginTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(loginTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(recPasswordTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(recPasswordTC.fulfilled, (state, action) => {
      if(action.payload) {
        state.isLoading = action.payload.isLoading as RequestStatusType
      }
    })

    .addCase(createPasswordTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(createPasswordTC.fulfilled, (state, action) => {
      if(action.payload) {
        state.isLoading = action.payload.isLoading as RequestStatusType
      }
    })

    .addCase(updateProfileTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(updateProfileTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(logOutTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(logOutTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(setPacksTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(setPacksTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(createPackTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(createPackTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(deletePackTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(deletePackTC.fulfilled, (state, action) => {
      if(action.payload) {
        state.isLoading = action.payload.isLoading as RequestStatusType
        state.idDisabled = ''
      }
    })

    .addCase(updatePackTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(updatePackTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(getCardsTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(getCardsTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(createCardTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(createCardTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(updateCardTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(updateCardTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(deleteCardTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(deleteCardTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })

    .addCase(updateGradeTC.pending, (state) => {state.isLoading = 'loading'})
    .addCase(updateGradeTC.fulfilled, (state, action) => {
      if(action.payload) {state.isLoading = action.payload.isLoading as RequestStatusType}
    })
},
})

export const appReducer = slice.reducer
export const {setError, setIsLoading, setIdDisabled} = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'