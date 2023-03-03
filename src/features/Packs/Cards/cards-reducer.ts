import {cardsApi, CardsResponseType, CardType, PostCardType, UpdateCardType, UpdatedGradeType} from "./cardsAPI"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {setIsLoading} from "app/appReducer"
import {AppRootStateType, AppThunk} from 'app/store'
import {errorUtil} from "common/utils/errorUtil"
import {AxiosError} from "axios"

//async thunks
export const getCardsTC = createAsyncThunk("cards/getCards", async (cardsPack_id: string, {getState, dispatch}) => {
  const {cardAnswer, cardQuestion, min, max, sortCards, page, pageCount} = (getState() as AppRootStateType).cardsPage.queryParams
  try {
    const res = await cardsApi.getCards({cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount})
    return {isLoading: 'succeeded', cards: res.data}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, dispatch)
  }
})

export const createCardTC = createAsyncThunk("cards/createCard", async (params: {packId:string, data: PostCardType}, thunkAPI) => {
  try {
    await cardsApi.createCard(params.data)
    thunkAPI.dispatch(getCardsTC(params.packId))
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, thunkAPI.dispatch)
  }
})

export const updateCardTC = createAsyncThunk("cards/updateCard", async (params: {packId:string, data: UpdateCardType}, thunkAPI) => {
  try {
    await cardsApi.updateCard(params.data)
    thunkAPI.dispatch(getCardsTC(params.packId))
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, thunkAPI.dispatch)
  }
})

export const deleteCardTC = createAsyncThunk("cards/deleteCard", async (params: {packId:string, cardId: string}, thunkAPI) => {
  try {
    await cardsApi.deleteCard(params.cardId)
    thunkAPI.dispatch(getCardsTC(params.packId))
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, thunkAPI.dispatch)
  }
})

export const updateGradeTC = createAsyncThunk("cards/updateGrade", async (params: {packId:string, data: UpdatedGradeType}, thunkAPI) => {
  try {
    await cardsApi.updatedGrade(params.data)
    thunkAPI.dispatch(getCardsTC(params.packId))
    return {isLoading: 'succeeded'}
  } catch (e) {
    errorUtil(e as Error | AxiosError<{ error: string }>, thunkAPI.dispatch)
  }
})

const initialState = {
  cards: {cards: [] as CardType[]} as CardsResponseType,
  queryParams: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0,
    sortCards: '',
    page: 1,
    pageCount: 10
  }
}

const slice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCardsTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.cards = action.payload.cards
      }
    })
  },
})

export const cardsReducer = slice.reducer
export const {setSortCardsAC, setQuestion, setCurrentCardsPageAC, setPageCardsCountAC} = slice.actions