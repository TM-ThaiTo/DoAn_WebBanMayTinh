import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
// import './index.scss';


class OrderList extends Component {

    onLogin = (isLogin, name) => {
        // if (isLogin) {
        //   this.setState({ isLogin: true, adminName: name });
        //   localStorage.setItem('admin', name);
        // }
    };

    onLogout = () => {
        // this.setState({ isLogin: false });
        // localStorage.removeItem('admin');
    };

    render() {// JSX
        return (
            <>
                OrderList đây
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        // language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
