import React, { ChangeEvent, FC, ReactNode, useRef } from 'react'

type InputFilePropsType = {
    children: ReactNode
    updateAvatar: (img: string) => void
}

export const InputFile: FC<InputFilePropsType> = ({ children, updateAvatar }) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const file64 = reader.result as string
                    updateAvatar(file64)
                }
                reader.readAsDataURL(file)
            } else {
                alert('Файл должен быть не более 4Мб')
            }
        }
    }

    return (
        <div style={{ width: '0', height: '0' }}>
            <div onClick={selectFileHandler}>{children}</div>
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={uploadHandler}
            />
        </div>
    )
}
