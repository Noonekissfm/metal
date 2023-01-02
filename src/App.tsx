import { Catalog } from './components/Pages/Catalog';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { NavbarListItem } from './components/Navbar/NavbarListItem';
import './index.css'

import json from './data/data.json'
import { Breadcrumbs } from './components/Breadcrumbs';
import { Route, Routes } from 'react-router-dom';
import { ContactsPage } from './components/Pages/Contacts';

function App() {
    return (
        <div className='wrapper'>
            <Header />
            <Navbar>
                <NavbarListItem name="Каталог" path='/catalog'/>
                <NavbarListItem name="О Компании" path='/about'/>
                <NavbarListItem name="Контакты" path='/contacts'/>
            </Navbar>
            <Breadcrumbs />
            
            <Routes>
                <Route path='/catalog' element={<Catalog data={json}/>}/>
                <Route path='/contacts' element={<ContactsPage />} />
            </Routes>
        </div>
    );
}

export default App;
