import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {errorUtil} from '../../common/utils/error utils';
import {AxiosError} from 'axios';
import {GetPacksResponseType, PackPostType, packsAPI, PackType, PackUpdateType} from '../../api/packsAPI';
import {AppRootStateType, AppThunkDispatch} from '../../app/store';
import {RequestStatusType, setIdDisabled, setIsLoading} from '../../app/appReducer';


// type InitState = {
//   packs: PackType[],
//   queryParams: {
//     pageCount:number
//     sort:string
//     page:number
//     packName:string
//     isMyPacks: boolean
//     min:number
//     max:number
//     userId: null
//   }
// }

// export const fetchPacks = createAsyncThunk(
//   'packs/fetchByIdStatus',
//   async (params: {}, {dispatch, getState}) => {
//     try {
//       const {data} = await packsAPI.getPacks(params)
//       return  data
//     } catch (e: any) {
//
//     }
//   }
// )


const initialState = {
  packs: {
    cardPacks: [] as  PackType[],
    page: null as unknown as number,
    pageCount: null as unknown as number,
    cardPacksTotalCount: null as unknown as number,
    minCardsCount: null as unknown as number,
    maxCardsCount: null as unknown as number,
    entityStatus: 'idle' as RequestStatusType
  },
  queryParams: {
    pageCount: null as unknown as number,
    sortPacks: null as unknown as string,
    min: null as unknown as number,
    max: null as unknown as number,
    page: null as unknown as number,
    packName: null as unknown as string,
    user_id: null as unknown as string,
  }
}


const slice = createSlice({
  name: 'packs',
  initialState: initialState,
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
    }
  },
  // extraReducers: builder => {
  //  builder.addCase(fetchPacks.fulfilled, (state, action) => {
  //    if(action.payload) state.packs = action.payload
  //  })
  // }
})

export const setPacksReducer = slice.reducer
export const {setPacksAC, setPackNameAC, setUserIdAC, setSortPacksAC, setSliderValuesAC, setCurrentPageAC, setPageCountAC, changeTodolistEntityStatusAC} = slice.actions


//thunks
export const setPacksTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  const {
    packName,
    sortPacks,
    user_id,
    min,
    max,
    pageCount,
    page
  } = getState().packsPage.queryParams

  try {
    const res = await packsAPI.getPacks({packName, sortPacks, user_id, min, max, pageCount, page})
    dispatch(setPacksAC(res.data))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}


export const createPackTC = (data:PackPostType) => async (dispatch:AppThunkDispatch) => {
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


export const deletePackTC = (data:string) => async (dispatch: AppThunkDispatch) => {
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

export const updatePackTC = (data:PackUpdateType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await packsAPI.updatePack(data)
    dispatch(setIsLoading({isLoading: 'succeeded'}))
    dispatch(setPacksTC())
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}