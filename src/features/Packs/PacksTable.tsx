import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { getPacksTC } from './packs-reducer'

export const PacksTable = () => {

  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(state => state.auth.isLoggedIn)
  const packs = useAppSelector(state => state.packs.packs.cardPacks)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [dispatch])

  const date = (date: string) => {
    const number = Date.parse(date)
    const day = new Date(number).getDay()
    const mounth = new Date(number).getMonth()
    const year = new Date(number).getFullYear()
    return '' + (day > 9 ? day : '0' + day) + '.' + (mounth > 9 ? mounth : '0' + mounth) + '.' + year
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Cards</TableCell>
            <TableCell align="left">Last Updated</TableCell>
            <TableCell align="left">Created by</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            packs.map(pack => (
              <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{pack.name}</TableCell>
                <TableCell align="left">{pack.cardsCount}</TableCell>
                <TableCell align="left">{date(pack.updated)}</TableCell>
                <TableCell align="left">{pack.user_name}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}