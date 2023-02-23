import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Checkbox, TextField} from '@mui/material';
import s from './modalChildrenPack.module.scss'


type PropsType = {
  packName?: string
  closeHandler: () => void
  dispatchHandler: (values: ValuesPropsType) => void
  delet?: string
}

export type ValuesPropsType = {
  name?: string,
  private?: boolean
}

export const ModalChildrenPack: FC<PropsType> = ({closeHandler, dispatchHandler, packName, delet}) => {

  const formik = useFormik({
    initialValues: {
      name: packName,
      private: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatchHandler(values)
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
              <Button color={delet ? 'error': 'info'}
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
