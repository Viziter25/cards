import React from 'react'
import s from './Pages.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PATH } from '../../common/constants/path'
import { Login } from '../../features/Auth/Login/Login'
import { Registration } from '../../features/Auth/Registration/Registration'
import { Profile } from '../../features/Profile/Profile'
import { PasswordRecovery } from '../../features/Auth/PasswordRecovery/PasswordRecovery'
import { NewPassword } from '../../features/Auth/NewPassword/NewPassword'
import { Error404 } from '../../common/components/Error404/Error404'
import { CheckEmail } from "../../features/Auth/CheckEmail/CheckEmail"
import { Packs } from '../../features/Packs/Packs'
import { Cards } from "../../features/Packs/Cards/Cards"
import { LearnPage } from 'features/Packs/LearnPage/LearnPage'

export const Pages = () => {
  return (
    <div className={s.pages}>
      <Routes>
        <Route path={PATH.REGISTRATION} element={<Registration />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.CARDS} element={<Cards />} />
        <Route path={PATH.LEARN} element={<LearnPage />} />
        <Route path={PATH.ERROR404} element={<Error404 />} />
        <Route path='*' element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}