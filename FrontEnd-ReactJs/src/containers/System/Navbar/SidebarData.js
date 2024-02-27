import React, { Component } from 'react';
import { connect } from 'react-redux';

export const SidebarData = [
    { //Home
        title: 'Home',
        path: '/system/home-admin',
        icon: <i className="fas fa-home"></i>,
        cName: 'nav-text'
    },
    { // Users
        title: 'Manage Users',
        path: '/system/user-manage',
        icon: <i className="fas fa-user"></i>,
        cName: 'nav-text'
    },
    { // Shops
        title: 'Manage Shops',
        path: '/system/shop-manage',
        icon: <i className="fas fa-home"></i>,
        cName: 'nav-text'
    },
    { // Items
        title: 'Manage Items',
        path: '/system/items-manage',
        icon: <i className="fas fa-home"></i>,
        cName: 'nav-text'
    },
    { // Orders
        title: 'Manage Orders',
        path: '/system/order-manage',
        icon: <i className="fas fa-home"></i>,
        cName: 'nav-text'
    },
    { // Web
        title: 'Manage Web',
        path: '/system/web-manage',
        icon: <i className="fas fa-home"></i>,
        cName: 'nav-text'
    },
]

