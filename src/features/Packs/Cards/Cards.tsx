import React, { useEffect, useState } from 'react'
import s from './Cards.module.scss'
import { BackArrow } from "../../../common/components/BackArrow/BackArrow"
import { PATH } from "../../../common/constants/path"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { createCardTC, getCardsTC, setQuestion } from "./cards-reducer"
import { MiniHeader } from "../../../common/components/MiniHeader/MiniHeader"
import { useParams } from "react-router-dom"
import { TableCards } from "./TableCards/TableCards"
import { SearchInput } from "../../../common/components/searchInput/SearchInput"
import { Button } from '@mui/material'
import { PackActions } from './PackActions/PackActions'

export const Cards = () => {

  const { packId } = useParams()

  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.cardsPage.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cardsPage.cards.cardsTotalCount)
  const cardQuestion = useAppSelector(state => state.cardsPage.queryParams.cardQuestion)
  const cardAnswer = useAppSelector(state => state.cardsPage.queryParams.cardAnswer)
  const min = useAppSelector(state => state.cardsPage.queryParams.min)
  const max = useAppSelector(state => state.cardsPage.queryParams.max)
  const sortCards = useAppSelector(state => state.cardsPage.queryParams.sortCards)
  const page = useAppSelector(state => state.cardsPage.queryParams.page)
  const pageCount = useAppSelector(state => state.cardsPage.queryParams.pageCount)
  const profileId = useAppSelector(state => state.profile._id)
  const packUserId = useAppSelector(state => state.cardsPage.cards.packUserId)

  const [searchInputValue, setSearchInputValue] = useState('')

  useEffect(() => {
    if (packId) {
      dispatch(getCardsTC(packId))
    }
  }, [dispatch, packId, cardAnswer, cardQuestion, min, max, sortCards, page, pageCount, packName])

  const searchHandler = (question: string) => {
    dispatch(setQuestion({ question: question }))
  }
  const onClickHandler = () => {
    packId && dispatch(createCardTC(packId, { cardsPack_id: packId }))
  }

  return (
    <div className={s.cardsContainer}>
      <BackArrow to={PATH.PACKS} title={'Back to Packs List'} />
      <div className={s.miniHeader}>
        <MiniHeader title={packName} buttonTitle={'Add new card'} callback={onClickHandler} isButton={!cardsTotalCount || (profileId !== packUserId)} />
        {(profileId === packUserId) && packId && <PackActions packId={packId} />}
      </div>
      {cardsTotalCount
        ?
        <div>
          <div className={s.filter}>
            <SearchInput searchHandler={searchHandler} searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} />
          </div>
          <TableCards />
        </div>
        :
        profileId === packUserId
          ?
          <div className={s.emptyCardsArray}>
            <span className={s.span}>This pack is empty. Click add new card to fill this pack</span>
            <Button className={s.button} variant={"contained"} onClick={onClickHandler}>Add new card</Button>
          </div>
          :
          <span className={s.warning}>This pack is empty. Click "Back to Packs List" to fill this pack</span>
      }
    </div>
  )
}

