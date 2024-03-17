import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AutoComplete, Badge, Button, Dropdown, Input, Menu, Drawer } from 'antd';
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined, ReconciliationOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import defaultAvt from '../../assets/imgs/default-avt.png';
import logoUrl from '../../assets/imgs/logo.png';
import constants from '../../constants/index.js';
import helpers from '../../helpers/index.js';
import CartView from './CartView/index.js'
import { PATH } from '../../utils/constant.js';

import './index.scss';

class HeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkSearch: '',
            isMdDevice: false,
            isSmDevice: false,
            drawerVisible: false,
        };
        this.onLogout = this.onLogout.bind(this);
        this.totalItemCarts = this.totalItemCarts.bind(this);
    }

    totalItemCarts(carts) {
        if (carts) {
            return carts.reduce((total, item) => total + item.amount, 0);
        }
    }

    onLogout() {
        // Your logout logic here
        alert("Test logout");
    }

    componentDidMount() {
        const w = window.innerWidth;
        if (w <= 992) this.setState({ isMdDevice: true });
        if (w <= 480) this.setState({ isSmDevice: true });
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const width = window.innerWidth;
        this.setState({
            isMdDevice: width <= 992,
            isSmDevice: width <= 480,
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.locations !== prevProps.locations) {
            this.setState({ drawerVisible: false });
        }
    }

    render() {
        const { isAuth, user, carts, history } = this.props;
        const { isMdDevice, isSmDevice, drawerVisible, linkSearch } = this.state;
        const options = helpers.autoSearchOptions();
        // const locations = history.location.pathname; // Uncomment this line
        const initLink = '/search?keyword=';

        const userActionMenu = (
            <Menu className="m-t-24" style={{ width: 244 }}>
                <Menu.Item>
                    {isAuth ? (
                        <Button onClick={this.onLogout} size="large" className="w-100" type="primary" danger={isAuth}>
                            Đăng xuất
                        </Button>
                    ) : (
                        <Button size="large" className="w-100" type="primary">
                            <Link to={PATH.LOGIN_USER}>Đăng nhập</Link>
                        </Button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    <Link to={PATH.SIGNUP_USER}>
                        <Button size="large" className="w-100 btn-secondary" type="default">
                            Đăng ký
                        </Button>
                    </Link>
                </Menu.Item>
                {isAuth && (
                    <Menu.Item>
                        <Button size="large" className="w-100 btn-secondary" type="default">
                            <Link to={constants.ROUTES.ACCOUNT + '/'}>Quản lý Tài khoản</Link>
                        </Button>
                    </Menu.Item>
                )}
            </Menu>
        );

        return (
            <div className="wrap-header container-fluid bg-white w-100vw" style={{ height: isSmDevice ? 76 : 104 }}>
                <div className="header header-content container">

                    {/* Logo */}
                    <Link to="/">
                        <img
                            src={logoUrl}
                            width={isSmDevice ? 78 : 112}
                            height={isSmDevice ? 36 : 48}
                            alt="Logo"
                        />
                    </Link>

                    {/* thanh tìm kiếm */}
                    <div className="t-right search-bar-wrapper w-100">
                        <div className="search-bar pos-relative">
                            <AutoComplete
                                className="trans-center w-100"
                                options={options}
                                onChange={(value) =>
                                    this.setState({ linkSearch: helpers.formatQueryString(value) })
                                }
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            >
                                <Input
                                    maxLength={200}
                                    size={isSmDevice ? 'middle' : 'large'}
                                    placeholder={!isSmDevice ? 'Nhập từ khoá cần tìm' : 'Tìm kiếm'}
                                />
                            </AutoComplete>

                            <Button type="primary" size={isSmDevice ? 'middle' : 'large'}>
                                {/* to={linkSearch === '' ? locations : initLink + linkSearch} */}
                                <Link>
                                    <SearchOutlined /> {!isSmDevice ? 'Tìm kiếm' : ''}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* công cụ */}
                    {isMdDevice ? (
                        <>
                            <Drawer
                                title="Menu"
                                placement="right"
                                closable={true}
                                onClose={() => this.setState({ drawerVisible: false })}
                                maskClosable={true}
                                visible={drawerVisible}
                            >
                                <ul className="m-0 d-flex">

                                    {/* Đăng Nhập */}
                                    <li className="li-content">
                                        <Dropdown overlay={userActionMenu} placement="bottomLeft">
                                            <Link to={isAuth ? `${constants.ROUTES.ACCOUNT}/` : PATH.LOGIN_USER}>
                                                {!isAuth ? (
                                                    <div className="d-flex navbar-tool-item p-l-0">
                                                        <UserOutlined className="icon m-r-12" />
                                                        <span className="title">Đăng nhập</span>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex navbar-tool-item p-l-0">
                                                        <Avatar src={defaultAvt} className="m-r-12" />
                                                        <span className="title">
                                                            {helpers.reduceProductName(user.fullName, 12)}
                                                        </span>
                                                    </div>
                                                )}
                                            </Link>
                                        </Dropdown>
                                    </li>

                                    {/* đơn hàng */}
                                    <li className="li-content">
                                        <Link className="d-flex navbar-tool-item p-l-0" to={constants.ROUTES.ACCOUNT + '/orders'}>
                                            <ReconciliationOutlined className="icon m-r-12" />
                                            <span className="title">Đơn hàng</span>
                                        </Link>
                                    </li>

                                    {/* giỏ hàng */}
                                    <li className="li-content">
                                        <Dropdown overlay={<CartView list={carts} />} placement="bottomLeft" arrow>
                                            <Link className="d-flex navbar-tool-item p-l-0" to={constants.ROUTES.CART}>
                                                <ShoppingCartOutlined className="icon m-r-12" />
                                                <Badge className="pos-absolute" size="default" style={{ color: '#fff' }} count={this.totalItemCarts(carts)} overflowCount={9} offset={[18, -10]} />
                                                <span className="title">Giỏ hàng</span>
                                            </Link>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </Drawer>
                            <MenuOutlined className="menu-icon" onClick={() => this.setState({ drawerVisible: true })} />
                        </>
                    ) : (
                        <ul className="d-flex m-0">
                            <li>
                                <Link className="d-flex flex-direction-column navbar-tool-item p-l-0" to={constants.ROUTES.ACCOUNT + '/orders'}>
                                    <ReconciliationOutlined className="icon" />
                                    <span className="title">Đơn hàng</span>
                                </Link>
                            </li>
                            <li>
                                <Dropdown overlay={userActionMenu} placement="bottomRight">
                                    <Link to={isAuth ? `${constants.ROUTES.ACCOUNT}/` : constants.ROUTES.LOGIN}>
                                        {!isAuth ? (
                                            <div className="d-flex flex-direction-column navbar-tool-item">
                                                <UserOutlined className="icon" />
                                                <span className="title">Đăng nhập</span>
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-direction-column navbar-tool-item">
                                                <Avatar src={defaultAvt} className="m-auto" />
                                                <span className="title">{helpers.reduceProductName(user.fullName, 12)}</span>
                                            </div>
                                        )}
                                    </Link>
                                </Dropdown>
                            </li>
                            <li>
                                <Dropdown overlay={<CartView list={carts} />} placement="bottomRight" arrow>
                                    <Link className="d-flex flex-direction-column navbar-tool-item" to={constants.ROUTES.CART}>
                                        <ShoppingCartOutlined className="icon" />
                                        <Badge className="pos-absolute" size="default" style={{ color: '#fff' }} count={this.totalItemCarts(carts)} overflowCount={9} offset={[36, -5]} />
                                        <span className="title">Giỏ hàng</span>
                                    </Link>
                                </Dropdown>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        );
    }
}

export default HeaderView;
