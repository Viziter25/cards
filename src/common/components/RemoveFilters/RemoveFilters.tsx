import s from './RemoveFilters.module.scss'
import removeFiltersIcon from '../../icons/removeFiltersIcon.svg'
import React from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {removeFiltersAC} from '../../../features/Packs/packs-reducer'


export const RemoveFilters = React.memo(() => {

  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(st => st.packsPage.packs.minCardsCount)
  const maxCardsCount = useAppSelector(st => st.packsPage.packs.maxCardsCount)

  const removeFilters = () => {
    dispatch(removeFiltersAC({emptyFilters: {
        sortPacks: '',
        page: 1,
        pageCount: 10,
        min: minCardsCount,
        max: maxCardsCount,
        packName: '',
        user_id: ''
      }}))
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