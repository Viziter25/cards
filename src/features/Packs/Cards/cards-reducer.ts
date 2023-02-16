import {cardsApi, CardsResponseType, CardType, PostCardType, QueryParamsCardsType, UpdateCardType} from "../../../api/cardsAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoading} from "../../../app/appReducer";
import {AppRootStateType, AppThunkDispatch} from "../../../app/store";
import {errorUtil} from "../../../common/utils/error utils";
import {AxiosError} from "axios";

const initialState = {
  cards: {cards: [] as CardType[]} as CardsResponseType,
  queryParams: {} as QueryParamsCardsType
}

const slice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setCardsAC(state, action: PayloadAction<{cards: CardsResponseType}>) {
      state.cards = action.payload.cards
    },
    setSortCardsAC(state, action: PayloadAction<{sortBy: string}>){
      state.queryParams.sortCards = action.payload.sortBy
    },
    setQuestion(state, action: PayloadAction<{question: string }>) {
      state.queryParams.cardQuestion = action.payload.question
    }
  }
})

export const cardsReducer = slice.reducer
export const {setCardsAC, setSortCardsAC, setQuestion} = slice.actions

export const getCardsTC = (cardsPack_id: string) => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  const {cardAnswer, cardQuestion, min, max, sortCards, page, pageCount} = getState().cardsPage.queryParams
  try {
    const res = await cardsApi.getCards({cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount})
    dispatch(setCardsAC({cards: res.data}))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}

export const createCardTC = (packId:string, data: PostCardType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await cardsApi.createCard(data)
    dispatch(getCardsTC(packId))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}
export const updateCardTC = (packId:string, data: UpdateCardType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await cardsApi.updateCard(data)
    dispatch(getCardsTC(packId))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}
export const deleteCardTC = (packId:string, cardId: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  try {
    await cardsApi.deleteCard(cardId)
    dispatch(getCardsTC(packId))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}