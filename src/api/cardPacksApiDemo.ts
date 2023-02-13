import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})

export const cardPacksApiDemo = {
  createPack(data: PackPostType) {
    return instance.post('cards/pack', {cardsPack: data})
  },
  deletePack(packId: string) { //доделать
    return instance.delete('cards/pack')
  },
  updatePack(data: PackUpdateType) {
    return instance.put('cards/pack', {cardsPack: data})
  }

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
