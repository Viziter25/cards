import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../common/constants/path';
import s from './Header.module.css'
import style from './../../common/styles/Container.module.css'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={style.container}>
        <div className={s.headerContainer}>
          <NavLink to={PATH.LOGIN}>login</NavLink>
          <NavLink to={PATH.PASSWORD_RECOVERY}>New password</NavLink>
          <NavLink to={PATH.REGISTRATION}>registration</NavLink>
          <NavLink to={PATH.PROFILE}>profile</NavLink>
          <NavLink to={PATH.NEW_PASSWORD}>new password</NavLink>
          <NavLink to={PATH.TEST}>test</NavLink>
        </div>
      </div>
    </header>

  );
};

