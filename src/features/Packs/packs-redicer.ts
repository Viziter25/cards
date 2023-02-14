import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {errorUtil} from '../../common/utils/error utils';
import {AxiosError} from 'axios';
import {GetPacksResponseType, PackPostType, packsAPI, PackType, PackUpdateType} from '../../api/packsAPI';
import {AppRootStateType, AppThunkDispatch} from '../../app/store';


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
  },
  queryParams: {
    pageCount: 10,
    sortPacks: '0updated',
    min: 0,
    max: 4,
    page: 1,
    packName: '',
    user_id: ''
  }
}


const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    setPacksAC(state, action:PayloadAction<GetPacksResponseType>) {
      state.packs = action.payload
    }
  },
  // extraReducers: builder => {
  //  builder.addCase(fetchPacks.fulfilled, (state, action) => {
  //    if(action.payload) state.packs = action.payload
  //  })
  // }
})

export const setPacksReducer = slice.reducer
export const {setPacksAC} = slice.actions


//thunks
export const setPacksTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}


export const createPackTC = (data:PackPostType) => async (dispatch:AppThunkDispatch) => {
  try {
    const res = await packsAPI.createPack(data)

    dispatch(setPacksTC())
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}


export const deletePackTC = (data:string) => async (dispatch: AppThunkDispatch) => {
  try {
    const res = await packsAPI.deletePack(data)

    dispatch(setPacksTC())
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}

export const updatePackTC = (data:PackUpdateType) => async (dispatch: AppThunkDispatch) => {
  try {
    const res = await packsAPI.updatePack(data)

    dispatch(setPacksTC())
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}