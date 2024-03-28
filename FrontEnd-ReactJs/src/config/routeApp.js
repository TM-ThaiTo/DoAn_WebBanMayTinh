import React from 'react';
import { Route } from 'react-router-dom';
import { PATH } from "../utils";
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

// các route
import HomePage from "../containers/Home_User/HomePage_User";
import Login_User from "../containers/Home_User/Login_Signup_User/Login_User/index.js";
import SignUp_User from "../containers/Home_User/Login_Signup_User/SignUp_User/SignUp_User";
import ForgotPassword from '../containers/Home_User/Login_Signup_User/ForgotPassword/ForgotPassword.js';
import AllFlashSale from '../containers/Home_User/FlashSale/ALL_FlashSale/AllFlashSale.js';
import NotFound from '../components/NotFound/NotFound.js';
import AccountPage from '../containers/AccountPage/index.js';
import AdminPage from '../containers/AdminPage/index.js';

// import Product_View from '../components/Product/ProductView/Product_View';
import ProductDetailPage from '../containers/ProductDetailPage/index.js';
const routes = [
    {
        path: PATH.ADMIN,
        exact: true,
        main: () => <AdminPage />
    },
    {
        path: PATH.LOGIN_USER,
        exact: true,
        main: () => <Login_User />
    },
    {
        path: PATH.SIGNUP_USER,
        exact: true,
        main: () => <SignUp_User />
    },
    {
        path: PATH.FORGOTPASSWORD,
        exact: true,
        main: () => <ForgotPassword />
    },
    {
        path: PATH.HOME,
        exact: true,
        main: () => <HomePage />
    },
    {
        path: PATH.PRODUCT,
        main: () => <ProductDetailPage />
    },
    {
        path: PATH.NOT_FOUND,
        exact: true,
        main: () => <NotFound />,
    },
    {
        path: PATH.ALL_FLASHSALE,
        exact: true,
        main: () => <AllFlashSale />
    },
    // {
    //     path: PATH.ALL_PRODUCT,
    //     exact: true,
    //     main: () => <AllProduct />
    // },
    {
        path: PATH.AccountPage,
        exact: true,
        main: () => <AccountPage />,
    },

];

const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        const { path, exact, main } = route;
        return <Route key={index} path={path} exact={exact} component={main} />
    })
};

export default {
    routes,
    renderRoutes,
};