import { Route, Routes } from 'react-router-dom';

import { CategoryPage } from 'src/Pages/CategoryPage';
import { NotFoundPage } from 'src/Pages/NotFoundPage';
import { ContactsPage } from 'src/Pages/Contacts';
import { HomePage } from 'src/Pages/HomePage';
import { Layout } from 'src/Pages/Layout';

import teamInfo from 'src/data/team.json';
import company from 'src/data/company.json';
import json from 'src/data/data.json';

import 'src/styles.css';
import { Categories } from 'src/models/menu';

function App() {
    return (
        <div className="main--wrapper">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="catalog" element={<CategoryPage data={json as Categories[]} />} />
                    <Route path="catalog/:category" element={<CategoryPage data={json as Categories[]} />} />
                    <Route path="catalog/:category/:subCategory" element={<CategoryPage data={json as Categories[]} />} />
                    <Route path="catalog/:category/:subCategory/:item" element={<CategoryPage data={json as Categories[]} />} />
                    <Route path="catalog/:category/:subCategory/:item/:items" element={<CategoryPage data={json as Categories[]} />} />
                    <Route path="catalog/:category/:subCategory/:item/:items/:itemsV2" element={<CategoryPage data={json as Categories[]} />} />
                    <Route
                        path="catalog/:category/:subCategory/:item/:items/:itemsV2/:itemsV3"
                        element={<CategoryPage data={json as Categories[]} />}
                    />
                    <Route
                        path="contacts"
                        element={
                            <ContactsPage
                                phone={company.phone}
                                mail={company.mail}
                                workTime={company.workTime}
                                company={company.name}
                                adress={company.address}
                                data={teamInfo}
                            />
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
