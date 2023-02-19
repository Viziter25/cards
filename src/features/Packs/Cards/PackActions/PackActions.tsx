import React, { FC, useState } from 'react'
import s from './packActions.module.scss'
import consoleIcon from '../../../../common/icons/console.svg'
import { EditPackConsole } from './EditPackConsole/EditPackConsole'

type PackActionsPropsType = {
  packId: string
}

export const PackActions: FC<PackActionsPropsType> = ({ packId }) => {

  const [isEditConsole, setIsEditConsole] = useState(false)

  return (
    <div className={s.console} onClick={() => setIsEditConsole(!isEditConsole)}>
      <span className={s.consoleInfo}>pack actions</span>
      <img src={consoleIcon} alt={'consoleIcon'}></img>
      {isEditConsole && packId &&
        <div className={s.consoleOn}>
          <EditPackConsole packId={packId} setIsEditConsole={setIsEditConsole} />
        </div>
      }
    </div>
  )
}