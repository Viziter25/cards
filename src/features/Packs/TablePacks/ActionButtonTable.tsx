import React from 'react';
import deleteIcon from '../../../common/icons/delete.svg'
import teacherIcon from '../../../common/icons/learn.svg'
import editIcon from '../../../common/icons/edit.svg'

export const ActionButtonTable = () => {
  return (
    <div>
      <a href="src/features/Packs"><img src={teacherIcon} alt=""/></a>
      <a href="src/features/Packs"><img src={editIcon} alt=""/></a>
      <a href="src/features/Packs"><img src={deleteIcon} alt=""/></a>
    </div>
  );
};

