import {
    BarChartOutlined,
    DashboardOutlined,
    EyeOutlined,
    HomeOutlined,
    IdcardOutlined,
    NotificationOutlined,
    PlusCircleOutlined,
    ReconciliationOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';

import Avatar from 'antd/lib/avatar/avatar';
import { Button, Menu } from 'antd';

// Import React và các thư viện khác
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import './index.scss';
import defaultAvt from '../../assets/imgs/default-avt.png'
// Import Compnent
import Dashboard from './Dashboard/index.js';
import SeeProduct from './ProductPage/SeeProduct/index.js';
import AddProduct from './ProductPage/ProductAddForm/index.js';
import AdminUser from './AdminUser/index.js';
import CustomerList from './CustomersUser/index.js';
import OrderList from './OrderList/index.js';

import Login from './Login/index.js';
// const Dashboard = React.lazy(() => import('./Dashboard/index.js'));
// const SeeProduct = React.lazy(() => import('./ProductPage/SeeProduct/index.js'));
// const AddProduct = React.lazy(() => import('./ProductPage/ProductAddForm/index.js'));
// const AdminUser = React.lazy(() => import('./AdminUser/index.js'));
// const CustomerList = React.lazy(() => import('./CustomersUser/index.js'));
// const OrderList = React.lazy(() => import('./OrderList/index.js'));

const mainColor = '#141428';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyMenu: 'd',
            isLogin: localStorage.getItem('admin') ? true : false,
            adminName: localStorage.getItem('admin') || 'Admin',
        };

        this.menuList = [
            {
                key: 'd',
                title: 'Dashboard',
                icon: <DashboardOutlined />,
                children: [],
            },
            {
                key: 'p',
                title: 'Products',
                icon: <ShoppingCartOutlined />,
                children: [
                    { key: 'p0', title: 'See', icon: <EyeOutlined /> },
                    { key: 'p1', title: 'Add', icon: <PlusCircleOutlined /> },
                ],
            },
            {
                key: 'c',
                title: 'Customers',
                icon: <UserOutlined />,
                children: [],
            },
            {
                key: 'a',
                title: 'Amin Users',
                icon: <IdcardOutlined />,
                children: [],
            },
            {
                key: 'o',
                title: 'Order List',
                icon: <ReconciliationOutlined />,
                children: [],
            },
            {
                key: 'm',
                title: 'Marketing',
                icon: <NotificationOutlined />,
                children: [],
            },
        ];
    }

    // fn: render component tương ứng
    renderMenuComponent = (key) => {
        switch (key) {
            case 'd':
                return <Dashboard />;
            case 'p0':
                return <SeeProduct />;
            case 'p1':
                return <AddProduct />;
            case 'a':
                return <AdminUser />;
            case 'c':
                return <CustomerList />;
            case 'o':
                return <OrderList />;
            default:
                break;
        }
    };

    // fn: Xử lý khi chọn item
    handleSelected = (e) => {
        const { key } = e;
        this.setState({ keyMenu: key });
    };

    // fn: Show Title Selected
    showTitleSelected = (key) => {
        let result = 'Dashboard';
        this.menuList.forEach((item) => {
            if (item.key === key) result = item.title;
            item.children.forEach((child) => {
                if (child.key === key) result = `${item.title} > ${child.title}`;
            });
        });
        return result;
    };

    // fn: render MenuItem
    renderMenuItem = () => {
        return this.menuList.map((item) => {
            const { key, icon, title, children } = item;
            if (children.length === 0)
                return (
                    <Menu.Item className="menu-item" key={key} icon={icon}>
                        <span className="menu-item-title">{title}</span>
                    </Menu.Item>
                );
            return (
                <Menu.SubMenu className="menu-item" key={key} icon={icon} title={title}>
                    {children.map((child) => (
                        <Menu.Item className="menu-item" key={child.key} icon={child.icon}>
                            <span className="menu-item-title">{child.title}</span>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            );
        });
    };

    // event: Login với quyền admin
    onLogin = (isLogin, name) => {
        if (isLogin) {
            this.setState({ isLogin: true, adminName: name });
            localStorage.setItem('admin', name);
        }
    };

    // event: logout
    onLogout = () => {
        this.setState({ isLogin: false });
        localStorage.removeItem('admin');
    };

    render() {
        const { keyMenu, isLogin, adminName } = this.state;
        return (
            <div className="Admin-Page" style={{ backgroundColor: '#e5e5e5' }}>
                {!isLogin ? (
                    <div className="trans-center bg-white p-32 bor-rad-8 box-sha-home">
                        <Login onLoginAdmin={this.onLogin} />
                    </div>
                ) : (
                    <>
                        {/* header */}
                        <div
                            className="d-flex align-i-center header-admin-page"
                            style={{ height: '75px', backgroundColor: mainColor }}>
                            <div className="logo t-center" style={{ flexBasis: '200px' }}>
                                {/* <img width={100} height={48} src={logoUrl} /> */}
                            </div>
                            <div className="flex-grow-1 d-flex align-i-center">
                                <h2 className="t-color-primary flex-grow-1 p-l-44 main-title">
                                    <span className='admin-page-title'>Admin Page &gt; </span>
                                    <span className="option-title">
                                        {this.showTitleSelected(keyMenu)}
                                    </span>
                                </h2>
                                <a
                                    href="/"
                                    // target='black'
                                    className="open-web p-r-24 t-color-primary font-weight-500 p-b-10">
                                    <HomeOutlined
                                        className="icon font-size-28px t-color-primary m-r-10"
                                        style={{ transform: 'translateY(3px)' }}
                                    />
                                    <span className="open-web-title">Open the website</span>
                                </a>
                                <div className="user-admin p-r-24 t-color-primary font-weight-500">
                                    <Avatar size={36} className="m-r-10" src={defaultAvt} />
                                    <span className="user-admin-title">{adminName}</span>
                                </div>
                                <Button onClick={this.onLogout} className="m-r-44" type="dashed">
                                    Đăng xuất
                                </Button>
                            </div>
                        </div>
                        {/* main content */}
                        <div className="d-flex">
                            {/* menu dashboard */}
                            <Menu
                                className="menu p-t-24"
                                theme="dark"
                                onClick={this.handleSelected}
                                style={{
                                    height: 'inherit',
                                    minHeight: '100vh',
                                    backgroundColor: mainColor,
                                    flexBasis: '200px',
                                }}
                                defaultSelectedKeys={keyMenu}
                                mode="inline">
                                {this.renderMenuItem()}
                            </Menu>

                            {/* main contents */}
                            <div className="flex-grow-1">{this.renderMenuComponent(keyMenu)}</div>
                        </div>
                    </>
                )}
            </div>
        )
    }
}

// Map state từ Redux store vào props của component
const mapStateToProps = state => {
    return {
        // isLoggedIn: state.auth.isLoggedIn,
        // adminName: state.auth.adminName
    };
};

// Map các action creators để dispatch vào props của component
const mapDispatchToProps = dispatch => {
    return {
        // Ví dụ: loginAction: (name) => dispatch(actions.login(name)),
        // logoutAction: () => dispatch(actions.logout())
    };
};

// Kết nối component với Redux store
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
