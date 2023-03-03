import React, { FC, useState } from 'react'
import s from './cardsActions.module.scss'
import deleteIcon from '../../../../common/icons/delete.svg'
import editIcon from '../../../../common/icons/edit.svg'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { deleteCardTC, updateCardTC } from '../cards-reducer'
import { ModalComponent } from '../../../../common/components/Modal/ModalComponent';
import { ModalChildrenCard, ValuesPropsType } from '../../../../common/components/Modal/ChildrenCard/ModalChildrenCard';


type CardsActionsPropsType = {
  question: string
  answer: string
  packId: string
  id: string
}

export const CardsActions: FC<CardsActionsPropsType> = ({ packId, id, question, answer }) => {

  const dispatch = useAppDispatch()
  const loading = useAppSelector(st => st.app.isLoading)

  const [open, setOpen] = useState(false);
  const [clickButton, setClickButton] = useState('');
  const titleModal = clickButton === 'update' ? 'Edit Card' : 'Delete Card'

  const updateCardModal = () => {
    setClickButton('update')
    setOpen(true)
  }
  const deleteCardModal = () => {
    setClickButton('delete')
    setOpen(true)
  }

  const updateCardHandler = (values: ValuesPropsType) => {
    dispatch(updateCardTC({ packId, data: { _id: id, question: values.question, answer: values.answer } }))
  }
  const deleteCardHandler = () => {
    dispatch(deleteCardTC({ packId, cardId: id }))
  }

  return (
    <div className={s.container}>
      <img className={loading === 'loading' ? s.imgLoading : s.img} onClick={loading === 'loading' ? () => { } : updateCardModal} src={editIcon} alt="editIcon" />
      <img className={loading === 'loading' ? s.imgLoading : s.img} onClick={loading === 'loading' ? () => { } : deleteCardModal} src={deleteIcon} alt="deleteIcon" />


      <ModalComponent title={titleModal} closeHandler={() => setOpen(false)} open={open}>
        {
          clickButton === 'update'
            ? <ModalChildrenCard closeHandler={() => setOpen(false)}
              dispatchHandler={updateCardHandler}
              question={question}
              answer={answer}
            />
            : <ModalChildrenCard closeHandler={() => setOpen(false)}
              dispatchHandler={deleteCardHandler}
              question={question}
              delet={clickButton}
            />
        }
      </ModalComponent>

    </div>
  )
}