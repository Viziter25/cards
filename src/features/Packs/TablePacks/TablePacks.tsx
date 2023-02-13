import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {setPacksTC} from '../packs-redicer';
import {ActionButtonTable} from './ActionButtonTable';
import {date} from '../../../common/utils/dateConvertor';

export const TablePacks = () => {

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packsPage.packs.cardPacks)

  console.log('packs', packs)


  useEffect(() => {
    dispatch(setPacksTC())
  }, [])


  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#EFEFEF'}}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Cards</TableCell>
            <TableCell align="center">Last Updated</TableCell>
            <TableCell align="center">Created by</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {packs.map((pack) => (
            <TableRow
              key={pack._id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell
                component="th" scope="row">{pack.name}</TableCell>
              <TableCell
                align="center">{pack.cardsCount}</TableCell>
              <TableCell align="center">{date(pack.updated)}</TableCell>
              <TableCell align="center">{pack.user_name}</TableCell>
              <TableCell align="center">
                <ActionButtonTable/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

