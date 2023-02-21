import React, {ChangeEvent, memo, useEffect} from 'react'

import {Pagination} from '@mui/material'
import s from './SuperPagination.module.scss'
import SuperSelect from '../SuperSelect/SuperSelect';
import {useAppDispatch} from "../../../app/store";
import {setPageCountAC} from "../../../features/Packs/packs-reducer";

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number) => void
}

export const SuperPagination: React.FC<SuperPaginationPropsType> = memo((
  {
    page, itemsCountForPage, totalCount, onChange, id = 'hw15',
  }
) => {

  const dispatch = useAppDispatch()
  const lastPage = Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

  useEffect(() => {
    onChange(page)
  }, [onChange, page, itemsCountForPage])

  const onChangeCallback = (event: React.ChangeEvent<unknown>, page: number) => {
    onChange(page)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPageCountAC({pageCount: +event.currentTarget.value}))
    onChange(page)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={{}}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
        color="primary"
        shape="rounded"
      />

      <div className={s.selectContainer}>
        <span className={s.text1}>Show</span>
        <SuperSelect
          id={id + '-pagination-select'}
          value={itemsCountForPage}
          options={[
            { id: 5, value: 5 },
            { id: 10, value: 10 },
            { id: 15, value: 15 },
            { id: 20, value: 20 },
          ]}
          onChange={onChangeSelect}
        />
        <span className={s.text2}>Cards per Page</span>
      </div>
    </div>
  )
})

