import React, { ChangeEvent, useEffect, useState } from 'react'

import { Pagination } from '@mui/material'
import s from './SuperPagination.module.scss'
import SuperSelect from '../SuperSelect/SuperSelect';

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
  {
    page, itemsCountForPage, totalCount, onChange, id = 'hw15',
  }
) => {
  const [pageSize, setPageSize] = useState(itemsCountForPage)
  const lastPage = Math.ceil(totalCount / pageSize) // пишет студент // вычислить количество страниц

  useEffect(() => {
    onChange(page, pageSize)
  }, [pageSize])

  const onChangeCallback = (event: React.ChangeEvent<unknown>, page: number) => {
    onChange(page, pageSize)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+event.currentTarget.value)
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
}

export default SuperPagination