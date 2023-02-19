import React, {useEffect } from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Paper, Table, TableBody, TableContainer} from '@mui/material';
import {setPacksTC} from '../packs-reducer';
import s from './tablePacks.module.scss'
import {TableRows} from './TableRow/TableRows';
import {TableHeader} from './TableHead/TableHeader';

export const TablePacks = () => {

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packsPage.packs.cardPacks)
  const pageCount = useAppSelector(state => state.packsPage.queryParams.pageCount)
  const page = useAppSelector(state => state.packsPage.queryParams.page)
  const sortPacks = useAppSelector(state => state.packsPage.queryParams.sortPacks)
  const min = useAppSelector(state => state.packsPage.queryParams.min)
  const max = useAppSelector(state => state.packsPage.queryParams.max)
  const packName = useAppSelector(state => state.packsPage.queryParams.packName)
  const user_id = useAppSelector(state => state.packsPage.queryParams.user_id)
  const isLoading = useAppSelector(state => state.app.isLoading)


  useEffect(() => {
    dispatch(setPacksTC())
  }, [pageCount, page, sortPacks, min, max, packName, user_id, dispatch])


  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHeader/>
          <TableBody>
            {packs.map((pack) => (
              <TableRows key={pack._id}
                         cardsCount={pack.cardsCount}
                         updated={pack.updated}
                         user_id={pack.user_id}
                         _id={pack._id}
                         name={pack.name}
                         user_name={pack.user_name}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!packs.length && isLoading !== 'loading' && <div className={s.warn}>Change query parameters</div>}
    </div>
  );
};

