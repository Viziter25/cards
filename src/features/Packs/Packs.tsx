import React, {useEffect, useState} from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './packs.module.scss'
import {SearchInput} from '../../common/components/SearchInput/SearchInput';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {IsMyPack} from '../../common/components/IsMyPack/IsMyPack';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../common/constants/path';
import {MiniHeader} from '../../common/components/MiniHeader/MiniHeader';
import {setCurrentPageAC, setPackNameAC, setPacksTC} from './packs-reducer';
import {RemoveFilters} from '../../common/components/RemoveFilters/RemoveFilters';
import {Paginator} from '../../common/components/Paginator/Paginator';
import {SliderComponent} from 'common/components/Slider/SliderComponent';


export const Packs = () => {

  const dispatch = useAppDispatch()
  const pageCount = useAppSelector(state => state.packsPage.queryParams.pageCount)
  const page = useAppSelector(state => state.packsPage.queryParams.page)
  const sortPacks = useAppSelector(state => state.packsPage.queryParams.sortPacks)
  const min = useAppSelector(state => state.packsPage.queryParams.min)
  const max = useAppSelector(state => state.packsPage.queryParams.max)
  const packName = useAppSelector(state => state.packsPage.queryParams.packName)
  const user_id = useAppSelector(state => state.packsPage.queryParams.user_id)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const [searchInputValue, setSearchInputValue] = useState(packName)

  useEffect(() => {
    dispatch(setPacksTC())
  }, [pageCount, page, sortPacks, min, max, packName, user_id, dispatch])

  const searchHandler = (packName: string) => {
    dispatch(setPackNameAC({packName}))
  }
  const [open, setOpen] = useState(false);
  const onClickHandler = () => {
    setOpen(true)
  }

  const onPagination = (newPage: number) => {
    dispatch(setCurrentPageAC({currentPage: newPage}))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <div className={s.container}>
      <MiniHeader title={'Packs List'} buttonTitle={'Add new pack'} callback={onClickHandler} open={open} setOpen={setOpen}/>
      <div className={s.filter}>
        <div className={s.searchInput}>
          <SearchInput searchHandler={searchHandler} searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue}/>
        </div>
        <IsMyPack/>
        <SliderComponent/>
        <RemoveFilters/>
      </div>
      <TablePacks/>
      <Paginator onPagination={onPagination} pageCount={pageCount} page={page}/>
    </div>
  );
};



