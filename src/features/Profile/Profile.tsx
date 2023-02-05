import avatar from './avatar.jpg'
import camera from './camera.svg'
import logout from './logout.svg'
import s from './Profile.module.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Paper } from '@mui/material'
import { SuperEditableSpan } from '../../common/components/SuperEditableSpan/SuperEditableSpan'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { AppDispatchType, AppStateType } from './store'
import { getProfileTC, updateProfileTC } from './profile-reducer'
import { ProfileType } from './profileAPI'
import { Navigate } from 'react-router-dom'
import { SuperInput } from '../../common/components/SuperInput/SuperInput'


export const Profile = () => {

  const profile = useSelector<AppStateType, ProfileType>(st => st.profile)
  const dispatch = useDispatch<AppDispatchType>()
  const [avatarAddress, setAvatarAddress] = useState<string | undefined>(profile.avatar)
  const [editModeAvatarAddress, setEditModeAvatarAddress] = useState<boolean>(false)
  const [name, setName] = useState<string>(profile.name)

  // удалить хард после мержа
  const hardAvatar = avatar
  const hardName = 'Ivan'
  const hardEmail = 'j&johnson@gmail.com'
  const isLogin = true
  // удалить хард после мержа

  useEffect(() => {
    if (isLogin) { dispatch(getProfileTC()) }
    return
  }, [dispatch, isLogin])

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

  const openAvatarHandler = () => {
    setEditModeAvatarAddress(!editModeAvatarAddress)
  }
  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarAddress(e.currentTarget.value)
  }
  const updateAvatarHandler = () => {
    setEditModeAvatarAddress(!editModeAvatarAddress)
    if (avatarAddress) {
      dispatch(updateProfileTC(profile.name, avatarAddress))
      setAvatarAddress('')
    }
  }
  const updateNameHandler = () => {
    if (name) {
      dispatch(updateProfileTC(name, profile.avatar ? profile.avatar : hardAvatar))
    }
  }
  const logOutHandler = () => {
    alert('log out')
  }

  if (!isLogin) {
    return <Navigate to='/login' />
  }

  return (
    <Paper className={s.container} elevation={3}>
      <h3 className={s.title}>personal information</h3>
      <div className={s.avatarContainer}>
        <img className={s.avatarImg} src={profile.avatar ? profile.avatar : hardAvatar} alt='avatar' />
        {editModeAvatarAddress
          ? <div className={s.inputBlock}>
            <SuperInput
              autoFocus
              className={s.input}
              label={'avatar address'}
              labelClassName={s.label}
              onBlur={updateAvatarHandler}
              onChange={changeAvatarHandler}
              onEnter={updateAvatarHandler}
              value={avatarAddress}
            />
            <SuperButton className={s.inputButton} onClick={updateAvatarHandler}>save</SuperButton>
          </div>
          : <img onClick={openAvatarHandler} className={s.camera} src={camera} alt='camera' />
        }
      </div>
      <SuperEditableSpan
        onChangeText={setName}
        onBlur={updateNameHandler}
        onChange={updateNameHandler}
        onEnter={updateNameHandler}
        spanProps={{ className: s.span }}
        value={name ? name : hardName}
      />
      <span className={s.email}>{profile.email ? profile.email : hardEmail}</span>
      {/* <SuperButton className={s.logaut}><img src={logout} alt='logout'></img>Log out</SuperButton> */}
      <Button sx={logautButton} onClick={logOutHandler} variant="text"><img src={logout} alt='logout'></img>Log out</Button>
    </Paper>
  )
}
