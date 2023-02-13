import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})


export const packsAPI = {
  getPacks(data: GetPacksType) {
    return instance.get<GetPacksResponseType>('cards/pack', {params: data})
  },
  createPack(data: PackPostType) {
    return instance.post('cards/pack', {cardsPack: data})
  },
  deletePack(packId: string) {
    return instance.delete('cards/pack',{params: {id: packId}})
  },
  updatePack(data: PackUpdateType) {
    return instance.put('cards/pack', {cardsPack: data})
  }
}









// types
export type GetPacksType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string // чьи колоды не обязательно, или придут все
  block?: boolean
}

export type GetPacksResponseType = {
  cardPacks: PackType[]
  page: number // На какой стр находишься
  pageCount: number// количество колод на странице
  cardPacksTotalCount: number // количество колод
  minCardsCount: number
  maxCardsCount: number // всего стр
}

export type PackType = {
  _id: string // id колоды
  user_id: string // id user  который создал колоду
  user_name: string
  private: boolean
  name: 'test pack' // название колоды
  cardsCount: 0 // кол-во карточек в колоде
  created: string
  updated: string
}

type PackUpdateType = {
  _id: string
  name?: string
}

type PackPostType = {
  name?: string
  deckCover?: string
  private: boolean
}
