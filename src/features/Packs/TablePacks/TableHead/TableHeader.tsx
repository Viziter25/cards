import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';
import SuperSort from '../../../../common/components/SuperSort/SuperSort';
import {setSortPacksAC} from '../../packs-reducer';
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import * as selectors from "common/selectors/selectors";

export const TableHeader = () => {
  const dispatch = useAppDispatch()
  const sort = useAppSelector(selectors.sortPacks)

  const setSort = (value: string) => {
    dispatch(setSortPacksAC({sortBy: value}))
  }

  return (
    <TableHead sx={{backgroundColor: '#EFEFEF'}}>
      <TableRow>
        <TableCell>
          <SuperSort sort={sort} nameValue={'Cover'} value={'cover'} onChange={setSort}/>
        </TableCell>
        <TableCell>
          <SuperSort sort={sort} nameValue={'Name'} value={'name'} onChange={setSort}/>
        </TableCell>
        <TableCell align="center">
          <SuperSort sort={sort} nameValue={'Cards'} value={'cardsCount'} onChange={setSort}/>
        </TableCell>
        <TableCell align="center">
          <SuperSort nameValue={'Last Updated'} sort={sort} value={'updated'} onChange={setSort}/>
        </TableCell>
        <TableCell align="center">
          <SuperSort nameValue={'Created by'} sort={sort} value={'user_name'} onChange={setSort}/>
        </TableCell>
        <TableCell align="center"><span>Actions</span></TableCell>
      </TableRow>
    </TableHead>
  );
};
