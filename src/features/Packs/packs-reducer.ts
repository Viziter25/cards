import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import {errorUtil} from "../../common/utils/error utils"
import {AxiosError} from "axios"
import { DataType, packsAPI, PacksType, PackType } from "../../api/packsAPI"
import { AppRootStateType } from "../../app/store"

export const initState = {
    //packs: {} as PacksType,
    //data: {} as DataType
    packs: {
        cardPacks: [] as Array<PackType> ,
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
    },
    data: {
        packName: null,
        min: 10,
        max: null,
        sortPacks: null,
        page: 5,
        pageCount: 50,
        user_id: null,
        block: null
    }
}

const slice = createSlice({
    name: 'PACKS',
    initialState: initState,
    reducers: {
        getPacksAC: (draftState, action: PayloadAction<{packs: PacksType}>) => {
            draftState.packs.cardPacks = action.payload.packs.cardPacks
        },
    }
})

//reducer
export const packsReducer = slice.reducer

//actions
export const {getPacksAC} = slice.actions

//thunks
export const getPacksTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const data = getState().packs.data
    try {
        const res = await packsAPI.getPacks(data)
        console.log(res)
        dispatch(getPacksAC({packs: res.data}))
    } catch (e) {
        errorUtil(e as Error | AxiosError<{error: string}>, dispatch)
    }
}