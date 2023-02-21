import React, {FC} from 'react'
import {useAppSelector} from '../../../app/store'
import {SuperPagination} from '../SuperPagination/SuperPagination'

type PaginatorPropsType = {
  onPagination: (newPage: number) => void
  pageCount: number
  page: number
}

export const Paginator:FC<PaginatorPropsType> = React.memo(({onPagination, pageCount, page}) => {

  const packsTotalCount = useAppSelector(st => st.packsPage.packs.cardPacksTotalCount)

  const onChangePagination = (newPage: number) => {
    onPagination(newPage)
  }

  return (
    <SuperPagination
      page={page}
      itemsCountForPage={pageCount}
      totalCount={packsTotalCount || 1}
      onChange={onChangePagination}
    />
  )
})