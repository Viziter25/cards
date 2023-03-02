import React, {useState} from 'react';
import {useAppSelector} from 'app/store';
import {Paper, Table, TableBody, TableContainer} from '@mui/material';
import s from './tablePacks.module.scss'
import {TableRows} from './TableRow/TableRows';
import {TableHeader} from './TableHead/TableHeader';

export const TablePacks = () => {

  const packs = useAppSelector(state => state.packsPage.packs.cardPacks)
  const packName = useAppSelector(state => state.packsPage.queryParams.packName)
  const min = useAppSelector(state => state.packsPage.queryParams.min)
  const max = useAppSelector(state => state.packsPage.queryParams.max)
  const minCardsCount = useAppSelector(state => state.packsPage.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packsPage.packs.maxCardsCount)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const [count, setCount] = useState([minCardsCount, maxCardsCount])

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
                         user_name={pack.user_name}
                         deckCover={pack.deckCover}
                        />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {((!packs.length && !!packName) || (!packs.length && count[0] !== min && count[1] !== max)) && isLoading !== 'loading' &&  <div className={s.warn}>Change query parameters</div>}
    </div>
  );
};

