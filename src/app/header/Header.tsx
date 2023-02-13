import React from 'react'
import s from './Header.module.scss'
import label from './assets/label.svg'
import defaultAvatar from '../../features/Profile/assets/avatar.jpg'
import { useAppSelector } from '../store'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../common/constants/path'

export const Header = () => {

  const isLogin = useAppSelector(st => st.auth.isLoggedIn)
  const userPhoto = useAppSelector(st => st.profile.avatar)
  const userName = useAppSelector(st => st.profile.name)

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img src={label} className={s.label} alt='label' />
        {isLogin &&
          <div className={s.profileData}>
            <NavLink to={PATH.PROFILE} className={s.userName}>{userName}</NavLink>
            <NavLink to={PATH.PROFILE}>
              <img src={userPhoto ? userPhoto : defaultAvatar} className={s.userPhoto} alt='userPhoto'></img>
            </NavLink>
          </div>
        }
      </div>
    </header>
  )
}