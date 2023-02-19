import React, { Dispatch, FC, SetStateAction } from 'react'
import s from './editPackConsole.module.scss'
import teachIcon from '../../../../../common/icons/learn.svg'
import updateIcon from '../../../../../common/icons/edit.svg'
import deleteIcon from '../../../../../common/icons/delete.svg'
import { useAppDispatch } from '../../../../../app/store'
import { deletePackTC, updatePackTC } from '../../../packs-reducer'
import { NavLink } from 'react-router-dom'


type EditPackConsolePropsType = {
  packId: string
  setIsEditConsole: Dispatch<SetStateAction<boolean>>
}

export const EditPackConsole: FC<EditPackConsolePropsType> = ({ packId, setIsEditConsole }) => {

  const dispatch = useAppDispatch()

  const deletePackHandler = () => {
    dispatch(deletePackTC(packId))
    setIsEditConsole(false)
  }

  const updatePackHandler = () => {
    dispatch(updatePackTC({
      _id: packId,
      name: 'updated pack'
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
        <NavLink style={{ display: 'block', height: '16px', textDecoration: 'none', color: 'black' }} to={`/packs`}>Delete</NavLink>
      </div>
    </div>
  )
}