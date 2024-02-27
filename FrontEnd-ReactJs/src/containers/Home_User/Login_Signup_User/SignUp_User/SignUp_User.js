import React, { Component } from 'react';
import { connect } from 'react-redux';

// scss
import './SignUp_User.scss'
class SignUp_User extends Component {

    render() {
        return (
            <>
                <div className='homesigup'>
                    Đây là trang Đăng kí người dùng
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp_User);
