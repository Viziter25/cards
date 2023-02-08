import defaultAvatar from './assets/avatar.jpg'
import camera from './assets/camera.svg'
import logout from './assets/logout.svg'
import s from './Profile.module.css'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Button, Paper } from '@mui/material'
import { SuperEditableSpan } from '../../common/components/SuperEditableSpan/SuperEditableSpan'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import {logOutTC, updateProfileTC} from './profile-reducer'
import {Navigate} from 'react-router-dom'
import {SuperInput} from '../../common/components/SuperInput/SuperInput'
import {useAppDispatch, useAppSelector} from "../../app/store";


export const Profile = React.memo(() => {

  const isLogin = useAppSelector(st => st.auth.isLoggedIn)
  const profile = useAppSelector(st => st.profile)
  const dispatch = useAppDispatch()

  const [avatarEditMode, setAvatarEditMode] = useState<boolean>(false)
  const [avatarAddress, setAvatarAddress] = useState<string | undefined>('')
  const [name, setName] = useState<string>(profile.name)

  /* useEffect(() => {
    if (isLogin) {
      dispatch(getProfileTC())
    }
    return
  }, [dispatch, isLogin]) */

  const logautButton = {
    display: 'flex',
    gap: '5px',
    backgroundColor: '#FCFCFC',
    borderRadius: '30px',
    boxShadow: '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
    height: '35px',
    marginTop: '15px',
    width: '125px',
    color: '#000000',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px',
    letterSpacing: '0.01em',
    opacity: '0.8',
    textAlign: 'center',
    textTransform: 'none'
  }

  const openAvatarEditMode = () => {
    setAvatarEditMode(!avatarEditMode)
  }
  const changeAvatarAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAvatarAddress(e.currentTarget.value)
  }, [])
  const updateAvatar = useCallback(() => {
    setAvatarEditMode(!avatarEditMode)
    if (avatarAddress) {
      dispatch(updateProfileTC(profile.name, avatarAddress))
    }
    setAvatarAddress('')
  }, [dispatch, avatarEditMode, avatarAddress, profile.name])

  const updateName = useCallback(() => {
    if (name) {
      dispatch(updateProfileTC(name, profile.avatar ? profile.avatar : ''))
    }
  }, [dispatch, name, profile.avatar])

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  if (!isLogin) {
    return <Navigate to='/login' />
  }

  return (
    <div className={s.profileContainer}>
      <Paper className={s.paper} elevation={3}>
        <h3 className={s.title}>personal information</h3>
        <div className={s.avatarContainer}>
          <img className={s.avatarImg} src={profile.avatar ? profile.avatar : defaultAvatar} alt='avatar' />
          {avatarEditMode
            ? <div className={s.inputBlock}>
              <SuperInput
                autoFocus
                className={s.input}
                label={'avatar address'}
                labelClassName={s.label}
                onChange={changeAvatarAddress}
                onBlur={updateAvatar}
                onEnter={updateAvatar}
                value={avatarAddress}
              />
              <SuperButton className={s.inputButton} onClick={updateAvatar}>save</SuperButton>
            </div>
            : <img onClick={openAvatarEditMode} className={s.camera} src={camera} alt='camera' />
          }
        </div>
        <SuperEditableSpan
          onChangeText={setName}
          onBlur={updateName}
          onEnter={updateName}
          spanProps={{ className: s.span }}
          value={name}
        />
        <span className={s.label}>your name</span>
        <span className={s.email}>{profile.email}</span>
        {/* <SuperButton className={s.logaut}><img src={logout} alt='logout'></img>Log out</SuperButton> */}
        <Button sx={logautButton} onClick={logOutHandler} variant="text"><img src={logout} alt='logout'></img>Log
          out</Button>
      </Paper>
    </div>
  )
})