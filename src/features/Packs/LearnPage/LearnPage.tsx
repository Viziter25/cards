import React, {useEffect, useState} from 'react'
import s from './learnPage.module.scss'
import {useAppDispatch, useAppSelector} from 'app/store'
import {Navigate, useParams} from 'react-router-dom'
import {PATH} from 'common/constants/path'
import {BackArrow} from 'common/components/BackArrow/BackArrow'
import {Button, Paper} from '@mui/material'
import {CardType} from '../Cards/cardsAPI'
import {getCardsTC, updateGradeTC} from '../Cards/cards-reducer'
import SuperCheckbox from 'common/components/SuperCheckbox/SuperCheckbox'

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
    const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
    return { sum: newSum, id: newSum < rand ? i : acc.id }
  }
    , { sum: 0, id: -1 });

  return cards[res.id + 1];
}

export const LearnPage = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const packName = useAppSelector(state => state.cardsPage.cards.packName)
  const cards = useAppSelector(state => state.cardsPage.cards.cards)
  const [first, setFirst] = useState<boolean>(true) // const [first, setFirst] = useState<boolean>(0);
  const [isAnswerClicked, setIsAnswerClicked] = useState<boolean>(false)
  const [card, setCard] = useState<CardType>({} as CardType)
  const [grades, setGrades] = useState([
    { id: 1, title: 'Did not know', checked: false },
    { id: 2, title: 'Forgot', checked: false },
    { id: 3, title: 'A lot of thought', checked: false },
    { id: 4, title: 'Сonfused', checked: false },
    { id: 5, title: 'Knew the answer', checked: false }
  ])

  const { packId } = useParams()

  useEffect(() => {
    if (first) {
      if (packId) {
        dispatch(getCardsTC(packId))
        setFirst(false)
      }
    }
    if (cards.length > 0) setCard(getCard(cards))
    return () => {
      console.log('LearnContainer useEffect off')
    }
  }, [dispatch, packId, cards, first]);

  const onNext = () => {
    const checkedRate = grades.filter(el => el.checked)
    const grade = checkedRate[0].id
    if (packId) {
      setIsAnswerClicked(false)
      dispatch(updateGradeTC(packId, { card_id: card._id, grade: grade }))
      setGrades(grades.map(el => ({ ...el, checked: false })))
      setCard(getCard(cards))
    }
  }

  const showAnswerHandler = () => {
    setIsAnswerClicked(true)
  }
  const chooseItemHandler = (id: number) => {
    setGrades(grades.map(el => el.id === id ? { ...el, checked: !el.checked } : { ...el, checked: false }))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <BackArrow to={`/cards/${packId}`} title={'Back to Cards List'} />
      <span className={s.title}>{`Learn "${packName}"`}</span>
      <Paper className={s.paper} elevation={3}>
        <span className={s.question}><b>Question:</b> {card.question}</span>
        <span className={s.shotsNumber}>Количество попыток ответов на вопрос: {card.shots}</span>
        {!isAnswerClicked && <Button className={s.button} onClick={showAnswerHandler} variant="contained">Show answer</Button>}
        {isAnswerClicked && (
          <>
            <span className={s.answer}><b>Answer:</b> {card.answer}</span>
            <span className={s.rateTitle}>Rate yourself:</span>
            {grades.map((g) => (
              <div key={g.id} className={s.rateItem} onClick={() => chooseItemHandler(g.id)}>
                <SuperCheckbox checked={g.checked} className={s.checkBox} />
                <span>{g.title}</span>
              </div>
            ))}
            <Button className={s.button} onClick={onNext} variant="contained">Next</Button>
          </>
        )}
      </Paper>
    </div>
  )
}