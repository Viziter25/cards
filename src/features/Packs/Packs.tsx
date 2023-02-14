import React from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './Packs.module.scss'
import {Button} from '@mui/material'
import {useAppDispatch} from '../../app/store';
import {createPackTC} from './packs-redicer';

export const Packs = () => {
  const dispatch = useAppDispatch()


  const clickHandler = () => {
    dispatch(createPackTC({
        name: 'new Packs by Zlotnik',
        private:false
      }
    ))
  }

  return (
    <div className={s.container}>
      <div className={s.miniHeader}>
        <span className={s.title}>Packs list</span>
        <Button className={s.button} variant={'contained'} onClick={clickHandler}>Add new pack</Button>
      </div>
      {/* search component */}
      <TablePacks/>
      {/* pagination component */}
    </div>
  );
};



