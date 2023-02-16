import React from 'react';
import s from './isMyPack.module.scss'
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { setUserIdAC } from "../../../features/Packs/packs-reducer";

export const IsMyPack = () => {

  const isMy = useAppSelector(state => state.packsPage.queryParams.user_id)
  const userId = useAppSelector(state => state.profile._id)
  const entityStatus = useAppSelector(state => state.packsPage.packs.entityStatus)

  const dispatch = useAppDispatch()

  const isMyHandler = (isMyPacks: boolean) => {
    isMyPacks ?
      dispatch(setUserIdAC({ userId })) :
      dispatch(setUserIdAC({ userId: '' }))
  }

  return (
    <div className={s.isMyPackContainer}>
      <span>Show packs cards</span>
      <div className={s.buttons}>
        <Button variant={isMy ? 'contained' : 'outlined'}
          className={isMy ? `${s.button} ${s.whiteColor}` : s.button}
          onClick={() => isMyHandler(true)} disabled={ entityStatus=== 'loading'}>My</Button>
        <Button variant={!isMy ? 'contained' : 'outlined'}
          className={!isMy ? `${s.button} ${s.whiteColor}` : s.button}
          onClick={() => isMyHandler(false)} disabled={ entityStatus=== 'loading'}>All</Button>
      </div>
    </div>
  );
};

