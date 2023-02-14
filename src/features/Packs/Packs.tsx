import React from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './Packs.module.scss'
import {Button} from '@mui/material'
import {SearchInput} from "../../common/components/searchInput/SearchInput";
import {useAppDispatch} from "../../app/store";
import {setPackNameAC} from "./packs-redicer";
import {IsMyPack} from "../../common/components/isMyPack/IsMyPack";

export const Packs = () => {

  const dispatch = useAppDispatch()

  const searchHandler = (packName: string) => {
    dispatch(setPackNameAC({packName}))
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



