import { FC, useRef, useState } from 'react';

import style from './style.module.css';
import { AppTitle } from 'src/components/AppTitle';
import { FormInput } from './components/input/input';
import { AppButton } from 'src/components/AppButton';
import { useBodyScrollLock, useFocusTrap } from 'src/hooks';
import { getFormData, postData } from './utils';

interface IProps {
  closeModal: () => void
}

export const RequestCallForm: FC<IProps> = ({ closeModal }) => {
  const [isSending, setIsSending] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSending) return

    const formData = getFormData(e)

    if (!formData) return

    const data = {
      'name': formData.get('firstName'),
      'phone': formData.get('phoneNumber'),
      'email': formData.get('email'),
      'message': formData.get('message'),
      'company': formData.get('company'),
    }

    setIsSending(true)
    setError(null)

    const result = await postData(data)

    setIsSending(false)

    if (!result.ok) {
      setError(result.error || 'Не удалось отправить заявку.')
      return
    }

    setIsDone(true)
  }

  useBodyScrollLock()
  useFocusTrap(modalRef, closeModal)

  return (
    <div className={style.backdrop} onClick={() => closeModal()}>
      <div
        className={style.modal}
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Заказать обратный звонок"
      >
        <AppTitle title='Закажите обратный звонок и мы вам перезвоним' />
        {isDone
          ? <span>Спасибо! Заявка будет обработана в ближайшее время</span>
          : <form method='post' className={style.form} onSubmit={(e: React.FormEvent) => handleSumbit(e)}>
            <div className={style.inputs}>
              <FormInput type="text" placeholder='Имя' name='firstName' />
              <FormInput type="text" placeholder='Телефон' name='phoneNumber' required />
              <FormInput type="text" placeholder='Email' name='email' />
              <FormInput type="text" placeholder='Комментарий' name='message' />
              {/* Ловушка для ботов: человек это поле не видит и не заполняет. */}
              <input
                className={style.honeypot}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
            </div>
            {error && <p className={style.error}>{error}</p>}
            <AppButton
              buttonWidth='block'
              type='submit'
              disabled={isSending}
              title={isSending ? 'Отправляем…' : 'Заказать звонок'}
            />
          </form>}
      </div>
    </div>
  )
}
