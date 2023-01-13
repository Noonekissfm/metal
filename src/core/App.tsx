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
