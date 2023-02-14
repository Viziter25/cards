import React from 'react'
import s from './superSort.module.scss'
import arrowDown from './img/down.svg'
import arrowUp from './img/up.svg'


// добавить в проект иконки и импортировать
const downIcon = arrowDown
const upIcon = arrowUp

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  nameValue: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  if (sort === up) {
    return ''
  }
  if (sort === down) {
    return up
  }
  return down
}


const SuperSort: React.FC<SuperSortPropsType> = (
  {
    sort, value, nameValue, onChange, id = 'hw15',
  }
) => {
  const up = '1' + value
  const down = '0' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  const icon = sort === down
    ? downIcon
    : sort === up
      ? upIcon
      : ''

  return (
    <span
      id={id + '-sort-' + value}
      onClick={onChangeCallback}
      className={s.sortSpan}
    >
      {nameValue}
            <img
              style={{width: '15px', height: '12px'}}
              // className={s.img}
              id={id + '-icon-' + sort}
              src={icon}
              alt={''}
            />

      {/*{icon} /!*а это убрать*!/*/}
        </span>
  )
}

export default SuperSort
