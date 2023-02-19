import React, { FC } from 'react'
import s from './cardsActions.module.scss'
import deleteIcon from '../../../../common/icons/delete.svg'
import editIcon from '../../../../common/icons/edit.svg'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { deleteCardTC, updateCardTC } from '../cards-reducer'


type CardsActionsPropsType = {
  packId: string
  id: string
}

export const CardsActions: FC<CardsActionsPropsType> = ({ packId, id }) => {

  const dispatch = useAppDispatch()
  const loading = useAppSelector(st => st.app.isLoading)

  const updateCardHandler = () => {
    dispatch(updateCardTC(packId, {
      _id: id,
      question: "updated question"
    }))
  }
  const deleteCardHandler = () => {
    dispatch(deleteCardTC(packId, id))
  }

  return (
    <div className={s.container}>
      <img className={loading === 'loading' ? s.imgLoading : s.img} onClick={loading === 'loading' ? () => { } : updateCardHandler} src={editIcon} alt="editIcon" />
      <img className={loading === 'loading' ? s.imgLoading : s.img} onClick={loading === 'loading' ? () => { } : deleteCardHandler} src={deleteIcon} alt="deleteIcon" />
    </div>
  )
}