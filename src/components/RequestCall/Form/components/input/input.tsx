import React, { FC, useState } from 'react';

import style from './style.module.css';

interface IProps {
  type: 'text' | 'number'
  placeholder: string
  required?: boolean
  name: string
  /** Если передать value и onChange, поле становится управляемым.
   *  Без них работает как раньше — со своим состоянием. */
  value?: string
  onChange?: (value: string) => void
}

export const FormInput: FC<IProps> = ({ type, placeholder, required = false, name, value, onChange }) => {
  const [innerValue, setInnerValue] = useState('')
  const isControlled = value !== undefined

  const handleOnChange = (newValue: string) => {
    if (!isControlled) {
      setInnerValue(newValue)
    }
    onChange && onChange(newValue)
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={isControlled ? value : innerValue}
      onChange={e => handleOnChange(e.target.value)}
      required={required}
      name={name}
      className={style['form-input']}
    />
  )
}
