import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';

import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions/userActions';

class Login extends Component {
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
        //     
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
        let res = await handleLoginApi(this.state.username, this.state.password);
        console.log("Check res: ", res);
        // Giải mã chuỗi JSON
        console.log("Check message: ", res.message);
        // let dataObject = JSON.parse(res.data);
        console.log("Check message:", res.data.email);

        // // Truy cập các thuộc tính bên trong
        // console.log("Check email: ", dataObject.Email);
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

    render() {// JSX
        return (
            <div className='login-background'>
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

                        <div className='col-12' style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12'>
                            <button className='login-btn'
                                onClick={() => { this.handleLogin() }}
                            >
                                Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='Other-login-text'>Or Login with:</span>
                        </div>

                        <div className='col-12 login-social'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
