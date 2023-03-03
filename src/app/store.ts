import {AnyAction, combineReducers} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"
import {appReducer} from "app/appReducer"
import {authReducer} from 'features/Auth/auth-reducer'
import {profileReducer} from "features/Profile/profile-reducer"
import {packsReducer} from 'features/Packs/packs-reducer'
import {cardsReducer} from "features/Packs/Cards/cards-reducer"
import {saveState} from "common/utils/localStorage"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  app: appReducer,
  packsPage: packsReducer,
  cardsPage: cardsReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

store.subscribe(() => {
  saveState(store.getState())
})

// непосредственно создаём store
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>


export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;