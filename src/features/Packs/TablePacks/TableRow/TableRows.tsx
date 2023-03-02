import React, {FC} from 'react';
import { TableCell, TableRow} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {ActionButtonTable} from '../ButtonTable/ActionButtonTable';
import {date} from 'common/utils/dateConvertor';
import s from './tableRows.module.scss'
import coverDefault from 'common/image/no_cover.jpg'


type PropsType = {
  _id: string
  updated: string
  user_name: string
  user_id: string
  cardsCount: number
  name: string
  deckCover:string
}

export const TableRows:FC<PropsType> = React.memo(({name, user_name,user_id,updated,cardsCount,_id,deckCover}) => {

  const cover = deckCover ? deckCover : coverDefault
  return (
      <TableRow
        key={_id}
        sx={{'&:last-child td, &:last-child th': {border: 0}}}>

        <TableCell align="center">
          <NavLink style={{textDecoration:'none', color: 'black'}} to={`/cards/${_id}`}>
            <img className={s.imgCover} src={cover} alt=""/>
          </NavLink>
        </TableCell>
        <TableCell component="th" scope="row" sx={{width: '20%'}}>
          <NavLink style={{textDecoration:'none', color: 'black'}} to={`/cards/${_id}`}>
            {name.length > 50 ? name.slice(0, 50) + '...' : name}
          </NavLink>
        </TableCell>
        <TableCell align="center">{cardsCount}</TableCell>
        <TableCell align="center">{date(updated)}</TableCell>
        <TableCell align="center" sx={{width: '20%'}}>{user_name.length > 50 ? user_name.slice(0, 50) + '...' : user_name}</TableCell>
        <TableCell align="center">
          <ActionButtonTable  packId = {_id} userId = {user_id} cardsCount={cardsCount} name={name} deckCover={cover}/>
        </TableCell>
      </TableRow>
    )
})