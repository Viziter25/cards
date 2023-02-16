import React, { FC } from 'react';
import s from './miniHeader.module.scss'
import { Button } from "@mui/material";

type MiniHeaderPropsType = {
  title: string
  buttonTitle?: string
  isButton?: boolean
  callback?: () => void
}

export const MiniHeader: FC<MiniHeaderPropsType> = ({
  title,
  buttonTitle,
  isButton,
  callback
}) => {
  const onClickHandler = () => {
    callback && callback()
  }

  return (
    <div className={s.miniHeader}>
      <span className={s.title}>{title}</span>
      {isButton || <Button className={s.button} variant={"contained"} onClick={onClickHandler}>{buttonTitle}</Button>}
    </div>
  );
};

