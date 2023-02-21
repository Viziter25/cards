import React, { FC } from 'react';
import s from './miniHeader.module.scss'
import { Button } from "@mui/material";
import { useAppSelector } from '../../../app/store';

type MiniHeaderPropsType = {
  title: string
  buttonTitle?: string
  isButton?: boolean
  callback?: () => void
  positionCenter?: boolean
}

export const MiniHeader: FC<MiniHeaderPropsType> = ({
  title,
  buttonTitle,
  isButton,
  callback,
  positionCenter
}) => {
  const onClickHandler = () => {
    callback && callback()
  }
  const status = useAppSelector(state => state.packsPage.packs.entityStatus)


  return (
    <div className={positionCenter ? s.miniHeaderCenter : s.miniHeader}>
      <span className={s.title}>{title}</span>
      {isButton || <Button disabled={status === 'loading'} className={s.button} variant={"contained"} onClick={onClickHandler}>{buttonTitle}</Button>}
    </div>
  );
};

