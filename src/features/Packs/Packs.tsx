import React from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './Packs.module.scss'
import {Button} from '@mui/material'
import {SearchInput} from "../../common/components/searchInput/SearchInput";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setPackNameAC} from "./packs-redicer";
import {IsMyPack} from "../../common/components/isMyPack/IsMyPack";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/constants/path";

export const Packs = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const searchHandler = (packName: string) => {
    dispatch(setPackNameAC({packName}))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <div className={s.container}>
      <div className={s.miniHeader}>
        <span className={s.title}>Packs list</span>
        <Button className={s.button} variant={"contained"}>Add new pack</Button>
      </div>
      <div className={s.filter}>
        <SearchInput searchHandler={searchHandler}/>
        <IsMyPack/>
      </div>
      {/* search component */}
      <TablePacks/>
      {/* pagination component */}
    </div>
  );
};



