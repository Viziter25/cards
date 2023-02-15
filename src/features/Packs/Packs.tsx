import React from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './Packs.module.scss'
import {SearchInput} from "../../common/components/searchInput/SearchInput";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setPackNameAC} from "./packs-redicer";
import {IsMyPack} from "../../common/components/isMyPack/IsMyPack";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/constants/path";
import {MiniHeader} from "../../common/components/MiniHeader/MiniHeader";

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
        name: 'new Packs by Zlotnik',
        private:false
      }
    ))
  }

  return (
    <div className={s.container}>
      <MiniHeader title={'Packs List'} buttonTitle={'Add new pack'}/>
      <div className={s.filter}>
        <div className={s.searchInput}>
          <SearchInput searchHandler={searchHandler}/>
        </div>
        <IsMyPack/>
      </div>
      {/* search component */}
      <TablePacks/>
      {/* pagination component */}
    </div>
  );
};



