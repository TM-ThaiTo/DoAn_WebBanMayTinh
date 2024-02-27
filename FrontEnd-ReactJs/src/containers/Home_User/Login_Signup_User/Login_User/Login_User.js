import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// scss
import './Login_User.scss'

class Login_User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        }
    }

    handleOnChangeInput_UserName = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleOnChangeInput_Password = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = async () => {
        // this.setState({
        //     errMessage: '',
        // });

        // try {
        //     let data = await handleLoginApi(this.state.username, this.state.password);
        //     if (data && data.errCode != 0) {
        //         this.setState({
        //             errMessage: data.errMessage,
        //         });
        //     }
        //     if (data && data.errCode == 0) {
        //         this.props.userLoginSuccess(data.user);
        //     }
        // } catch (e) {
        //     if (e.response) {
        //         if (e.response.data) {
        //             this.setState({
        //                 errMessage: e.response.data.errMessage,
        //             })
        //         }
        //     }
        // }
        if (1 === 1) {
            this.props.userLoginSuccess("ADMIN");
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
                <div className='login-background-user'>
                    <h1 className="title-login m-b-20 m-t-20 underline-title">
                        <b>Đăng nhập</b>
                    </h1>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 login-text'>Login</div>

                            <div className='col-12 from-group login-input'>
                                <label>Username:</label>
                                <input type='text' className='col-12 from-control' placeholder='Enter your Username'
                                    onChange={(event) => this.handleOnChangeInput_UserName(event)}
                                    onKeyPress={(event) => this.handleKeyPress(event)}
                                />
                            </div>

                            <div className='col-12 from-group login-input'>
                                <label>Password:</label>
                                <div className='custom-input-password'>
                                    <input type={this.state.isShowPassword ? 'text' : 'password'} className='col-12 from-control' placeholder='Enter your Password'
                                        onChange={(event) => this.handleOnChangeInput_Password(event)}
                                        onKeyPress={(event) => this.handleKeyPress(event)}
                                    />
                                    <span
                                        onClick={() => { this.handleShowPassword() }}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                    </span>
                                </div>
                            </div>

                            <div className='col-12 forgot-password'>
                                <a href='/login/forgot'>
                                    Forgot your password ?
                                </a>
                            </div>

                            <div className='col-12'>
                                <button className='login-btn'
                                    onClick={() => { this.handleLogin() }}
                                >
                                    Login</button>
                            </div>


                            <div className='col-12 text-center mt-3'>
                                <span className='Other-login-text'>Or Login with:</span>
                            </div>

                            <div className='col-12 login-social'>
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                        <div className='signup'>
                            Bạn chưa có tài khoản?
                            <span>
                                <a href='/signup-user'>
                                    Đăng kí
                                </a>
                            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login_User);
