import React, {FC, useState} from 'react';
import deleteIcon from '../../../../common/icons/delete.svg'
import deleteDisabledIcon from '../../../../common/icons/deleteDisabled.svg'
import teacherIcon  from '../../../../common/icons/learn.svg'
import teacherDisabledIcon  from '../../../../common/icons/learnDisabled.svg'
import editIcon from '../../../../common/icons/edit.svg'
import editDisabledIcon from '../../../../common/icons/editDisabled.svg'
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {deletePackTC, updatePackTC} from '../../packs-reducer';
import s from './activeButton.module.scss'
import {ModalChildrenPack} from '../../../../common/components/Modal/ChildrenPank/ModalChildrenPack';
import {ModalComponent} from '../../../../common/components/Modal/ModalComponent';

type ActionButtonTableType = {
  userId: string
  packId: string
  cardsCount: number
  name: string
}

export const ActionButtonTable:FC<ActionButtonTableType> = ({userId,packId, cardsCount,name}) => {

  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.profile._id)
  const idDis = useAppSelector(state => state.app.idDisabled)
  const [open, setOpen] = useState(false);
  const [clickButton, setClickButton] = useState('');

const titleModal = clickButton === 'update'? 'Edit pack' : 'Delete Pack'
  const updatePackHandler = () => {
    setClickButton('update')
    setOpen(true)
  }
  const deletePackHandler = () => {
    setClickButton('delete')
    setOpen(true)
  }

  const dispatchDeleteHandler = () => {
    dispatch(deletePackTC(packId))
  }
  const dispatchUpdateHandler = (values:any) => {
    dispatch(updatePackTC({
      _id: packId,
      name: values.name
    }))
  }


  const learnPackHandler = () => {
    console.log('learning')
  }

  const teacher = (cardsCount || (idDis !== packId )) ?  teacherIcon : teacherDisabledIcon

  const updateButton =  (idDis=== packId )
                        ? <img src={editDisabledIcon} alt="icon"/>
                        : <img onClick={updatePackHandler} src={editIcon} alt="icon"/>

  const imgTeg = cardsCount
                        ?  <img onClick={learnPackHandler} src={teacher} alt="icon"/>
                        :  <img src={teacher} alt="icon"/>

  const deleteButton = idDis=== packId
                        ? <img src={deleteDisabledIcon} alt="icon"/>
                        : <img onClick={deletePackHandler} src={deleteIcon} alt="icon"/>

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

      <ModalComponent title={titleModal} closeHandler={() => setOpen(false)} open={open}>
        {
          clickButton === 'update'
          ? <ModalChildrenPack closeHandler={()=>setOpen(false)}
                               dispatchHandler={dispatchUpdateHandler}
                               packName={name}
            />
          : <ModalChildrenPack closeHandler={()=>setOpen(false)}
                               dispatchHandler={dispatchDeleteHandler}
                               packName={name}
                               delet={clickButton}
            />
        }
      </ModalComponent>
    </div>
  );
};

