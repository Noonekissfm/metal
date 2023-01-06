import { Catalog } from './components/Pages/Catalog';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { NavbarListItem } from './components/Navbar/NavbarListItem';
import './index.css'

import json from './data/data.json'
import { Route, Routes } from 'react-router-dom';
import { ContactsPage } from './components/Pages/Contacts';
import { utils } from './data/contacts';

function App() {
    return (
        <div>
            <Header />
            <Navbar>
                <NavbarListItem name="Каталог" path='/catalog'/>
                {/* <NavbarListItem name="О Компании" path='/about'/> */}
                <NavbarListItem name="Контакты" path='/contacts'/>
            </Navbar>
            
            <Routes>
                <Route path='/catalog' element={<Catalog data={json}/>}/>
                <Route path='/contacts' element={<ContactsPage phone={utils.phone} workTime={utils.workTime}/>} />
            </Routes>
        </div>
    );
}

export default App;
