import React, {FC} from 'react';
import s from './miniHeader.module.scss'
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {ModalComponent} from '../Modal/ModalComponent';
import {ModalChildrenPack} from '../Modal/ChildrenPank/ModalChildrenPack';
import {createPackTC} from '../../../features/Packs/packs-reducer';
import {ModalChildrenCard, ValuesPropsType} from '../Modal/ChildrenCard/ModalChildrenCard';
import {useParams} from 'react-router-dom';
import {createCardTC} from '../../../features/Packs/Cards/cards-reducer';
import {PackPostType} from '../../../features/Packs/packsAPI';

type MiniHeaderPropsType = {
  title: string
  buttonTitle?: string
  isButton?: boolean
  callback: () => void
  open: boolean
  setOpen: (open: boolean) => void
}

export const MiniHeader: FC<MiniHeaderPropsType> = ({
                                                      title,
                                                      buttonTitle,
                                                      isButton,
                                                      callback,
                                                      open,
                                                      setOpen
                                                    }) => {
  const {packId} = useParams()

  const status = useAppSelector(state => state.packsPage.packs.entityStatus)

  const dispatch = useAppDispatch()


  const onClickHandler = () => {
    callback && callback()
  }

  const dispatchHandlerPack = (values: PackPostType) => {
    console.log(values)
    dispatch(createPackTC(values))
  }

  const dispatchHandlerCard = (values: ValuesPropsType) => {
    packId && dispatch(createCardTC(packId, {
      cardsPack_id: packId,
      question: values.question,
      answer: values.answer,
      questionImg: values.questionImg,
      answerImg: values.answerImg
    }))
  }

  return (
    <div className={s.miniHeader}>
      <span className={s.title}>{title}</span>
      {/*Modal*/}

      {buttonTitle === 'Add new pack'
        ?
        <ModalComponent title={'Add new pack'} closeHandler={() => setOpen(false)} open={open}>
          <ModalChildrenPack closeHandler={() => setOpen(false)} dispatchHandler={dispatchHandlerPack}/>
        </ModalComponent>
        :
        <ModalComponent title={'Add new card'} closeHandler={() => setOpen(false)} open={open} >
          <ModalChildrenCard closeHandler={() => setOpen(false)} dispatchHandler={dispatchHandlerCard}/>
        </ModalComponent>
      }

      {isButton || <Button disabled={status === 'loading'}
                           className={s.button}
                           variant={'contained'}
                           onClick={onClickHandler}>
        {buttonTitle}
      </Button>}

    </div>
  );
};

