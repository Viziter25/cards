import React, {useEffect, useState} from 'react';
import s from './cards.module.scss'
import {BackArrow} from "../../../common/components/BackArrow/BackArrow";
import {PATH} from "../../../common/constants/path";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setCardsTC, setQuestion} from "./cards-reducer";
import {MiniHeader} from "../../../common/components/MiniHeader/MiniHeader";
import {useParams} from "react-router-dom";
import {TableCards} from "./TableCards/TableCards";
import {SearchInput} from "../../../common/components/searchInput/SearchInput";
import {Button} from "@mui/material";

export const Cards = () => {

  const {packId} = useParams()

  const dispatch = useAppDispatch()
  const cardsName = useAppSelector(state => state.cardsPage.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cardsPage.cards.cardsTotalCount)
  const cardAnswer = useAppSelector(state => state.cardsPage.queryParams.cardAnswer)
  const cardQuestion = useAppSelector(state => state.cardsPage.queryParams.cardQuestion)
  const min = useAppSelector(state => state.cardsPage.queryParams.min)
  const max = useAppSelector(state => state.cardsPage.queryParams.max)
  const sortCards = useAppSelector(state => state.cardsPage.queryParams.sortCards)
  const page = useAppSelector(state => state.cardsPage.queryParams.page)
  const pageCount = useAppSelector(state => state.cardsPage.queryParams.pageCount)
  const cards = useAppSelector(state => state.cardsPage.cards)
  const profileId = useAppSelector(state => state.profile._id)

  const [searchInputValue, setSearchInputValue] = useState('')

  useEffect(() => {
    if (packId) {
      dispatch(setCardsTC(packId))
    }
  }, [packId, dispatch, cardAnswer, cardQuestion, min, max, sortCards, page, pageCount])

  const searchHandler = (question: string) => {
    dispatch(setQuestion({question: question}))
  }

  return (
    <div className={s.cardsContainer}>
      <BackArrow to={PATH.PACKS} title={'Back to Packs List'}/>
      <MiniHeader title={cardsName} buttonTitle={'Learn to pack'} isButton={!cardsTotalCount}/>
      {!cardsTotalCount && !cardQuestion && profileId === cards.packUserId ?
        <div className={s.addCardContainer}>
          <h2 className={s.addCardsWarn}>This pack is empty. Click add new card to fill this pack</h2>
          <Button className={s.button} variant={"contained"}>{'Add New Card'}</Button>
        </div>
        :
        <div>

          {!cardsTotalCount && !cardQuestion ? <div>123</div> : <div>
            <div className={s.filter}>
              <SearchInput searchHandler={searchHandler} searchInputValue={searchInputValue}
                           setSearchInputValue={setSearchInputValue}/>
            </div>
            <TableCards/>
          </div>}
        </div>
      }
    </div>
  );
};

