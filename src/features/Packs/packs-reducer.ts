import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {errorUtil} from '../../common/utils/error utils';
import {AxiosError} from 'axios';
import {GetPacksResponseType, PackPostType, packsAPI, PacksQueryParamsType, PackType, PackUpdateType} from './packsAPI';
import {AppThunk} from '../../app/store';
import {RequestStatusType, setIdDisabled, setIsLoading} from '../../app/appReducer';
import {loadState} from "../../common/utils/localStorage";

const initialState = {
  packs: {
    cardPacks: [] as  PackType[],
  } as GetPacksResponseType & {entityStatus: RequestStatusType},
  queryParams: {
    sortPacks: '',
    page: 1,
    pageCount: 10,
    min: 0,
    max: 78,
    packName: '',
    user_id: ''
  }
}

const slice = createSlice({
  name: 'packs',
  initialState: loadState() as typeof initialState || initialState,
  reducers: {
    setPacksAC(state, action:PayloadAction<GetPacksResponseType>) {
      state.packs = {...action.payload, entityStatus: 'idle'}

    },
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
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.packs.entityStatus = action.payload.status
    },
    removeFiltersAC(state, action: PayloadAction<{ emptyFilters: PacksQueryParamsType }>) {
      state.queryParams = action.payload.emptyFilters
    }
  }
})

export const setPacksReducer = slice.reducer
export const {
  setPacksAC,
  setPackNameAC,
  setUserIdAC,
  setSortPacksAC,
  setSliderValuesAC,
  setCurrentPageAC,
  setPageCountAC,
  changeTodolistEntityStatusAC,
  removeFiltersAC
} = slice.actions

//thunks
export const setPacksTC = ():AppThunk => async (dispatch, getState) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  const queryParams = getState().packsPage.queryParams
  try {
    const res = await packsAPI.getPacks(queryParams)
    dispatch(setPacksAC(res.data))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}


export const createPackTC = (data:PackPostType):AppThunk => async (dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  dispatch(changeTodolistEntityStatusAC({status: 'loading'}))
  try {
    await packsAPI.createPack(data)
    dispatch(setIsLoading({isLoading: 'succeeded'}))
    dispatch(setPacksTC())
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}


export const deletePackTC = (data:string):AppThunk => async (dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  dispatch(setIdDisabled({idDisabled: data}))
  try {
    await packsAPI.deletePack(data)
    dispatch(setIsLoading({isLoading: 'succeeded'}))
    dispatch(setPacksTC())
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}

export const updatePackTC = (data:PackUpdateType):AppThunk => async (dispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await packsAPI.updatePack(data)
    dispatch(setIsLoading({isLoading: 'succeeded'}))
    dispatch(setPacksTC())
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}