import {instance} from '../../../common/constants/instanceAPI';
import {AxiosResponse} from 'axios';


export const cardsApi = {
  getCards(data: QueryParamsCardsType) {
    return instance.get<CardsResponseType>('cards/card', {params: data})
  },
  createCard(data: PostCardType) {
    return instance.post<'',AxiosResponse, {card:PostCardType}>('cards/card', {card: data})
  },
  updateCard(data: UpdateCardType) {
    return instance.put<'', AxiosResponse, {card:UpdateCardType}>('cards/card', {card: data})
  },
  deleteCard(cardId: string) {
    return instance.delete('cards/card', {params: {id: cardId}})
  },
  updatedGrade(data: UpdatedGradeType) {
    return instance.put<'', AxiosResponse, UpdatedGradeType>('cards/grade', data)
  },
}


export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
export type CardsResponseType = {
  cards: Array<CardType>
  packUserId: string,
  packName: string,
  packPrivate: boolean,
  packCreated: string,
  packUpdated: string,
  page: number,
  pageCount: number,
  cardsTotalCount: number,
  minGrade: number,
  maxGrade: number,
  token: string,
  tokenDeathTime: number
}
export type QueryParamsCardsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
export type PostCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}
export type UpdateCardType = {
  _id: string
  question?: string
}
export type UpdatedGradeType = { 
  card_id: string
  grade: number
}