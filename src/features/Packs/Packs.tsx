import React from 'react';
import {TablePacks} from './TablePacks/TablePacks';
import s from './Packs.module.scss'
import { Button } from '@mui/material'

export const Packs = () => {


  return (
    <div className={s.container}>
      <div className={s.miniHeader}>
        <span className={s.title}>Packs list</span>
        <Button className={s.button} variant={"contained"}>Add new pack</Button>
      </div>
      {/* search component */}
      <TablePacks/>
      {/* pagination component */}
    </div>
  );
};



