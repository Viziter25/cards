import s from './SliderComponent.module.scss'
import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider'
import useDebounce from '../../../hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { setSliderValuesAC } from 'features/Packs/packs-reducer'


export const SliderComponent = React.memo(() => {

  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(st => st.packsPage.packs.minCardsCount)
  const maxCardsCount = useAppSelector(st => st.packsPage.packs.maxCardsCount)
  const min = useAppSelector(st => st.packsPage.queryParams.min)
  const max = useAppSelector(st => st.packsPage.queryParams.max)

  const [sliderValue, setSliderValue] = useState<number[]>([min, max])
  const sliderDebounce = useDebounce(sliderValue)

  useEffect(() => {
    setSliderValue([min, max])
  }, [min, max])

  const changeSliderHandler = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[])
  }

  useEffect(() => {
    dispatch(setSliderValuesAC({ sliderValues: sliderDebounce }))
  }, [sliderDebounce, dispatch])

  return (
    <div className={s.container}>
      <span className={s.title}>Number of cards</span>
      <div className={s.sliderContainer}>
        <span className={s.span}>{sliderValue[0]}</span>
        <Slider min={minCardsCount} max={maxCardsCount} value={sliderValue} onChange={changeSliderHandler} className={s.slider} />
        <span className={s.span}>{sliderValue[1]}</span>
      </div>
    </div>
  )
})