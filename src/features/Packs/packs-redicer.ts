import {createAsyncThunk, createSlice, Dispatch} from '@reduxjs/toolkit';
import {errorUtil} from '../../common/utils/error utils';
import {AxiosError} from 'axios';
import {setIsLoggedInAC} from '../Login/auth-reducer';
import {packsAPI, PackType} from '../../api/paksAPI';


type InitState = {
  packs: PackType[]
}


const initialState: InitState = {
  packs: []
}


export const fetchPacks = createAsyncThunk(
  'packs/fetchByIdStatus',
  async (params: {}, {dispatch, getState}) => {
    try {
      const {data} = await packsAPI.getPacks(params)
      return  data
    } catch (e: any) {

    }


  }
)

const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    // setPacksAC(state, action) {
    //   state.packs = action.payload
    // }
  },
   extraReducers: builder => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      if(action.payload) state.packs = action.payload.cardPacks
    })
   }
})

export const setPacksReducer = slice.reducer
//export const {setPacksAC} = slice.actions


//thunks
// export const setPacksTC = (data: any) => async (dispatch: Dispatch) => {
//   try {
//     const res = await packsAPI.getPacks(data)
//     // console.log(res.data.cardPacks)
//     dispatch(setIsLoggedInAC({isLoggedIn: true}))
//     dispatch(setPacksAC({packs: res.data}))
//   } catch (e) {
//     errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
//   }
// }