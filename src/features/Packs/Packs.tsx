import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {setPacksTC} from './packs-redicer';

export const Packs = () => {

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.packs.cardPacks)

  console.log('packs', packs)



  useEffect(() => {
   dispatch(setPacksTC())
  },[])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                component="th" scope="row">{row.name}</TableCell>
              <TableCell
                align="right">{row.cardsCount}</TableCell>
              <TableCell align="right">{row.updated}</TableCell>
              <TableCell align="right">{row.user_name}</TableCell>
              {/*<TableCell align="right">{row.}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

