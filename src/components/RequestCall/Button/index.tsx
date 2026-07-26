import React, { FC } from 'react';

import { ReactComponent as Phone } from 'src/assets/icons/phone.svg';

import style from './style.module.css';

interface IProps {
  onClick: () => void
}

export const RequestCallButton: FC<IProps> = ({onClick}) => {
  // Раньше onClick висел на самой svg, поэтому белое кольцо вокруг иконки
  // не нажималось, а <div> нельзя было ни сфокусировать, ни озвучить.
  return (
    <button
      type="button"
      className={style.stickyPhone}
      onClick={onClick}
      aria-label="Заказать звонок"
    >
      <Phone className={style.phone} />
    </button>
  )
}
