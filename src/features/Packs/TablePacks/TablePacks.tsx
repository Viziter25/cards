import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {setPacksTC, setSortPacksAC} from '../packs-redicer';
import {ActionButtonTable} from './ActionButtonTable';
import {date} from '../../../common/utils/dateConvertor';
import SuperSort from "../../../common/components/SuperSort/SuperSort";
import s from './tablePacks.module.scss'
import {NavLink} from "react-router-dom";

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

  const [sort, setSort] = useState('')

  useEffect(() => {
    dispatch(setPacksTC())
  }, [pageCount, page, sortPacks, min, max, packName, user_id, dispatch])

  useEffect(() => {
    dispatch(setSortPacksAC({sortBy: sort}))
  }, [dispatch, sort])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead sx={{backgroundColor: '#EFEFEF'}}>
            <TableRow>
              <TableCell><SuperSort sort={sort} nameValue={'Name'} value={'name'} onChange={setSort}/></TableCell>
              <TableCell align="center"><SuperSort sort={sort} nameValue={'Cards'} value={'cardsCount'}
                                                   onChange={setSort}/></TableCell>
              <TableCell align="center"><SuperSort nameValue={'Last Updated'} sort={sort} value={'updated'}
                                                   onChange={setSort}/></TableCell>
              <TableCell align="center"><SuperSort nameValue={'Created by'} sort={sort} value={'user_name'}
                                                   onChange={setSort}/></TableCell>
              <TableCell align="center"><span>Actions</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.map((pack) => (
              <TableRow
                key={pack._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell
                  component="th" scope="row"><NavLink style={{textDecoration:'none', color: 'black'}} to={`/cards/${pack._id}`}>{pack.name}</NavLink></TableCell>
                <TableCell
                  align="center">{pack.cardsCount}</TableCell>
                <TableCell align="center">{date(pack.updated)}</TableCell>
                <TableCell align="center">{pack.user_name}</TableCell>
                <TableCell align="center">
                  <ActionButtonTable  packId = {pack._id} userId = {pack.user_id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!packs.length && isLoading !== 'loading' && <div className={s.warn}>Change query parameters</div>}
    </div>
  );
};

