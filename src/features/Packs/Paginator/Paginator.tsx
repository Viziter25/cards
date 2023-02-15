import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import SuperPagination from '../../../common/components/SuperPagination/SuperPagination'
import { setCurrentPageAC, setPageCountAC } from '../packs-reducer'

export const Paginator = React.memo(() => {

  const dispatch = useAppDispatch()

  const currentPage = useAppSelector(st => st.packsPage.queryParams.page)
  const packsPageCount = useAppSelector(st => st.packsPage.packs.pageCount)
  const packsTotalCount = useAppSelector(st => st.packsPage.packs.cardPacksTotalCount)

  const onChangePagination = (newPage: number, newCount: number) => {
    dispatch(setCurrentPageAC({ currentPage: newPage }))
    dispatch(setPageCountAC({ pageCount: newCount }))
  }

  return (
    <SuperPagination
      page={currentPage || 1}
      itemsCountForPage={packsPageCount || 5}
      totalCount={packsTotalCount}
      onChange={onChangePagination}
    />
  )
})