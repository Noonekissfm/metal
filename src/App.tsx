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
import { Layout } from './components/Pages/Layout';

function App() {
    return (
        <div style={{paddingBottom: '30px'}}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='index' element={<CategoryPage data={json}/>}/>
                    <Route path='index/:category/' element={<CategoryPage data={json}/>}/>
                    <Route path='index/:category/:subCategory' element={<CategoryPage data={json}/>}/>
                    <Route path='index/:category/:subCategory/:item/:items' element={<CategoryPage data={json}/>}/>
                    <Route path='index/:category/:subCategory/:item/:items/:itemsV2' element={<CategoryPage data={json}/>}/>
                    <Route path='index/:category/:subCategory/:item/:items/:itemsV2/:itemsV3' element={<CategoryPage data={json}/>}/>
                    <Route path='contacts' element={<ContactsPage phone={utils.phone} workTime={utils.workTime} company={utils.companyName} adress={utils.adress} data={personalData}/>} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>

            </Routes>
        </div>
    );
}

export default App;
