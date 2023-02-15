import React from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './Packs.module.scss'
import {SearchInput} from "../../common/components/searchInput/SearchInput";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {createPackTC, setPackNameAC} from "./packs-redicer";
import {IsMyPack} from "../../common/components/isMyPack/IsMyPack";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/constants/path";
import {MiniHeader} from "../../common/components/MiniHeader/MiniHeader";
import { Button } from '@mui/material'
import { setPackNameAC } from "./packs-reducer";
import { SliderComponent } from './Slider/SliderComponent';
import { RemoveFilters } from './RemoveFilters/RemoveFilters';
import { Paginator } from './Paginator/Paginator';

export const Packs = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const searchHandler = (packName: string) => {
    dispatch(setPackNameAC({packName}))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }

  const clickHandler = () => {
    dispatch(createPackTC({
        name: 'new Packs',
        private:false
      }
    ))
  }

  return (
    <div className={s.container}>
      <MiniHeader title={'Packs List'} buttonTitle={'Add new pack'} callback={clickHandler}/>
      <div className={s.filter}>
        <div className={s.searchInput}>
          <SearchInput searchHandler={searchHandler}/>
        </div>
        <IsMyPack/>
        <SliderComponent />
        <RemoveFilters />
      </div>
      <TablePacks />
      <Paginator />
    </div>
  );
};



