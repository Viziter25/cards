import React from 'react';
import deleteIcon from '../../../common/icons/delete.svg'
import teacherIcon  from '../../../common/icons/learn.svg'
import editIcon from '../../../common/icons/edit.svg'
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {deletePackTC, updatePackTC} from '../packs-reducer';
import s from '../TablePacks/ActiveButton.module.scss'

type ActionButtonTableType = {
  userId: string
  packId: string
}

export const ActionButtonTable = (props: ActionButtonTableType) => {

  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.profile._id)

  const deletePackHandler = () => {
    dispatch(deletePackTC(props.packId))
  }

  const updatePackHandler = () => {
    dispatch(updatePackTC({
      _id: props.packId,
      name: 'updatePack'
    }))
  }


  return (
    <div>
      {myId === props.userId ?
        <div className={s.actionButton}>
          <img src={teacherIcon} alt=""/>
          <img onClick={updatePackHandler} src={editIcon} alt=""/>
          <img onClick={deletePackHandler} src={deleteIcon} alt=""/>
        </div> :
        <img src={teacherIcon} alt=""/>
      }
    </div>
  );
};

