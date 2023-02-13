import React from 'react'
import s from './Packs.module.scss'
import { useAppDispatch, useAppSelector } from "../../app/store"
import { Navigate } from 'react-router-dom'
import { PATH } from '../../common/constants/path'
import { Button } from '@mui/material'
import { PacksTable } from './PacksTable'


export const Packs = React.memo(() => {

  const isLogin = useAppSelector(st => st.auth.isLoggedIn)
  const profile = useAppSelector(st => st.profile)
  const dispatch = useAppDispatch()

  if (!isLogin) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <div className={s.miniHeader}>
        <span className={s.title}>Packs list</span>
        <Button className={s.button} variant={"contained"}>Add new pack</Button>
      </div>
      {/* search component */}
      <PacksTable />
      {/* pagination component */}
    </div>
  )
})


