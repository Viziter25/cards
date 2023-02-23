import {AppRootStateType} from '../../app/store';

//auth selectors
export const isLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn

//app selectors
export const isLoading = (state: AppRootStateType) => state.app.isLoading
export const isInitialized = (state: AppRootStateType) => state.app.isInitialized
export const idDisabled = (state: AppRootStateType) => state.app.idDisabled

//packs selectors
export const packs = (state: AppRootStateType) => state.packsPage.packs.cardPacks
export const minCardsCount = (state: AppRootStateType) => state.packsPage.packs.minCardsCount
export const maxCardsCount = (state: AppRootStateType) => state.packsPage.packs.maxCardsCount
export const packsEntityStatus = (state: AppRootStateType) => state.packsPage.packs.entityStatus
export const packsTotalCount = (state: AppRootStateType) => state.packsPage.packs.cardPacksTotalCount

//profile selectors
export const profileId = (state: AppRootStateType) => state.profile._id

//query packs selectors
export const packsPageCount = (state: AppRootStateType) => state.packsPage.queryParams.pageCount
export const packsPage = (state: AppRootStateType) => state.packsPage.queryParams.page
export const sortPacks = (state: AppRootStateType) => state.packsPage.queryParams.sortPacks
export const min = (state: AppRootStateType) => state.packsPage.queryParams.min
export const max = (state: AppRootStateType) => state.packsPage.queryParams.max
export const packName = (state: AppRootStateType) => state.packsPage.queryParams.packName
export const user_id = (state: AppRootStateType) => state.packsPage.queryParams.user_id