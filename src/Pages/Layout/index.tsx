import React, { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { RequestCallButton } from 'src/components/RequestCall/Button';
import { RequestCallForm } from 'src/components/RequestCall/Form';

import { LayoutContext } from './outletContext';

import style from './style.module.css';

export const Layout: FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Header onRequestCall={() => setShowModal(true)} />

            <div className={style.flexGrow}>
                <Outlet context={{ onRequestCall: () => setShowModal(true) } as LayoutContext} />
            </div>

            {/* Кнопка не размонтируется на время окна: иначе фокусу некуда
              * возвращаться после закрытия — элемента уже нет в документе.
              * Окно перекрывает её по z-index. */}
            <RequestCallButton onClick={() => setShowModal(true)} />
            {showModal && <RequestCallForm closeModal={() => setShowModal(false)} />}

            <Footer />
        </>
    );
};
