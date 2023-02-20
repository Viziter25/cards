import React, {FC} from 'react'
import {useAppSelector} from '../../../app/store'
import {SuperPagination} from '../SuperPagination/SuperPagination'

type PaginatorPropsType = {
  onPagination: (newPage: number, newCount: number) => void
}

export const Paginator:FC<PaginatorPropsType> = React.memo(({onPagination}) => {

  const currentPage = useAppSelector(st => st.packsPage.queryParams.page)
  const packsPageCount = useAppSelector(st => st.packsPage.queryParams.pageCount)
  const packsTotalCount = useAppSelector(st => st.packsPage.packs.cardPacksTotalCount)

  const onChangePagination = (newPage: number, newCount: number) => {
    onPagination(newPage, newCount)
  }

  return (
    <SuperPagination
      page={currentPage}
      itemsCountForPage={packsPageCount}
      totalCount={packsTotalCount || 1}
      onChange={onChangePagination}
    />
  )
})