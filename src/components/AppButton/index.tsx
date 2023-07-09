import React, { FC, MouseEvent } from 'react';

import style from './style.module.css';

interface IProps {
  title: string
  buttonWidth: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const AppButton: FC<IProps> = ({ title, onClick, buttonWidth , type}) => {
  const handleClick = (e: MouseEvent) => {
    onClick && onClick()
  }

  const classes = [
    style.button,
    style[`button--${buttonWidth}`]
  ].join(' ')

  return (
    <button onClick={onClick && handleClick} type={type ? type : 'button'} className={classes}>{title}</button>
  )
}