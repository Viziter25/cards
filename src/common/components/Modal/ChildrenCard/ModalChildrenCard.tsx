import React, {FC, useState} from 'react';
import {useFormik} from 'formik';
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import s from './modalChildrenCard.module.scss'
import {InputTypeFile} from "../../InputTypeFile/InputTypeFile";


type PropsType = {
  closeHandler: () => void
  dispatchHandler: (values: ValuesPropsType) => void
  delet?: string
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
}

export type ValuesPropsType = {
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
}

export const ModalChildrenCard: FC<PropsType> = ({closeHandler, dispatchHandler, delet, question, answer, questionImg, answerImg}) => {

  const [selectValue, setSelectValue] = useState('text')
  const [answerImgValue, setAnswerImgValue] = useState('')
  const [questionImgValue, setQuestionImgValue] = useState('')
  const onChangeSelectValue = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value)
  }

  const formik = useFormik({
    initialValues: {
      question: question,
      answer: answer
    },
    // validationSchema: Yup.object({
    //   question: Yup.string().required('Required'),
    //   answer: Yup.string().required('Required')
    // }),
    onSubmit: (values) => {
        closeHandler()
        dispatchHandler({...values, questionImg: questionImgValue, answerImg: answerImgValue})
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
                  <div className={s.deleteQuestion}>Do you really want to remove <b>{question}</b>?</div>
                  <div>All cards will be deleted</div>
                </>
                :
                <>
                  <Select onChange={onChangeSelectValue} value={selectValue} size={'small'} sx={{marginBottom: '20px'}}>
                    <MenuItem value={'text'}>Text</MenuItem>
                    <MenuItem value={'picture'}>Picture</MenuItem>
                  </Select>

                  {selectValue === 'text' ?
                    <>
                      <TextField
                        className={s.input}
                        variant={'standard'}
                        label={'Question'}
                        {...formik.getFieldProps('question')}
                      />
                      {formik.touched.question && formik.errors.question &&
                          <div className={s.error}>{formik.errors.question}</div>}
                      <TextField
                        className={s.input}
                        variant={'standard'}
                        label={'Answer'}
                        {...formik.getFieldProps('answer')}
                      />
                      {formik.touched.answer && formik.errors.answer &&
                          <div className={s.error}>{formik.errors.answer}</div>}
                    </> :
                    <div className={s.picture}>
                      <div className={s.imgContainer}>
                        <div className={s.uploadImage}>
                          <span>Question:</span>
                          <InputTypeFile question setQuestionImgValue={setQuestionImgValue}/>
                        </div>
                        <img src={questionImg} alt=""/>
                      </div>
                      <div className={s.imgContainer}>
                        <div className={s.uploadImage}>
                          <span>Answer:</span>
                          <InputTypeFile setAnswerImgValue={setAnswerImgValue}/>
                        </div>
                        <img src={answerImg} alt=""/>
                      </div>
                    </div>
                  }
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
