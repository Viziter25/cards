import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SuperSort from "../../../../common/components/SuperSort/SuperSort";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {setSortCardsAC} from "../cards-reducer";
import {Grades} from "../Grades/Grades";
import {CardsActions} from "../CardsActions/CardsActions";
import s from './tableCards.module.scss'
import {date} from "../../../../common/utils/dateConvertor";

export const TableCards = () => {

  const cards = useAppSelector(state => state.cardsPage.cards.cards)
  const cardsTotalCount = useAppSelector(state => state.cardsPage.cards.cardsTotalCount)
  const cardQuestion = useAppSelector(state => state.cardsPage.queryParams.cardQuestion)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const profileId = useAppSelector(state => state.profile._id)
  const packUserId = useAppSelector(state => state.cardsPage.cards.packUserId)
  const sort = useAppSelector(state => state.cardsPage.queryParams.sortCards)
  const dispatch = useAppDispatch()

  const setSort = (value: string) => {
    dispatch(setSortCardsAC({sortBy: value}))
  }

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
              {(profileId === packUserId) && <TableCell align="center"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow
                key={card._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center" sx={{wordBreak: 'break-word', padding: '0'}}>{card.questionImg ? <img className={s.img} src={card.questionImg} alt=""/> : card.question}</TableCell>
                <TableCell align="center" sx={{wordBreak: 'break-word', padding: '0'}}>{card.answerImg ? <img className={s.img} src={card.answerImg} alt=""/> : card.answer}</TableCell>
                <TableCell align="center">{date(card.updated)}</TableCell>
                <TableCell align="center"><Grades rating={card.grade}/></TableCell>
                {(profileId === packUserId) &&
                    <TableCell align="center">
                        <CardsActions questionImg={card.questionImg} answerImg={card.answerImg} packId={card.cardsPack_id} id={card._id} question={card.question} answer={card.answer} />
                    </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!cardsTotalCount && cardQuestion && isLoading  !== 'loading' && <div className={s.warn}>Change query parameters</div>}
    </div>
  );
};

