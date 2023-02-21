import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import s from './modalComponent.module.scss'
import {FC, ReactNode} from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  open:boolean
  title: string
  children: ReactNode
  closeHandler: () => void
}

export const ModalComponent:FC<PropsType> = ({title,children, closeHandler, open }) => {

  return (
    <div>
      <Modal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={s.contentBox}>
            <div className={s.title}>
              <h2>{title}</h2>
              <div className={s.cross} onClick={closeHandler}>
                +
              </div>
            </div>
            <div className={s.line}></div>
            <div className={s.form}> {children} </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}