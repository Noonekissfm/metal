import { Route, Routes } from 'react-router-dom';

import { CategoryPage } from 'src/Pages/CategoryPage';
import { NotFoundPage } from 'src/Pages/NotFoundPage';
import { ContactsPage } from 'src/Pages/Contacts';
import { HomePage } from 'src/Pages/HomePage';
import { CartPage } from 'src/Pages/Cart';
import { Layout } from 'src/Pages/Layout';

import { CartProvider } from 'src/context/CartContext';
import { CatalogProvider } from 'src/context/CatalogContext';

import teamInfo from 'src/data/team.json';
import company from 'src/data/company.json';

import 'src/styles.css';

function App() {
    return (
        <div className="main--wrapper">
            <CatalogProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            {/* Каталог вложен до шести уровней, отсюда список маршрутов. */}
                            <Route path="catalog" element={<CategoryPage />} />
                            <Route path="catalog/:category" element={<CategoryPage />} />
                            <Route path="catalog/:category/:subCategory" element={<CategoryPage />} />
                            <Route path="catalog/:category/:subCategory/:item" element={<CategoryPage />} />
                            <Route path="catalog/:category/:subCategory/:item/:items" element={<CategoryPage />} />
                            <Route
                                path="catalog/:category/:subCategory/:item/:items/:itemsV2"
                                element={<CategoryPage />}
                            />
                            <Route
                                path="catalog/:category/:subCategory/:item/:items/:itemsV2/:itemsV3"
                                element={<CategoryPage />}
                            />
                            <Route path="cart" element={<CartPage />} />
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
                </CartProvider>
            </CatalogProvider>
        </div>
    );
}

export default App;
