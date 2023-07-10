import { FC, useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker'

import style from './style.module.css';
import { AppTitle } from 'src/components/AppTitle';
import { FormInput } from './components/input/input';
import { AppButton } from 'src/components/AppButton';
import { getFormData, postData } from './utils';

interface IProps {
  closeModal: () => void
}

export const RequestCallForm: FC<IProps> = ({ closeModal }) => {
  const [isFetching, setIsFetching] = useState(false)
  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsFetching(true)

    const formData = getFormData(e)

    if(!formData) return

    const data = {
      'name': formData.get('firstName'),
      'phone': formData.get('phoneNumber'),
      'email': formData.get('email'),
      'message': formData.get('message'),
    }

    postData(data).then(() => {
      setIsFetching(false)
      closeModal()
    }).finally(() => {
      setIsFetching(false)
      closeModal()
    })
  }
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  })
  return (
    <div className={style.backdrop} onClick={() => closeModal()}>
      <div className={style.modal} onClick={e => e.stopPropagation()}>
        <AppTitle title='Закажите обратный звонок и мы вам перезвоним' />
        <form method='post' className={style.form} onSubmit={(e: React.FormEvent) => handleSumbit(e)}>
          <div className={style.inputs}>
            <FormInput type="text" placeholder='Имя' name='firstName' />
            <FormInput type="text" placeholder='Телефон' name='phoneNumber' required />
            <FormInput type="text" placeholder='Email' name='email' />
            <FormInput type="text" placeholder='Комментарий' name='message' />
          </div>
          {/* <DatePicker /> */}
          {!isFetching ? <AppButton
            buttonWidth='block'
            type='submit'
            title='Заказать звонок'
          /> : <span>Спасибо! Заявка будет обработана в ближайшее время</span> }
        </form>
      </div>
    </div>
  )
}