import React, { FC, useState } from 'react'
import s from './packActions.module.scss'
import consoleIcon from '../../../../common/icons/console.svg'
import { EditPackConsole } from './EditPackConsole/EditPackConsole'

type PackActionsPropsType = {
  packId: string
  packName:string
}

export const PackActions: FC<PackActionsPropsType> = ({ packId,packName }) => {

  const [isEditConsole, setIsEditConsole] = useState(false)
  const [open, setOpen] = useState(false);
  const [clickButton, setClickButton] = useState('');

  const onClickHandler = () => {
    setOpen(true)
    // dispatch(isOpenModal({isOpen: true}))
  }
  // const onClickButtonHandler = () => {
  //   setClickButton('update')
  //   // dispatch(isOpenModal({isOpen: true}))
  // }

  return (
    <div className={s.console}>
      <span className={s.consoleInfo}>pack actions</span>
      <img src={consoleIcon} alt={'consoleIcon'} onClick={() => setIsEditConsole(!isEditConsole)}></img>
      {isEditConsole && packId &&
        <div className={s.consoleOn}>
          <EditPackConsole packName={packName} packId={packId} setIsEditConsole={setIsEditConsole} callback={onClickHandler} open={open} setOpen={setOpen} setClickButton={setClickButton} clickButton={clickButton}/>
        </div>
      }
    </div>
  )
}