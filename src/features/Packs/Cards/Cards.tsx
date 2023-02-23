import React, {useEffect, useState} from 'react';
import s from './cards.module.scss'
import {BackArrow} from "../../../common/components/BackArrow/BackArrow"
import {PATH} from "../../../common/constants/path"
import {useAppDispatch, useAppSelector} from "../../../app/store"
import {getCardsTC, setCurrentCardsPageAC, setPageCardsCountAC, setQuestion} from "./cards-reducer"
import {MiniHeader} from "../../../common/components/MiniHeader/MiniHeader"
import {useNavigate, useParams} from "react-router-dom"
import {TableCards} from "./TableCards/TableCards"
import {SearchInput} from "../../../common/components/SearchInput/SearchInput"
import {Button} from '@mui/material'
import {PackActions} from './PackActions/PackActions'
import {SuperPagination} from 'common/components/SuperPagination/SuperPagination';


export const Cards = () => {

  const {packId} = useParams()

  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.cardsPage.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cardsPage.cards.cardsTotalCount)
  const cardQuestion = useAppSelector(state => state.cardsPage.queryParams.cardQuestion)
  const sortCards = useAppSelector(state => state.cardsPage.queryParams.sortCards)
  const page = useAppSelector(state => state.cardsPage.queryParams.page)
  const pageCount = useAppSelector(state => state.cardsPage.queryParams.pageCount)
  const packUserId = useAppSelector(state => state.cardsPage.cards.packUserId)
  const profileId = useAppSelector(state => state.profile._id)
  const cardsTotalCountCountPagination = useAppSelector(state => state.cardsPage.cards.cardsTotalCount)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const [searchInputValue, setSearchInputValue] = useState(cardQuestion || '')

  useEffect(() => {
    if (packId) {
      dispatch(getCardsTC(packId))
    }
  }, [packId, dispatch, cardQuestion, sortCards, page, pageCount, packName])

  const navigate = useNavigate()

  const searchHandler = (question: string) => {
    dispatch(setQuestion({question: question}))
  }

  const [open, setOpen] = useState(false);
  const onClickHandler = () => {
    setOpen(true)
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(setCurrentCardsPageAC({ currentPage: newPage }))
    dispatch(setPageCardsCountAC({ pageCount: newCount }))
  }

  const isLearnOrAdd = (profileId !== packUserId) ? () => {navigate(`/learn/${packId}`)} : onClickHandler

  return (
    <div className={s.cardsContainer}>
      <BackArrow to={PATH.PACKS} title={'Back to Packs List'}/>
      <div className={s.miniHeader}>
        <MiniHeader title={packName}
                    buttonTitle={(profileId !== packUserId) ? 'Learn Pack' : 'Add new card'}
                    callback={isLearnOrAdd}
                    isButton={!cardsTotalCount}
                    open={open}
                    setOpen={setOpen}
        />

        {(profileId === packUserId) && packId && <PackActions packName={packName} packId={packId}/>}

      </div>
      {!cardsTotalCount && !cardQuestion && profileId === packUserId ?
        <div className={s.addCardContainer}>
          <h2 className={s.addCardsWarn}>This pack is empty. Click add new card to fill this pack</h2>
          <Button onClick={onClickHandler} className={s.button} variant={"contained"}>{'Add New Card'}</Button>
        </div>
        :
        <div>
          {!cardsTotalCount && !cardQuestion && isLoading !== 'loading' ? <div className={s.warn}>This pack is empty. Click "Back to Packs List" to fill this pack
          </div> : <div>
            <div className={s.filter}>
              <SearchInput searchHandler={searchHandler} setSearchInputValue={setSearchInputValue} searchInputValue={searchInputValue}/>
            </div>
            <TableCards/>
            <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={cardsTotalCountCountPagination || 1} onChange={onChangePagination}/>
          </div>}
        </div>
      }
    </div>
  );
};

