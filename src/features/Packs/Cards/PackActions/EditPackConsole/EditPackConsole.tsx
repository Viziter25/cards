import React, {Dispatch, FC, SetStateAction} from 'react'
import s from './editPackConsole.module.scss'
import teachIcon from '../../../../../common/icons/learn.svg'
import updateIcon from '../../../../../common/icons/edit.svg'
import deleteIcon from '../../../../../common/icons/delete.svg'
import {useAppDispatch} from '../../../../../app/store'
import { deletePackTC, updatePackTC } from '../../../packs-reducer'
import {useNavigate} from 'react-router-dom'
import {ModalChildrenPack} from '../../../../../common/components/Modal/ChildrenPank/ModalChildrenPack';
import {ModalComponent} from '../../../../../common/components/Modal/ModalComponent';



type EditPackConsolePropsType = {
  packId: string
  setIsEditConsole: Dispatch<SetStateAction<boolean>>
  packName: string
  open: boolean
  callback: () => void
  setOpen: (open:boolean) => void
  setClickButton: (lickButton: string) => void
  clickButton: string
}

export const EditPackConsole: FC<EditPackConsolePropsType> = ({ packId, setIsEditConsole, packName,open,callback , setOpen, setClickButton, clickButton}) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const titleModal = clickButton === 'update'? 'Edit pack' : 'Delete Pack'



  const updatePackHandler = () => {

    callback && callback()
    setClickButton('update')

  }

  const deletePackHandler = () => {
    callback && callback()
    setClickButton('delete')
  }

  const dispatchDeleteHandler = () => {
    dispatch(deletePackTC(packId))
    navigate(`/packs`)

  }
  const dispatchUpdateHandler = (values:any) => {
    dispatch(updatePackTC({
      _id: packId,
      name: values.name
    }))
    setIsEditConsole(false)
  }


  return (
    <div className={s.container}>
      <div className={s.item}>
        <img src={teachIcon} alt="teachIcon" />
        <span>Learn</span>
      </div>
      <div className={s.item} onClick={updatePackHandler}>
        <img src={updateIcon} alt="updateIcon" />
        <span>Edit</span>
      </div>
      <div className={s.item} onClick={deletePackHandler}>
        <img src={deleteIcon} alt="deleteIcon" />
        <span>Delete</span>
      </div>


      <ModalComponent title={titleModal} closeHandler={() => setOpen(false)}  open={open}>
        {
          clickButton === 'update'
            ? <ModalChildrenPack closeHandler={()=> setOpen(false)}
                                 dispatchHandler={dispatchUpdateHandler}
                                 packName={packName}
            />
            : <ModalChildrenPack closeHandler={()=> setOpen(false)}
                                 dispatchHandler={dispatchDeleteHandler}
                                 packName={packName}
                                 delet={clickButton}
            />
        }
      </ModalComponent>

    </div>
  )
}