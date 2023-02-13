import {createAsyncThunk, createSlice, Dispatch} from '@reduxjs/toolkit';
import {errorUtil} from '../../common/utils/error utils';
import {AxiosError} from 'axios';
import {setIsLoggedInAC} from '../Login/auth-reducer';
import {packsAPI, PackType} from '../../api/paksAPI';
import {AppRootStateType} from '../../app/store';


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


const initialState = {
  packs: {
    cardPacks: []as PackType[]
  },
    queryParams: {
    pageCount: 0,
    sortPacks: '',
    min: 0,
    max: 4,
    page: 0,
    packName: '',
    user_id: ''
  }
}


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

const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    setPacksAC(state, action) {
      state.packs = action.payload
    }
  },
  // extraReducers: builder => {
  //  builder.addCase(fetchPacks.fulfilled, (state, action) => {
  //    if(action.payload) state.packs = action.payload.cardPacks
  //  })
  // }
})

export const setPacksReducer = slice.reducer
export const {setPacksAC} = slice.actions


//thunks
export const setPacksTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {

  const {
     packName, sortPacks, user_id,min,max,pageCount,page
  } = getState().packs.queryParams

  try {
    const res = await packsAPI.getPacks({ packName, sortPacks, user_id,min,max,pageCount,page})
    // console.log(res.data.cardPacks)
    dispatch(setIsLoggedInAC({isLoggedIn: true}))
    dispatch(setPacksAC({packs: res.data}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}