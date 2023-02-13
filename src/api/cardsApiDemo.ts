import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})

export const cardPacksApiDemo = {
  getCards(data: queryParamsCardsType) {
    return instance.get<CardsResponseType>('cards/card')
      .then(res => res.data.cards)
  },
  createCard(data: PostCardType) {
    return instance.post('cards/card', {card: data})
  },
  deleteCard(cardId: string) { // доделать
    return instance.delete('cards/card')
  },
  updateCard(data: UpdateCardType) {
    return instance.put('cards/card', {card: data})
  }
}

type CardsResponseType = {
  cards: Array<CardsType>
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

type CardsType = {
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

type queryParamsCardsType = {
  cardAnswer?:string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

type UpdateCardType = {
  _id: string
  question?: string
}

type PostCardType = {
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
