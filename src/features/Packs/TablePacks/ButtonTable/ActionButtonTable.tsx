import React, { FC } from 'react';
import deleteIcon from '../../../../common/icons/delete.svg'
import deleteDisabledIcon from '../../../../common/icons/deleteDisabled.svg'
import teacherIcon from '../../../../common/icons/learn.svg'
import teacherDisabledIcon from '../../../../common/icons/learnDisabled.svg'
import editIcon from '../../../../common/icons/edit.svg'
import editDisabledIcon from '../../../../common/icons/editDisabled.svg'
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { deletePackTC, updatePackTC } from '../../packs-reducer';
import s from './activeButton.module.scss'
import { NavLink } from 'react-router-dom';

type ActionButtonTableType = {
  userId: string
  packId: string
  cardsCount: number
}

export const ActionButtonTable: FC<ActionButtonTableType> = ({ userId, packId, cardsCount }) => {

  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.profile._id)
  const idDis = useAppSelector(state => state.app.idDisabled)


  const deletePackHandler = () => {
    dispatch(deletePackTC(packId))
  }

  const updatePackHandler = () => {
    dispatch(updatePackTC({
      _id: packId,
      name: 'updatePack'
    }))
  }

  const teacher = (cardsCount || (idDis !== packId)) ? teacherIcon : teacherDisabledIcon

  const updateButton = (idDis === packId) ? <img src={editDisabledIcon} alt="icon" /> : <img onClick={updatePackHandler} src={editIcon} alt="icon" />
  const imgTeg = cardsCount
    ?
    <NavLink style={{ display: 'block', height: '16px', textDecoration: 'none', color: 'black' }} to={`/learn/${packId}`}>
      <img src={teacher} alt="icon" />
    </NavLink>
    :
    <img src={teacher} alt="icon" />
  const deleteButton = idDis === packId ? <img src={deleteDisabledIcon} alt="icon" /> : <img onClick={deletePackHandler} src={deleteIcon} alt="icon" />

  return (
    <div className={s.actionBlock}>
      {myId === userId ?
        <div className={s.actionButton}>
          {imgTeg}
          {updateButton}
          {deleteButton}
        </div> :
        imgTeg
      }
    </div>
  );
};

