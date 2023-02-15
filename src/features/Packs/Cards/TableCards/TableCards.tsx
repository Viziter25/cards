import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SuperSort from "../../../../common/components/SuperSort/SuperSort";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {setSortCardsAC} from "../cards-reducer";

export const TableCards = () => {

  const cards = useAppSelector(state => state.cardsPage.cards.cards)
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState('')

  useEffect(() => {
    dispatch(setSortCardsAC({sortBy: sort}))
  }, [dispatch, sort])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead sx={{backgroundColor: '#EFEFEF'}}>
            <TableRow>
              <TableCell align="center"><SuperSort sort={sort} nameValue={'Question'} value={'cardQuestion'} onChange={setSort}/></TableCell>
              <TableCell align="center"><SuperSort sort={sort} nameValue={'Answer'} value={'cardAnswer'}
                                                   onChange={setSort}/></TableCell>
              <TableCell align="center"><SuperSort nameValue={'Last Updated'} sort={sort} value={'updated'}
                                                   onChange={setSort}/></TableCell>
              <TableCell align="center"><SuperSort nameValue={'Grade'} sort={sort} value={'grade'}
                                                   onChange={setSort}/></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow
                key={card._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center">{card.question}</TableCell>
                <TableCell align="center">{card.answer}</TableCell>
                <TableCell align="center">{card.updated}</TableCell>
                <TableCell align="center">{card.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

