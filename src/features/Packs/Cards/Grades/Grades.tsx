import React, {FC} from 'react';
import star from '../../../../common/icons/star.svg'
import fullStar from '../../../../common/icons/fullStar.svg'
import s from './grades.module.scss'

type GradesPropsType = {
  rating: number
}

export const Grades:FC<GradesPropsType> = ({rating}) => {
  return (
    <div className={s.gradesContainer}>
      <Grade selected={rating > 0}/>
      <Grade selected={rating > 1}/>
      <Grade selected={rating > 2}/>
      <Grade selected={rating > 3}/>
      <Grade selected={rating > 4}/>
    </div>
  );
};

type GradePropsType = {
  selected: boolean
}

const Grade: FC<GradePropsType> = ({selected}) => {
  return <div>{selected ? <img src={fullStar} alt=""/> : <img src={star} alt=""/>}</div>
}

