import { Catalog } from './components/Pages/Catalog';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { NavbarListItem } from './components/Navbar/NavbarListItem';
import './index.css'

import json from './data/dataV2.json'
import personalData from './data/personData.json'

import { Route, Routes } from 'react-router-dom';
import { ContactsPage } from './components/Pages/Contacts';
import { utils } from './data/contacts';
import { CategoryPage } from './components/Pages/CategoryPage';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { HomePage } from './components/Pages/HomePage';

function App() {
    return (
        <div>
            <Header />
            <Navbar>
                <NavbarListItem name="Каталог" path='/index'/>
                {/* <NavbarListItem name="О Компании" path='/about'/> */}
                <NavbarListItem name="Контакты" path='/contacts'/>
            </Navbar>
            
            <Routes>
                <Route path='/index' element={<CategoryPage data={json}/>}/>
                <Route path='index/:category' element={<CategoryPage data={json}/>}/>
                <Route path='index/:category/:subCategory' element={<CategoryPage data={json}/>}/>
                <Route path='index/:category/:subCategory/:items' element={<CategoryPage data={json}/>}/>
                <Route path='index/:category/:subCategory/:item/:items' element={<CategoryPage data={json}/>}/>
                <Route path='index/:category/:subCategory/:item/:items/:itemsV2' element={<CategoryPage data={json}/>}/>
                <Route path='index/:category/:subCategory/:item/:items/:itemsV2/:itemsV3' element={<CategoryPage data={json}/>}/>

                <Route path='/*' element={<HomePage />} />
                <Route path='/contacts' element={<ContactsPage phone={utils.phone} workTime={utils.workTime} company={utils.companyName} adress={utils.adress} data={personalData}/>} />
            </Routes>
        </div>
    );
}

export default App;
