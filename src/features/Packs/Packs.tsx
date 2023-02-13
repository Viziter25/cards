import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
//import {setPacksTC} from './packs-redicer';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {fetchPacks} from './packs-redicer';

export const Packs = () => {

  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.packs)

  console.log('packs', packs)

  // function createData(
  //   name: string,
  //   calories: number,
  //   fat: number,
  //   carbs: number,
  //   protein: number,
  // ) {
  //   return { name, calories, fat, carbs, protein };
  // }

  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];



  useEffect(() => {
   dispatch(fetchPacks({}))
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
              key={row.name}
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

