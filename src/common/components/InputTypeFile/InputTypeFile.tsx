import React, {ChangeEvent, FC, useRef} from 'react';
import {convertFileToBase64} from "../../utils/convertToBase64Demo";
import s from './inputTypeFile.module.scss'

type InputTypeFilePropsType = {
  setQuestionImgValue?: (file: string) => void
  setAnswerImgValue?: (file: string) => void
  question?: boolean
  update?: boolean
}

export const InputTypeFile: FC<InputTypeFilePropsType> = ({update ,setQuestionImgValue, setAnswerImgValue, question}) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          question ? setQuestionImgValue && setQuestionImgValue(file64) : setAnswerImgValue && setAnswerImgValue(file64)
        })
      } else {
        console.error('error')
      }
    }
  }

  return (
    <div>
      <button type={'button'} className={s.button} onClick={selectFileHandler}>{update ? 'update cover' : 'upload cover'}</button>
      <input type="file" style={{display: 'none'}} ref={inputRef} onChange={uploadHandler}/>
    </div>
  );
};

