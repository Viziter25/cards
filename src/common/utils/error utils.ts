import {AxiosError} from "axios";
import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";
import {setError} from "../../app/appReducer";

export const errorUtil = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message
    dispatch(setError({error}))
  } else {
    dispatch(setError({error: `native error ${err.message}` }))
  }
}