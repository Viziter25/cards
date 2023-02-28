import React, {ChangeEvent, FC, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Checkbox, TextField} from '@mui/material';
import s from './modalChildrenPack.module.scss'
import {onChangeImg} from 'common/utils/convertToBase64';
import {useAppDispatch} from 'app/store';
import defaultAva from 'common/image/no_cover.jpg';


type PropsType = {
  packName?: string
  closeHandler: () => void
  dispatchHandler: (values: ValuesPackPropsType) => void
  delet?: string
  deckCover?: string
}

export type ValuesPackPropsType = {
  name?: string
  deckCover?: string
  private?: boolean
}

export const ModalChildrenPack: FC<PropsType> = ({closeHandler, dispatchHandler, packName, delet, deckCover}) => {

  const dispatch = useAppDispatch()

  const [coverImg, setCoverImg] = useState<string>('')
  const onChangeCoverInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeImg(e, dispatch, setCoverImg)
  }


  const formik = useFormik({
    initialValues: {
      name: packName,
      deckCover: deckCover,
      private: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatchHandler({...values, deckCover: coverImg})
      closeHandler()
    }
  })


  return (
    <div className={s.loginContainer}>
      <div className={s.loginContent}>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.form}>
            {
              delet
                ?
                <>
                  <div className={s.deleteQuestion}>Do you really want to remove <b>{packName}</b>?</div>
                  <div>All cards will be deleted</div>
                </>
                :
                <>

                  <div className={s.coverButton}>
                    <div>
                      <img
                        src={ coverImg || deckCover || defaultAva}
                        style={{width: '100px'}}
                        alt="cover"
                      />
                    </div>
                    <Button variant="text" component="label">
                      {deckCover ? 'Change cover' : 'Choose cover'}
                      <input
                        type="file"
                        onChange={onChangeCoverInput}
                        style={{display: 'none'}}
                        accept="image/*"
                      />
                    </Button>
                  </div>

                  <TextField
                    className={s.input}
                    variant={'standard'}
                    label={'Name pack'}
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && <div className={s.error}>{formik.errors.name}</div>}


                  <div className={s.checkBoxCont}>
                    <Checkbox
                      className={s.checkBox}
                      {...formik.getFieldProps('private')}
                      checked={formik.values.private}
                    />
                    <span>Private pack</span>
                  </div>
                </>

            }
            <div className={s.buttonBlock}>
              <Button color={delet ? 'error' : 'info'}
                      className={s.button}
                      type="submit"
                      variant={'contained'}>
                {delet ? 'Delete' : 'Save'}
              </Button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
