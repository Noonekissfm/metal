import React, { FC } from 'react';
import { ListItem } from './components/ListItem';


// import './style.css';
import style from './style.module.css';

interface IProps {
}

export const Navbar: FC<IProps> = () => {
    return (
        <nav className={style.navbar}>
            <ul>
                <ListItem name='Каталог' path='/catalog'/>
                <ListItem name='Контакты' path='/contacts'/>
                <ListItem name='О компании' path='/'/>
            </ul>
        </nav>
    );
};
// export const Navbar: FC<IProps> = ({ children }) => {
//     return (
//         <section className="section_navbar">
//             <div className="wrapper">
//                 <div className="navbar">
//                     <ul>{children}</ul>
//                 </div>
//             </div>
//         </section>
//     );
// };
