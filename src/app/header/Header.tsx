import React, {useEffect, useState} from 'react'
import s from './Header.module.scss'
import defaultAvatar from 'common/image/profile/avatar.jpg'
import profileIcon from 'common/icons/profile/profile.svg'
import logoutIcon from 'common/icons/profile/logout.svg'
import {PATH} from 'common/constants/path'
import {useAppDispatch, useAppSelector} from 'app/store'
import {NavLink} from 'react-router-dom'
import {LinearProgress} from "@mui/material"
import {logOutTC} from 'features/Profile/profile-reducer'

export const Header = () => {

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(st => st.app.isLoading)
  const isLoggedIn = useAppSelector(st => st.auth.isLoggedIn)
  const profile = useAppSelector(st => st.profile)
  const [ava, setAva] = useState(profile.avatar || defaultAvatar)
  const [isOpenConsole, setIsOpenConsole] = useState(false)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const editConsoleHandler = () => {
    setIsOpenConsole(!isOpenConsole)
  }
  const closeConsoleHandler = () => {
    setIsOpenConsole(false)
  }
  const logOutHandler = () => {
    dispatch(logOutTC())
    setIsOpenConsole(false)
  }
  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  useEffect(() => {
    if (profile.avatar) {
      setIsAvaBroken(false)
      setAva(profile.avatar)
    }
  }, [profile.avatar])

  return (
    <header className={s.headerContainer}>
      <div className={s.header}>
        <div className={s.container}>

          {isLoggedIn &&
            <div className={s.profileData}>
              <div className={s.closedConsole}>
                <span onClick={editConsoleHandler} className={s.userName}>{profile.name}</span>
                <img onClick={editConsoleHandler} onError={errorHandler} src={isAvaBroken ? defaultAvatar : ava} className={s.userPhoto} alt='avatar'></img>
              </div>
              {isOpenConsole &&
                <div className={s.openedConsole}>
                  <div className={s.profileLink}>
                    <img src={profileIcon} alt="profileIcon" />
                    <NavLink onClick={closeConsoleHandler} style={{ display: 'block', height: '16px', textDecoration: 'none', color: 'black' }} to={PATH.PROFILE}>Profile</NavLink>
                  </div>
                  <div className={s.logoutLink} onClick={() => { }}>
                    <img src={logoutIcon} alt="logoutIcon" />
                    <span onClick={logOutHandler}>Log out</span>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
      {isLoading === 'loading' && <LinearProgress style={{ position: 'absolute', width: '100%' }} />}
    </header>
  )
}