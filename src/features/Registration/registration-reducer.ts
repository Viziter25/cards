import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {registrAPI} from '../../api/registrAPI';
import {errorUtil} from "../../common/utils/error utils";
import {AxiosError} from "axios";

const initialState = {
  isRegistrationIn: false
}

const slice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    registerAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isRegistrationIn = action.payload.value
    }
  }
})

export const registerReducer = slice.reducer
export const {registerAC} = slice.actions

export const registerTC = (data: any) => async (dispatch: Dispatch) => {

  try {
    await registrAPI.registration(data)
    dispatch(registerAC({value: true}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
  }
}


