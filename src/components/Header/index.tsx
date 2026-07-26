import React, { FC, useState } from 'react';

import { ContentWrapper } from '../AppWrappers/ContentWrapper';
import { CartButton } from '../Cart/CartButton';
import { AddressLink } from '../Contacts/AddressLink';
import { MailLink } from '../Contacts/MailLink';
import { WorkTime } from '../Contacts/WorkTime';
import { BurgerButton } from './BurgerButton';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';
import { Navbar } from './Navbar';
import { SearchBar } from './SearchBar';

import company from 'src/data/company.json';

import style from './style.module.css';

const DRAWER_ID = 'header-drawer';

interface IProps {
    onRequestCall: () => void;
}

export const Header: FC<IProps> = ({ onRequestCall }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const phoneHref = `tel:${company.phone.replace(/[^\d+]/g, '')}`;

    const requestCallFromDrawer = () => {
        setIsDrawerOpen(false);
        onRequestCall();
    };

    return (
        <header className={style.header}>
            {/* Верхняя строка: то, что нужно редко. На телефоне её нет —
              * всё это переезжает в выезжающую панель. */}
            <div className={style.utilityRow}>
                <ContentWrapper>
                    <div className={style.utilityInner}>
                        <WorkTime icon />
                        <MailLink icon />
                        <AddressLink icon />
                    </div>
                </ContentWrapper>
            </div>

            <div className={style.mainRow}>
                <ContentWrapper>
                    <div className={style.mainInner}>
                        <div className={style.logoSlot}>
                            <Logo />
                        </div>

                        <div className={style.navSlot}>
                            <Navbar />
                        </div>

                        <div className={style.searchSlot}>
                            <SearchBar />
                        </div>

                        {/* Для оптового покупателя телефон — главное, что
                          * должно быть на экране. Раньше он был того же
                          * размера, что почта и часы работы. */}
                        <div className={style.phoneSlot}>
                            <a className={style.phone} href={phoneHref}>
                                {company.phone}
                            </a>
                            <button
                                type="button"
                                className={style.callLink}
                                onClick={onRequestCall}
                            >
                                Заказать звонок
                            </button>
                        </div>

                        <a
                            className={style.phoneIcon}
                            href={phoneHref}
                            aria-label={`Позвонить: ${company.phone}`}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1l-2.22 2.3z" />
                            </svg>
                        </a>

                        <div className={style.cartSlot}>
                            <CartButton />
                        </div>

                        <div className={style.burgerSlot}>
                            <BurgerButton
                                isOpen={isDrawerOpen}
                                onClick={() => setIsDrawerOpen((open) => !open)}
                                controls={DRAWER_ID}
                            />
                        </div>
                    </div>
                </ContentWrapper>
            </div>

            <MobileDrawer
                id={DRAWER_ID}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onRequestCall={requestCallFromDrawer}
            />
        </header>
    );
};
