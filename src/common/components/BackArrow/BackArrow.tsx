import React, {FC} from 'react';
import s from './backArrow.module.scss'
import {NavLink} from "react-router-dom";
import backArrow from "../../icons/iconProfile/backArrow.svg";

type BackArrowPropsType = {
  to: string
  title: string
}

export const BackArrow: FC<BackArrowPropsType> = ({
                                                    to,
                                                    title
                                                  }) => {
  return (
    <div className={s.backArrow}>
      <NavLink to={to}><img src={backArrow} className={s.backArrowImg} alt={'arrow'}></img></NavLink>
      <NavLink to={to} className={s.backArrowText}>{title}</NavLink>
    </div>
  );
};

