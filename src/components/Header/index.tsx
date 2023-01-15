import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    children: any,
}

export const Header: FC<IProps> = ({children}) => {
    return (
        <section className={style.section}>
            <div className={style.wrapper}>
                {children}
            </div>
        </section>
    );
};

// export const Header = () => {
//     return (
//         <section className="section_header">
//             <div className="wrapper">
//                 <div className="header">
//                     <Logo />
//                     <Contacts phone={true} mail={true} />
//                 </div>
//             </div>
//         </section>
//     );
// };
