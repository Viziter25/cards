import s from './RemoveFilters.module.scss'
import removeFiltersIcon from '../../icons/removeFiltersIcon.svg'
import React, {FC} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {
  setCurrentPageAC,
  setPageCountAC,
  setSliderValuesAC,
  setSortPacksAC,
  setUserIdAC
} from '../../../features/Packs/packs-reducer'

type RemoveFiltersPropsType = {
  setSearchInputValue: (searchInputValue: string) => void
}

export const RemoveFilters:FC<RemoveFiltersPropsType> = React.memo(({setSearchInputValue}) => {

  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(st => st.packsPage.packs.minCardsCount)
  const maxCardsCount = useAppSelector(st => st.packsPage.packs.maxCardsCount)

  const removeFilters = () => {
    setSearchInputValue('')
    dispatch(setUserIdAC({userId: ''}))
    dispatch(setSortPacksAC({sortBy: ''}))
    dispatch(setSliderValuesAC({sliderValues: [minCardsCount, maxCardsCount]}))
    dispatch(setCurrentPageAC({currentPage: 1}))
    dispatch(setPageCountAC({pageCount: 5}))
  }

  return (
    <div className={s.container}>
      <span className={s.title}></span>{/* для разметки */}
      <div onClick={removeFilters} className={s.iconContainer}>
        <img src={removeFiltersIcon} alt={'remove icon'}/>
      </div>
    </div>
  )
})