import s from './SliderComponent.module.scss'
import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import { Input } from '@mui/material';
import useDebounce from '../../../hooks/debounce';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setSliderValuesAC } from '../packs-reducer';

export const SliderComponent = React.memo(() => {

  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(st => st.packsPage.packs.minCardsCount)
  const maxCardsCount = useAppSelector(st => st.packsPage.packs.maxCardsCount)
  const minQuery = useAppSelector(st => st.packsPage.queryParams.min)
  const maxQuery = useAppSelector(st => st.packsPage.queryParams.max)

  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount])

  const sliderDebaunce = useDebounce(sliderValue, 1000)

  useEffect(() => {
    setSliderValue([minQuery || minCardsCount, maxQuery || maxCardsCount])
  }, [minCardsCount, maxCardsCount, minQuery, maxQuery])
  useEffect(() => {
    dispatch(setSliderValuesAC({ sliderValues: sliderDebaunce }))
  }, [dispatch, sliderDebaunce])

  const changeSliderHandler = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  }
  const changeMinInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue([Number(event.currentTarget.value), sliderValue[1]]);
  }
  const changeMaxInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue([sliderValue[0], Number(event.currentTarget.value)]);
  }

  return (
    <div className={s.container}>
      <span className={s.title}>Number of cards</span>
      <div className={s.sliderContainer}>
        <Input
          className={sliderValue[0] < 10 ? s.input1 : s.input2}
          inputProps={{
            step: 1,
            min: 0,
            max: maxCardsCount - 1,
          }}
          onChange={changeMinInputHandler}
          value={sliderValue[0] ? sliderValue[0]  : 0}
        />
        <Slider min={0} max={maxCardsCount} value={sliderValue} onChange={changeSliderHandler} className={s.slider} />
        <Input
          className={sliderValue[1] < 10 ? s.input1 : s.input2}
          inputProps={{
            step: 1,
            min: 1,
            max: maxCardsCount,
          }}
          onChange={changeMaxInputHandler}
          value={sliderValue[1] ? sliderValue[1] : 0}
        />
      </div>

    </div>
  )
})