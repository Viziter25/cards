import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {errorUtil} from 'common/utils/errorUtil'
import {AxiosError} from 'axios'
import {GetPacksResponseType, PackPostType, packsAPI, PacksQueryParamsType, PackType, PackUpdateType} from './packsAPI'
import {AppRootStateType} from 'app/store'
import {RequestStatusType, setIdDisabled} from 'app/appReducer'
import {loadState} from "../../common/utils/localStorage"
import {getCardsTC} from "./Cards/cards-reducer"

//async thunks
export const setPacksTC = createAsyncThunk("packs/setPacks", async (_, {getState, dispatch}) => {
  const {max, min, packName, page, pageCount, sortPacks, user_id} = (getState() as AppRootStateType).packsPage.queryParams
  try {
    const res = await packsAPI.getPacks({max, min, packName, page, pageCount, sortPacks, user_id})
    return {isLoading: 'succeeded', packs: res.data}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
})

export const createPackTC = createAsyncThunk("packs/createPack", async (data: PackPostType, thunkAPI) => {
  try {
    await packsAPI.createPack(data)
    thunkAPI.dispatch(setPacksTC())
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, thunkAPI.dispatch)
  }
})

export const deletePackTC = createAsyncThunk("packs/deletePack", async (packId:string, thunkAPI) => {
  try {
    thunkAPI.dispatch(setIdDisabled({idDisabled: packId}))
    await packsAPI.deletePack(packId)
    thunkAPI.dispatch(setPacksTC())
    return {isLoading: 'succeeded', idDisabled: ''}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, thunkAPI.dispatch)
  }
})

export const updatePackTC =  createAsyncThunk("packs/updatePack", async (data:PackUpdateType, thunkAPI) => {
  try {
    await packsAPI.updatePack(data)
    thunkAPI.dispatch(setPacksTC())
    thunkAPI.dispatch(getCardsTC(data._id))
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, thunkAPI.dispatch)
  }
})

const initialState = {
  packs: {
    cardPacks: [] as  PackType[],
  } as GetPacksResponseType & {entityStatus: RequestStatusType},
  queryParams: {} as PacksQueryParamsType
}

const slice = createSlice({
  name: 'packs',
  initialState: loadState() as typeof initialState || initialState,
  reducers: {
    setPackNameAC(state, action: PayloadAction<{ packName: string }>) {
      state.queryParams.packName = action.payload.packName
    },
    setUserIdAC(state, action: PayloadAction<{userId: string}>) {
      state.queryParams.user_id = action.payload.userId
    },
    setSortPacksAC(state, action: PayloadAction<{sortBy: string}>){
      state.queryParams.sortPacks = action.payload.sortBy
    },
    setSliderValuesAC(state, action: PayloadAction<{sliderValues: number[]}>){
      state.queryParams.min = action.payload.sliderValues[0]
      state.queryParams.max = action.payload.sliderValues[1]
    },
    setCurrentPageAC(state, action: PayloadAction<{currentPage: number}>){
      state.queryParams.page = action.payload.currentPage
    },
    setPageCountAC(state, action: PayloadAction<{pageCount: number}>){
      state.queryParams.pageCount = action.payload.pageCount
    },
    removeFiltersAC(state, action: PayloadAction<{ emptyFilters: PacksQueryParamsType }>) {
      state.queryParams = action.payload.emptyFilters
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(setPacksTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.packs = {...action.payload.packs, entityStatus: 'idle'}
      }
    })
  },
})

export const packsReducer = slice.reducer
export const {
  setPackNameAC, setUserIdAC, setSortPacksAC, setSliderValuesAC, setCurrentPageAC, setPageCountAC, removeFiltersAC
} = slice.actions