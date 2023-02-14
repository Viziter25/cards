import React from 'react';
import deleteIcon from '../../../common/icons/delete.svg'
import teacherIcon from '../../../common/icons/learn.svg'
import editIcon from '../../../common/icons/edit.svg'
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {deletePackTC, updatePackTC} from '../packs-redicer';
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
          <a href="#"><img src={teacherIcon} alt=""/></a>
          <a href="#" onClick={updatePackHandler}><img src={editIcon} alt=""/></a>
          <a href="#" onClick={deletePackHandler}><img src={deleteIcon} alt=""/></a>
        </div> :
        <a href="#" ><img src={teacherIcon} alt=""/></a>
      }
    </div>
  );
};

