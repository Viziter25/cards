import axios, { AxiosResponse } from 'axios'

//instance
const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

//api
export const packsAPI = {
    getPacks(data: DataType) {
        return instance.get<'', AxiosResponse<PacksType>>(`cards/pack`, {params: data})
    },
}

// types
export type PacksType = {
    cardPacks: Array<PackType> 
    cardPacksTotalCount: number // количество колод 
    maxCardsCount: number 
    minCardsCount: number 
    page: number                // выбранная страница 
    pageCount: number           // количество элементов на странице
}
export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    deckCover: string
    grade: number
    more_id: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    user_name: string
    __v: number
}
export type DataType = {
    packName: string | null    // не обязательно 
    min?: number | null         // не обязательно 
    max?: number | null         // не обязательно 
    sortPacks?: string | null   // не обязательно 
    page?: number | null        // не обязательно 
    pageCount?: number | null   // не обязательно 
    user_id?: string | null     // чьи колоды не обязательно, или придут все
    block?: boolean | null
}