import React, {useState} from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './packs.module.scss'
import {SearchInput} from '../../common/components/SearchInput/SearchInput';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {IsMyPack} from '../../common/components/IsMyPack/IsMyPack';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../common/constants/path';
import {MiniHeader} from '../../common/components/MiniHeader/MiniHeader';
import {setPackNameAC} from './packs-reducer';
import {RemoveFilters} from '../../common/components/RemoveFilters/RemoveFilters';
import {Paginator} from '../../common/components/Paginator/Paginator';
import {SliderComponent} from 'common/components/Slider/SliderComponent';


export const Packs = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const [searchInputValue, setSearchInputValue] = useState('')

  const searchHandler = (packName: string) => {
    dispatch(setPackNameAC({packName}))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }



  return (
    <div className={s.container}>
      <MiniHeader title={'Packs List'} buttonTitle={'Add new pack'}/>
      <div className={s.filter}>
        <div className={s.searchInput}>
          <SearchInput searchHandler={searchHandler} searchInputValue={searchInputValue}
                       setSearchInputValue={setSearchInputValue}/>
        </div>
        <IsMyPack/>
        <SliderComponent/>
        <RemoveFilters setSearchInputValue={setSearchInputValue}/>
      </div>
      <TablePacks/>
      <Paginator/>
    </div>
  );
};



