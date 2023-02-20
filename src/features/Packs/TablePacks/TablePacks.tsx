import React from 'react';
import {useAppSelector} from 'app/store';
import {Paper, Table, TableBody, TableContainer} from '@mui/material';
import s from './tablePacks.module.scss'
import {TableRows} from './TableRow/TableRows';
import {TableHeader} from './TableHead/TableHeader';

export const TablePacks = () => {

  const packs = useAppSelector(state => state.packsPage.packs.cardPacks)
  const isLoading = useAppSelector(state => state.app.isLoading)

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

