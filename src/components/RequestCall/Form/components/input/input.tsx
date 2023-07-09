import React, { FC, useState } from 'react';

import style from './style.module.css';

interface IProps {
  type: 'text' | 'number'
  placeholder: string
  required?: boolean
  name: string
}

export const FormInput: FC<IProps> = ({ type, placeholder, required = false, name }) => {
  const [value, setValue] = useState('')
  const handleOnChange = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => handleOnChange(e.target.value)}
      required={required}
      name={name}
      className={style['form-input']}
    />
  )
}