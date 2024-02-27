import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import HomeAdmin from '../containers/System/Admin/Home/HomeAdmin.js'
import UserManage from '../containers/System/Admin/User/UserManage.js';
import ShopManage from '../containers/System/Admin/Shop/ShopManager.js';
import ProductManage from '../containers/System/Admin/Product/ProductManage.js';
import OrderManage from '../containers/System/Admin/Order/OrderManage.js';
import WebManage from '../containers/System/Admin/Web/WebManage.js';
import UserRedux from '../containers/System/Admin/UserRedux';
import Navbar1 from '../containers/System/Navbar/Navbar_Admin.js';

import './System.scss';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <Fragment>
                {isLoggedIn && <Navbar1 />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/home-admin" exact component={HomeAdmin} />
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/shop-manage" component={ShopManage} />
                            <Route path="/system/order-manage" component={OrderManage} />
                            <Route path="/system/web-manage" component={WebManage} />
                            <Route path="/system/items-manage" component={ProductManage} />


                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
