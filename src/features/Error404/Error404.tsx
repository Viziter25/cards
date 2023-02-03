import React from 'react';
import error404 from './images/400.svg'
import s from './Error404.module.css'

export const Error404 = () => {
  return (
    <div id={'hw5-page-404'}>
      <div className={s.wrapper}>
        <img src={error404} alt={'404'} className={s.error404} />
      </div>
    </div>
  )
};
