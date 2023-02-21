import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, TextField} from '@mui/material';
import s from './modalChildrenCard.module.scss'


type PropsType = {
  closeHandler: () => void
  dispatchHandler: (values: ValuesPropsType) => void
  delet?: string
  question?:string
  answer?:string
}

export type ValuesPropsType = {
  question?: string
  answer?: string
}

export const ModalChildrenCard: FC<PropsType> = ({closeHandler, dispatchHandler, delet,question,answer}) => {

  const formik = useFormik({
    initialValues: {
      question: question,
      answer: answer
    },
    validationSchema: Yup.object({
      question: Yup.string().required('Required'),
      answer: Yup.string().required('Required'),
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
                  <div>Do you really want to remove <b>{question}</b>?</div>
                  <div>All cards will be deleted</div>
                </>
                :
                <>
                  <TextField
                    className={s.input}
                    variant={'standard'}
                    label={'Question'}
                    {...formik.getFieldProps('question')}
                  />
                  {formik.touched.question && formik.errors.question && <div className={s.error}>{formik.errors.question}</div>}
                  <TextField
                    className={s.input}
                    variant={'standard'}
                    label={'Answer'}
                    {...formik.getFieldProps('answer')}
                  />
                  {formik.touched.answer && formik.errors.answer && <div className={s.error}>{formik.errors.answer}</div>}
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
