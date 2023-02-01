import React from 'react'

import arrowDown from './img/down.svg'
import arrowUp from './img/up.svg'
import noneArrow from './img/none.svg'


// добавить в проект иконки и импортировать
const downIcon = arrowDown
const upIcon = arrowUp
const noneIcon = noneArrow

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  if (sort === up) {
    return ''
  }
  if(sort === down) {
    return up
  }
  return down
}


const SuperSort: React.FC<SuperSortPropsType> = (
  {
    sort, value, onChange, id = 'hw15',
  }
) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  const icon = sort === down
    ? downIcon
    : sort === up
      ? upIcon
      : noneIcon

  return (
    <span
      id={id + '-sort-' + value}
      onClick={onChangeCallback}
    >
            <img
              // className={s.img}
              id={id + '-icon-' + sort}
              src={icon}
            />

      {/*{icon} /!*а это убрать*!/*/}
        </span>
  )
}

export default SuperSort
