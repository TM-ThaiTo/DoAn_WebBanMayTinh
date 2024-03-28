import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, Col, message, Row, Tooltip } from 'antd';

import { FastField, Form, Formik } from 'formik';

// scss
import './SignUp_User.scss'

import DatePickerField from '../../../../components/Custom/Field/DatePickerField';
import InputField from '../../../../components/Custom/Field/InputField';
import SelectField from '../../../../components/Custom/Field/SelectField';

import * as Yup from 'yup';
import constants from '../../../../constants/index.js';


import Delay from '../../../../components/Delay/index.js';

// import LoginGoogle from 'components/LoginGoogle';

class SignUp_User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSending: false,
            isSubmitting: false,
            isRedirectLogin: false,
            emailRef: ''
        };
    }




    onSendCode = async () => {
        // try {
        //     const { emailRef } = this.state;
        //     const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        //     if (!regex.test(emailRef)) {
        //         message.error('Email không hợp lệ !');
        //         return;
        //     }

        //     this.setState({ isSending: true });

        //     const result = await accountApi.postSendVerifyCode({ email: emailRef });
        //     if (result.status === 200) {
        //         message.success('Gửi thành công, kiểm tra email');
        //         this.setState({ isSending: false });
        //     }
        // } catch (error) {
        //     this.setState({ isSending: false });
        //     if (error.response) {
        //         message.error(error.response.data.message);
        //     } else {
        //         message.error('Gửi thất bại, thử lại');
        //     }
        // }
        // this.setState({ isSending: true });
        console.log("Check send code");
    };

    onSignUp = async (account) => {
        // try {
        //     this.setState({ isSubmitting: true });
        //     const result = await accountApi.postSignUp({ account });
        //     if (result.status === 200) {
        //         message.success('Đăng ký thành công.', 1);
        //         this.setState({ isSubmitting: false, isRedirectLogin: true });
        //     }
        // } catch (error) {
        //     this.setState({ isSubmitting: false });
        //     if (error.response) {
        //         message.error(error.response.data.message);
        //     } else {
        //         message.error('Đăng ký thất bại, thử lại');
        //     }
        // }
        console.log("Check sign up: ", account);
    };



    render() {
        const { isSending, isSubmitting, isRedirectLogin, emailRef } = this.state;
        const initialValue = {
            email: '',
            verifyCode: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            address: '',
            gender: null,
        };
        // validate form trước submit với yup
        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .trim()
                .required('* Email bạn là gì ?')
                .email('* Email không hợp lệ !'),
            fullName: Yup.string()
                .trim()
                .required('* Tên bạn là gì ?')
                .matches(
                    /[^~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`]/,
                    '* Không được chứa ký tự đặc biệt',
                )
                .max(70, '* Tối đa 70 ký tự'),
            verifyCode: Yup.string()
                .trim()
                .required('* Nhập mã xác nhận')
                .length(
                    constants.MAX_VERIFY_CODE,
                    `* Mã xác nhận có ${constants.MAX_VERIFY_CODE} ký tự`,
                ),
            password: Yup.string()
                .trim()
                .required('* Mật khẩu của bạn là gì ?')
                .min(6, '* Mật khẩu ít nhất 6 ký tự')
                .max(20, '* Mật khẩu tối đa 20 ký tự')
                .matches(
                    /^(?=.*[A-Z])(?=.*[~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
                    'Mật khẩu chứa chữ Hoa,chữ thường, số và ký tự đặc biệt',
                ),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref('password'), null],
                '* Mật khẩu chưa trùng khớp',
            ),
            birthday: Yup.date()
                .notRequired()
                .min(new Date(1900, 1, 1), '* Năm sinh từ 1900')
                .max(
                    new Date(new Date().getFullYear() - parseInt(constants.MIN_AGE), 1, 1),
                    `* Tuổi tối thiểu là ${constants.MIN_AGE}`,
                ),
            gender: Yup.boolean().required('* Giới tính của bạn'),
            address: Yup.string()
                .trim()
                .max(100, '* Tối đa 100 ký tự'),
        });
        const suffixColor = 'rgba(0, 0, 0, 0.25)';

        if (isRedirectLogin) {
            return (
                <Delay wait={constants.DELAY_TIME}>
                    <Redirect to={constants.ROUTES.LOGIN} />
                </Delay>
            );
        }

        return (
            // email, pass, name, gender, bird, address
            <div className='br'>
                <h1 className="SignUp-title container underline-title m-b-20 m-t-20">
                    <b>Đăng ký tài khoản</b>
                </h1>
                <div className="SignUp container">
                    {/*// Note: chuyển đến trang login khi đăng ký thành công */}
                    {isRedirectLogin && (
                        <Delay wait={constants.DELAY_TIME}>
                            <Redirect to={constants.ROUTES.LOGIN} />
                        </Delay>
                    )}

                    <Formik
                        initialValues={initialValue}
                        // validationSchema={validationSchema}
                        onSubmit={this.onSignUp}>
                        {(formikProps) => {
                            // emailRef.current = formikProps.values.email;
                            return (
                                <Form className="bg-form" onSubmit={formikProps.handleSubmit}>
                                    <Row
                                        className="input-border"
                                        gutter={[64, 32]}
                                        style={{ margin: 0 }}>
                                        {/* Form thông tin đăng ký */}
                                        <Col className="p-b-0" span={24} md={12}>
                                            <Row gutter={[0, 16]}>
                                                <h2>Thông tin tài khoản</h2>
                                                {/* email field */}
                                                <Col span={24}>
                                                    <FastField
                                                        name="email"
                                                        component={InputField}
                                                        className="input-form-common"
                                                        placeholder="Email *"
                                                        size="large"
                                                        suffix={
                                                            <Tooltip title="Email của bạn">
                                                                <InfoCircleOutlined
                                                                    style={{
                                                                        color: suffixColor,
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        }
                                                    />
                                                </Col>
                                                {/* user name field */}
                                                <Col span={12}>
                                                    <FastField
                                                        name="verifyCode"
                                                        component={InputField}
                                                        className="input-form-common"
                                                        placeholder="Mã xác nhận *"
                                                        size="large"
                                                        suffix={
                                                            <Tooltip title="Click gửi mã để nhận mã qua email">
                                                                <InfoCircleOutlined
                                                                    style={{ color: suffixColor }}
                                                                />
                                                            </Tooltip>
                                                        }
                                                    />
                                                </Col>
                                                {/* btn gửi mã */}
                                                <Col span={12}>
                                                    <Button
                                                        className="w-100 verify-btn"
                                                        type="primary"
                                                        size="large"
                                                        onClick={this.onSendCode}
                                                        loading={isSending}>
                                                        Gửi mã
                                                    </Button>
                                                </Col>
                                                {/* password field */}
                                                <Col span={24}>
                                                    <FastField
                                                        name="password"
                                                        component={InputField}
                                                        className="input-form-common"
                                                        type="password"
                                                        placeholder="Mật khẩu *"
                                                        size="large"
                                                        autocomplete="on"
                                                        iconRender={(visible) =>
                                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                        }
                                                    />
                                                </Col>
                                                {/* confirm password field */}
                                                <Col span={24}>
                                                    <FastField
                                                        name="confirmPassword"
                                                        component={InputField}
                                                        className="input-form-common"
                                                        type="password"
                                                        placeholder="Xác nhận mật khẩu *"
                                                        size="large"
                                                        iconRender={(visible) =>
                                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>

                                        {/* Form thông tin chi tiết */}
                                        <Col className="p-b-0" span={24} md={12}>
                                            <Row gutter={[0, 16]}>
                                                <h2>Thông tin chi tiết</h2>
                                                {/* full name filed */}
                                                <Col span={24}>
                                                    <FastField
                                                        name="fullName"
                                                        component={InputField}
                                                        className="input-form-common"
                                                        placeholder="Họ và tên *"
                                                        size="large"
                                                        suffix={
                                                            <Tooltip title="Họ và tên của bạn">
                                                                <InfoCircleOutlined
                                                                    style={{ color: suffixColor }}
                                                                />
                                                            </Tooltip>
                                                        }
                                                    />
                                                </Col>
                                                {/* birthday field */}
                                                <Col span={24}>
                                                    <FastField
                                                        className="input-form-common bd"
                                                        name="birthday"
                                                        component={DatePickerField}
                                                        placeholder="Ngày sinh"
                                                        size="large"
                                                    />
                                                </Col>
                                                {/* gender field */}
                                                <Col span={24}>
                                                    <FastField
                                                        className="input-form-common gender-field bd"
                                                        size="large"
                                                        name="gender"
                                                        component={SelectField}
                                                        placeholder="Giới tính *"
                                                        options={constants.GENDER_OPTIONS}
                                                    />
                                                </Col>
                                                {/* address filed */}
                                                <Col span={24}>
                                                    <FastField
                                                        name="address"
                                                        component={InputField}
                                                        className="input-form-common"
                                                        placeholder="Địa chỉ"
                                                        size="large"
                                                        suffix={
                                                            <Tooltip title="Địa chỉ của bạn">
                                                                <InfoCircleOutlined
                                                                    style={{ color: suffixColor }}
                                                                />
                                                            </Tooltip>
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>

                                        {/* Button submit */}
                                        <Col className="p-t-8 p-b-0 t-center" span={24}>
                                            <Button
                                                className="SignUp-submit-btn w-100"
                                                size="large"
                                                type="primary"
                                                htmlType="submit"
                                                loading={isSubmitting}>
                                                Đăng Ký
                                            </Button>
                                        </Col>

                                        {/* Khác */}
                                        <Col span={24} className="p-t-0 t-center">
                                            <div className="or-option" style={{ color: '#acacac' }}>
                                                HOẶC
                                            </div>
                                            {/* <LoginGoogle
                                            className="login-gg m-0-auto"
                                            title={windowWidth > 375 ? 'Đăng nhập với Gmail' : 'Gmail'}
                                        /> */}
                                            <div className="m-t-10 font-weight-500">
                                                Bạn đã có tài khoản ?
                                                <Link to={constants.ROUTES.LOGIN}>&nbsp;Đăng nhập</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>

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
