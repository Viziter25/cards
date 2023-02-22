import {AppRootStateType} from "../../app/store";

export const saveState = (state: AppRootStateType) => {
  localStorage.setItem('packs', JSON.stringify(state.packsPage))
}

export const loadState = () => {
  const allLocalStorageState = localStorage.getItem('packs')
  if (allLocalStorageState) {
    return JSON.parse(allLocalStorageState)
  }
}