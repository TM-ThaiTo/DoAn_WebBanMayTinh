import { Route, Switch } from 'react-router-dom';

import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../containers/Auth/Login';

import { Header } from '../containers/Home_User/Header_Top/Header_HomePage_User.js';

import './System.scss';

class Page extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <Fragment>
                {isLoggedIn && <Header />}
                <Switch>
                    <Route path="/login" exact component={Login} />

                    <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page);
