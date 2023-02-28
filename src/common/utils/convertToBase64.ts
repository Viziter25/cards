import {ChangeEvent} from 'react';
import {AppThunkDispatch} from '../../app/store';


export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const file64 = reader.result as string
    callBack(file64)
  }
  reader.readAsDataURL(file)
}


export const onChangeImg = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: AppThunkDispatch,
  callback: (img: string) => void
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]
    const fileSizeMB = file.size / 1024 ** 2

    if (fileSizeMB < 1) {
      convertFileToBase64(file, (file64: string) => {
        callback(file64)
      })
    } else {
      alert('The file is too large')
    }
  }
}