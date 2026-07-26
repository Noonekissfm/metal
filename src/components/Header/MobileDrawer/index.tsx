import React, { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { AddressLink } from 'src/components/Contacts/AddressLink';
import { MailLink } from 'src/components/Contacts/MailLink';
import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { WorkTime } from 'src/components/Contacts/WorkTime';
import { Navbar } from 'src/components/Header/Navbar';
import { useBodyScrollLock, useFocusTrap } from 'src/hooks';

import style from './style.module.css';

interface IProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    onRequestCall: () => void;
}

/** Выезжающая панель для телефона: в неё переезжает всё, что не помещается
 *  в шапку, — навигация, контакты и часы работы. */
export const MobileDrawer: FC<IProps> = ({ id, isOpen, onClose, onRequestCall }) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation();

    useBodyScrollLock(isOpen);
    useFocusTrap(panelRef, onClose, isOpen);

    // Переход по ссылке внутри панели должен её закрывать.
    useEffect(() => {
        if (isOpen) onClose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    if (!isOpen) return null;

    return (
        <div className={style.backdrop} onClick={onClose}>
            <div
                id={id}
                className={style.panel}
                ref={panelRef}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Меню"
            >
                <Navbar vertical />

                <div className={style.contacts}>
                    <PhoneLink icon />
                    <MailLink icon />
                    <WorkTime icon />
                    <AddressLink icon />
                </div>

                <button type="button" className={style.callButton} onClick={onRequestCall}>
                    Заказать звонок
                </button>
            </div>
        </div>
    );
};
