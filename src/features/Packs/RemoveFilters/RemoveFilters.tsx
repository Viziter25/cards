import s from './RemoveFilters.module.scss'
import removeFiltersIcon from './assets/removeFiltersIcon.svg'
import React, {FC, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {
  setCurrentPageAC,
  setPackNameAC,
  setPageCountAC,
  setSliderValuesAC,
  setSortPacksAC,
  setUserIdAC
} from '../packs-reducer'

type RemoveFiltersPropsType = {
  setSearchInputValue: (searchInputValue: string) => void
}

export const RemoveFilters: FC<RemoveFiltersPropsType> = React.memo(({
                                                                       setSearchInputValue
                                                                     }) => {

  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(st => st.packsPage.packs.minCardsCount)
  const maxCardsCount = useAppSelector(st => st.packsPage.packs.maxCardsCount)

  const [min, setMin] = useState<number>(minCardsCount)
  const [max, setMax] = useState<number>(maxCardsCount)

  useEffect(() => {
    setMin(minCardsCount)
    setMax(maxCardsCount)
  }, [minCardsCount, maxCardsCount])

  const removeFilters = () => {
    dispatch(setPackNameAC({packName: ''}))
    dispatch(setUserIdAC({userId: ''}))
    dispatch(setSortPacksAC({sortBy: ''}))
    dispatch(setSliderValuesAC({sliderValues: [min, max]}))
    dispatch(setCurrentPageAC({currentPage: 1}))
    dispatch(setPageCountAC({pageCount: 5}))
    setSearchInputValue('')
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