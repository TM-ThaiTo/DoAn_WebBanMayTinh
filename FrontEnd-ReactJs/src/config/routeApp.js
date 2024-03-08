import React from 'react';
import { Route } from 'react-router-dom';
import { PATH } from "../utils";

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import Login from "../containers/Auth/Login";
import Home from "../routes/Home";
import System from "../routes/System";
import HomePage from "../containers/Home_User/HomePage_User";
import Login_User from "../containers/Home_User/Login_Signup_User/Login_User/Login_User";
import SignUp_User from "../containers/Home_User/Login_Signup_User/SignUp_User/SignUp_User";
import ForgotPassword from '../containers/Home_User/Login_Signup_User/ForgotPassword/ForgotPassword.js';

import AllProduct from '../containers/Home_User/SanPham/All_Products/AllProduct.js';
import AllFlashSale from '../containers/Home_User/FlashSale/ALL_FlashSale/AllFlashSale.js';

import NotFound from '../components/NotFound/NotFound.js';
// const NotFound = React.lazy(() => import('../components/NotFound/NotFound.js'));

import Product_View from '../components/Product/ProductView/Product_View';



import AdminPage from '../containers/AdminPage/index.js';
const routes = [
    //=== route ADMIN ===>
    // {
    //     path: PATH.ADMIN,
    //     exact: true,
    //     main: () => <Login />
    // },
    // {
    //     path: PATH.SYSTEM,
    //     exact: true,
    //     main: () => <System />
    // },

    //=== route USER ===/

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
        main: () => <Home />
    },
    {
        path: PATH.HOMEPAGE,
        exact: false,
        main: () => <HomePage />
    },
    {
        path: PATH.PRODUCT,
        main: () => <Product_View />
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
    {
        path: PATH.ALL_PRODUCT,
        exact: true,
        main: () => <AllProduct />
    },
    {
        path: "/test_adminpage",
        exact: true,
        main: () => <AdminPage />
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