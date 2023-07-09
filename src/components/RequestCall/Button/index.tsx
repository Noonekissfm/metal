import React, { FC } from 'react';
import { ReactComponent as Phone } from '../../../assets/icons/phone.svg'

import style from './style.module.css';
import { color } from 'src/types/colors';

interface IProps {
  onClick: () => void
}

export const RequestCallButton: FC<IProps> = ({onClick}) => {
  return (
    <div className={style.stickyPhone}>
      <Phone
        fill={color.BRAND}
        onClick={onClick}
        className={style.phone}
      />
    </div>
  )
}