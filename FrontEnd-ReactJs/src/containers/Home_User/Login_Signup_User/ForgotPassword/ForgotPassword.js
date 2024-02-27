import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// scss
import './ForgotPassword.scss'

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        }
    }

    // xự kiện nhấn ẩn/hiện mật khẩu
    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }
    // xự kiện nhấn nút Enter
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin(); // Gọi phương thức xử lý đăng nhập khi người dùng nhấn Enter
        }
    }
    render() {
        return (
            <>
                <div className='forgot-background'>
                    <h1 className="title-forgot m-b-20 m-t-20 underline-title">
                        <b>Thay đổi mật khẩu</b>
                    </h1>
                    <div className='forgot-container'>
                        <div className='forgot-content row'>
                            {/* username */}
                            <div className='col-12 from-group forgot-input'>
                                <input type='text' className='col-12 from-control' placeholder='Nhập Email'
                                    onChange={(event) => this.handleOnChangeInput_UserName(event)}
                                    onKeyPress={(event) => this.handleKeyPress(event)}
                                />
                            </div>
                            {/* password */}
                            <div className='col-12 from-group forgot-input'>
                                <div className='custom-input-password'>
                                    <input type={this.state.isShowPassword ? 'text' : 'password'} className='col-12 from-control' placeholder='Nhập mật khẩu mới'
                                        onChange={(event) => this.handleOnChangeInput_Password(event)}
                                        onKeyPress={(event) => this.handleKeyPress(event)}
                                    />
                                    {/* <span
                                        onClick={() => { this.handleShowPassword() }}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                    </span> */}
                                </div>
                            </div>

                            {/* xacthuc */}
                            <div className='col-12 form-group forgot-input xacthuc'>
                                <input type='text' className='col-6' placeholder='Nhập mã xác thực'
                                    onChange={(event) => this.handleOnChangeInput_UserName(event)}
                                    onKeyPress={(event) => this.handleKeyPress(event)}
                                />
                                <button type='button' className='col-6'>Gửi mã</button>
                            </div>
                            {/* btn */}
                            <div className='col-12'>
                                <button className='login-btn'
                                    onClick={() => { this.handleLogin() }}
                                >
                                    Login</button>
                            </div>
                            {/* quaylai */}
                            <div className='col-12 quay-lai'>
                                Quay lại&nbsp;&nbsp;
                                <a href='/login-user'>Đăng nhập</a>
                                &nbsp;&nbsp;hoặc&nbsp;&nbsp;
                                <a href='/signup-user'>Đăng kí</a>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
