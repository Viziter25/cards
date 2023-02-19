import {AppRootStateType} from '../../../app/store';

export const packs = (state: AppRootStateType) => state.packsPage.packs.cardPacks
export const pageCount = (state: AppRootStateType) => state.packsPage.queryParams.pageCount
export const page = (state: AppRootStateType) => state.packsPage.queryParams.page
export const sortPacks = (state: AppRootStateType) => state.packsPage.queryParams.sortPacks
export const min = (state: AppRootStateType) => state.packsPage.queryParams.min
export const max = (state: AppRootStateType) => state.packsPage.queryParams.max
export const packName = (state: AppRootStateType) => state.packsPage.queryParams.packName
export const user_id = (state: AppRootStateType) => state.packsPage.queryParams.user_id
export const isLoading = (state: AppRootStateType) => state.app.isLoading