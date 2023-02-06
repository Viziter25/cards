import {createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {registrAPI} from '../../api/registrAPI';

const initialState = {
  isRegistrationIn: false,
  error: ''
}

const slice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    registerAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isRegistrationIn = action.payload.value
    },
    setErrorAC(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error

    }
  }
})

export const registerReducer = slice.reducer
export const {registerAC, setErrorAC} = slice.actions


export  const registerTC = (data:any) => (dispatch: Dispatch) => {
  registrAPI.registration(data)
    .then(res => {
      console.log(res)
      dispatch(registerAC({value: true}))
    })
    .catch(error => {
      // alert(error.response.data.error)
      dispatch(setErrorAC({error: error.response.data.error}))
    })
}


