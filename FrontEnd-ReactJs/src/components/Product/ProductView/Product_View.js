import React, { Component } from 'react';
import { connect } from 'react-redux';

// scss
import './Product_View.scss'
class Product_View extends Component {

    render() {
        return (
            <>
                Hello đây là trang chi tiết sản phẩm
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product_View);
