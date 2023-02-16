import React, {useEffect, useState} from 'react';
import s from './cards.module.scss'
import {BackArrow} from "../../../common/components/BackArrow/BackArrow";
import {PATH} from "../../../common/constants/path";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setCardsTC, setCurrentCardsPageAC, setPageCardsCountAC, setQuestion} from './cards-reducer';
import {MiniHeader} from "../../../common/components/MiniHeader/MiniHeader";
import {useParams} from "react-router-dom";
import {TableCards} from "./TableCards/TableCards";
import {SearchInput} from "../../../common/components/searchInput/SearchInput";
import SuperPagination from '../../../common/components/SuperPagination/SuperPagination';

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
  const [searchInputValue, setSearchInputValue] = useState('')


  const pageCountPagination = useAppSelector(state => state.cardsPage.cards.pageCount)
  const cardsTotalCountCountPagination = useAppSelector(state => state.cardsPage.cards.cardsTotalCount)

  useEffect(() => {
    if (packId) {
      dispatch(setCardsTC(packId))
    }
  }, [packId, dispatch, cardAnswer, cardQuestion, min, max, sortCards, page, pageCount])

  const searchHandler = (question: string) => {
    dispatch(setQuestion({question: question}))
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(setCurrentCardsPageAC({ currentPage: newPage }))
    dispatch(setPageCardsCountAC({ pageCount: newCount }))
  }


  return (
    <div className={s.cardsContainer}>
      <BackArrow to={PATH.PACKS} title={'Back to Packs List'}/>
      <MiniHeader title={cardsName} buttonTitle={'Learn to pack'} isButton={!cardsTotalCount}/>
      <div className={s.filter}>
        <SearchInput searchHandler={searchHandler} searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue}/>
      </div>
      <TableCards/>
      <SuperPagination page={page || 1} itemsCountForPage={pageCountPagination || 5} totalCount={cardsTotalCountCountPagination || 1} onChange={onChangePagination}/>
    </div>
  );
};

