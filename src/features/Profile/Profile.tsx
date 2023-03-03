import React, { useCallback, useEffect, useState } from 'react'
import s from './profile.module.scss'
import defaultAvatar from 'common/image/profile/avatar.jpg'
import camera from 'common/icons/profile/camera.svg'
import logout from 'common/icons/profile/logout.svg'
import { Button, Paper } from '@mui/material'
import { SuperEditableSpan } from 'common/components/SuperEditableSpan/SuperEditableSpan'
import { logOutTC, updateProfileTC } from './profile-reducer'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "app/store"
import { PATH } from "common/constants/path"
import { BackArrow } from "common/components/BackArrow/BackArrow"
import { InputFile } from './InputFile/InputFile'


export const Profile = React.memo(() => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(st => st.auth.isLoggedIn)
  const profile = useAppSelector(st => st.profile)

  const [avatar, setAva] = useState(profile.avatar || defaultAvatar)
  const [name, setName] = useState<string>(profile.name)
  const [inputError, setInputError] = useState<string>('')
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  /* const [avatarEditMode, setAvatarEditMode] = useState<boolean>(false)
  const [avatarAddress, setAvatarAddress] = useState<string | undefined>('')
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
  }, [dispatch, avatarEditMode, avatarAddress, profile.name]) */

  const changeName = (value: string) => {
    setName(value)
    if (value.length === 0) { setInputError('min length 1 symbol') }
    else if (value.length > 15) { setInputError('max length 15 symbols') }
    else { setInputError('') }
  }

  const updateName = useCallback(() => {
    if (!inputError) {
      dispatch(updateProfileTC({ name, avatar }))
    }
  }, [dispatch, inputError, name, avatar])

  const updateAvatar = useCallback((img: string) => {
    setIsAvaBroken(false)
    setAva(img)
  }, [])

  const errorHandler = () => {
    setIsAvaBroken(true)
    alert('Кривая картинка')
  }

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  useEffect(() => {
    dispatch(updateProfileTC({ name, avatar }))
  }, [dispatch, avatar])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.profileContainer}>
      <BackArrow to={PATH.PACKS} title={'Back to Packs List'} />
      <Paper className={s.paper} elevation={3}>
        <h3 className={s.title}>personal information</h3>
        <div className={s.avatarContainer}>
          <img onError={errorHandler} className={s.avatarImg} src={isAvaBroken ? defaultAvatar : avatar} alt='avatar' />
          <InputFile updateAvatar={updateAvatar}><img className={s.camera} src={camera} alt='camera' /></InputFile>
          {/* {avatarEditMode
            ?
            <div className={s.inputBlock}>
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
            :
            <img onClick={openAvatarEditMode} className={s.camera} src={camera} alt='camera' />
          } */}
        </div>
        <SuperEditableSpan
          onChangeText={changeName}
          onBlur={updateName}
          onEnter={updateName}
          spanProps={{ className: s.span }}
          value={name}
          error={inputError}
        />
        <span className={inputError ? s.errorInfo : s.info}>{inputError ? inputError : 'your name'}</span>
        <span className={s.email}>{profile.email}</span>
        <Button className={s.logoutButton} onClick={logOutHandler} variant="text"><img src={logout} alt='logout'></img>Log out</Button>
      </Paper>
    </div>
  )
})