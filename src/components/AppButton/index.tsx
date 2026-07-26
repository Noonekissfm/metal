import React, { FC, MouseEvent } from 'react';

import style from './style.module.css';

interface IProps {
  title: string
  buttonWidth: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const AppButton: FC<IProps> = ({ title, onClick, buttonWidth , type, disabled = false}) => {
  const handleClick = (e: MouseEvent) => {
    onClick && onClick()
  }

  const classes = [
    style.button,
    style[`button--${buttonWidth}`]
  ].filter(Boolean).join(' ')

  return (
    <button
      onClick={onClick && handleClick}
      type={type ? type : 'button'}
      disabled={disabled}
      className={classes}
    >{title}</button>
  )
}