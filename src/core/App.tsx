import { Route, Routes } from 'react-router-dom';

import { CategoryPage } from 'src/Pages/CategoryPage';
import { NotFoundPage } from 'src/Pages/NotFoundPage';
import { ContactsPage } from 'src/Pages/Contacts';
import { HomePage } from 'src/Pages/HomePage';
import { Layout } from 'src/Pages/Layout';

import personalData from '../data/personData.json'
import { utils } from 'src/data/contacts';
import json from '../data/dataV2.json'

import 'src/styles.css'

function App() {
    return (
        <div className='main--wrapper'>

            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='catalog' element={<CategoryPage data={json}/>}/>
                    <Route path='catalog/:category' element={<CategoryPage data={json}/>}/>
                    <Route path='catalog/:category/:subCategory' element={<CategoryPage data={json}/>}/>
                    <Route path='catalog/:category/:subCategory/:item' element={<CategoryPage data={json}/>}/>
                    <Route path='catalog/:category/:subCategory/:item/:items' element={<CategoryPage data={json}/>}/>
                    <Route path='catalog/:category/:subCategory/:item/:items/:itemsV2' element={<CategoryPage data={json}/>}/>
                    <Route path='catalog/:category/:subCategory/:item/:items/:itemsV2/:itemsV3' element={<CategoryPage data={json}/>}/>
                    <Route path='contacts' element={<ContactsPage phone={utils.phone} mail={utils.mail} workTime={utils.workTime} company={utils.companyName} adress={utils.adress} data={personalData}/>} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>

            </Routes>
        </div>
    );
}

export default App;
