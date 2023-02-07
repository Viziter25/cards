import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
} from 'react'
import s from './SuperEditableSpan.module.css'
import editIcon from './editIcon.svg'
import { SuperInput } from '../SuperInput/SuperInput';
import SuperButton from '../SuperButton/SuperButton';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string

  spanProps?: DefaultSpanPropsType & { defaultText?: string }// пропсы для спана
}

export const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
  {
    autoFocus,
    onBlur,
    onEnter,
    spanProps,

    ...restProps // все остальные пропсы попадут в объект restProps
  }
) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { children, onDoubleClick, className, defaultText, ...restSpanProps } =
    spanProps || {}

  const onEnterCallback = () => {
    // выключить editMode при нажатии Enter // делают студенты
    setEditMode(!editMode)
    onEnter?.()
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    // выключить editMode при нажатии за пределами инпута // делают студенты
    setEditMode(!editMode)
    onBlur?.(e)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // включить editMode при двойном клике // делают студенты
    setEditMode(!editMode)
    onDoubleClick?.(e)
  }

  const spanClassName = s.span
    + (className ? ' ' + className : '')

  return (
    <>
      {editMode ? (
        <div className={s.inputBlock}>
          <SuperInput
            autoFocus={autoFocus || true}
            onBlur={onBlurCallback}
            onEnter={onEnterCallback}
            className={s.input}
            label={'name'}
            labelClassName={s.label}
            {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
          />
          <SuperButton className={s.inputButton}>save</SuperButton>
        </div>
      ) : (
        <div className={s.spanBlock} onDoubleClick={onDoubleClickCallBack}>
          <span
            className={spanClassName}
            {...restSpanProps}
          >
            {/*если нет захардкодженного текста для спана, то значение инпута*/}
            {children || restProps.value || defaultText}
          </span>
          <img
            src={editIcon}
            className={s.pen}
            alt={'edit'}
          />
        </div>
      )}
    </>
  )
}