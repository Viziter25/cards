import {RequestStatusType} from '../../app/appReducer';
import {instance} from '../../common/constants/instanceAPI';



export const packsAPI = {
  getPacks(data: GetPacksType) {
    return instance.get<GetPacksResponseType>('cards/pack', {params: data})
  },
  createPack(data: PackPostType) {
    return instance.post<CreatePackResponseType>('cards/pack', {cardsPack: data})
  },
  deletePack(packId: string) {
    return instance.delete<DeletePackResponseType>('cards/pack',{params: {id: packId}})
  },
  updatePack(data: PackUpdateType) {
    return instance.put<UpdatePackResponseType>('cards/pack', {cardsPack: data})
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
  name: string // название колоды
  cardsCount: number // кол-во карточек в колоде
  created: string
  updated: string
  entityStatus: RequestStatusType
}

export type PackUpdateType = {
  _id: string
  name?: string
}

export type UpdatePackResponseType = {
  updatedCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}

export type PackPostType = {
  name?: string
  deckCover?: string
  private: boolean
}

export type CreatePackResponseType = {
  newCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}




export type DeletePackResponseType = {
  deletedCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }
}

export type PacksQueryParamsType = {
  pageCount: number
  sortPacks: string
  min: number
  max: number
  page: number
  packName: string
  user_id: string
  minLocalValue: number
  maxLocalValue: number
}

