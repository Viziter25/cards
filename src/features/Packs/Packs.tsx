import React from 'react';
import { TablePacks } from './TablePacks/TablePacks';
import s from './Packs.module.scss'
import { Button } from '@mui/material'
import { SearchInput } from "../../common/components/searchInput/SearchInput";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setPackNameAC } from "./packs-reducer";
import { IsMyPack } from "../../common/components/isMyPack/IsMyPack";
import { Navigate } from "react-router-dom";
import { PATH } from "../../common/constants/path";
import { SliderComponent } from './Slider/SliderComponent';
import { RemoveFilters } from './RemoveFilters/RemoveFilters';
import { Paginator } from './Paginator/Paginator';

export const Packs = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const searchHandler = (packName: string) => {
    dispatch(setPackNameAC({ packName }))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <div className={s.miniHeader}>
        <span className={s.title}>Packs list</span>
        <Button className={s.button} variant={"contained"}>Add new pack</Button>
      </div>
      <div className={s.filter}>
        <SearchInput searchHandler={searchHandler} />
        <IsMyPack />
        <SliderComponent />
        <RemoveFilters />
      </div>
      <TablePacks />
      <Paginator />
    </div>
  );
};



