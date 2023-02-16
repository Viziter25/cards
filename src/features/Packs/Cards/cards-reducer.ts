import {cardApi, CardsResponseType, CardsType} from "../../../api/cardsAPI";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoading} from "../../../app/appReducer";
import {AppRootStateType} from "../../../app/store";
import {errorUtil} from "../../../common/utils/error utils";
import {AxiosError} from "axios";

const initialState = {
  cards: {
    cards: [] as CardsType[]
  } as CardsResponseType,
  queryParams: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 1,
    sortCards: '',
    page: 1,
    pageCount: 4
  }
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
    },
    setCurrentCardsPageAC(state, action: PayloadAction<{currentPage: number}>){
      state.queryParams.page = action.payload.currentPage
    },
    setPageCardsCountAC(state, action: PayloadAction<{pageCount: number}>){
      state.queryParams.pageCount = action.payload.pageCount
    }
  }
})

export const cardsReducer = slice.reducer
export const {setCardsAC, setSortCardsAC, setQuestion, setCurrentCardsPageAC, setPageCardsCountAC} = slice.actions

export const setCardsTC = (cardsPack_id: string) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(setIsLoading({isLoading: 'loading'}))
  const {
    cardAnswer,
    cardQuestion,
    min,
    max,
    sortCards,
    page,
    pageCount
  } = getState().cardsPage.queryParams

  try {
    const res = await cardApi.getCards({cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount})
    dispatch(setCardsAC({cards: res}))
    dispatch(setIsLoading({isLoading: 'succeeded'}))
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
}