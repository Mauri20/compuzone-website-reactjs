import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import { ROUTES } from 'config';
import Home from 'pages/home';
import Login from 'pages/login';
import RegisterLogin from 'pages/registerlogin';
import CatalogueShoes from 'pages/shoes';
import Cart from 'pages/cart'

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route index path={ROUTES.HOME.path} element={<Home />} />
        <Route path={ROUTES.SHOES.path} element={<CatalogueShoes />} />
        <Route path={ROUTES.LOGIN.path} element={<Login />} />
        <Route path={ROUTES.REGISTERLOGIN.path} element={<RegisterLogin />} />
        <Route path={ROUTES.CART.path} element={<Cart />} />
        <Route path="*" element={<Home />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
