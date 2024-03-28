import React, { Component } from 'react';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, Col, message, Row, Tooltip } from 'antd';
import CheckboxField from '../../../../components/Custom/Field/CheckboxField';
import InputField from '../../../../components/Custom/Field/InputField';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';

import { post_loginuser } from '../../../../services/userService';
import constants from '../../../../constants/index.js';

class Login_User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            isDisableLogin: false,
        };
    }

    // fn: xử lý khi đăng nhập thành công
    onLoginSuccess = async (data) => {
        try {
            this.setState({ isSubmitting: false });
            message.success('Đăng nhập thành công');
            localStorage.setItem(constants.REFRESH_TOKEN, data.role);
            if (process.env.NODE_ENV === 'production')
                localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.fullName);
            setTimeout(() => {
                this.props.history.goBack();
            }, constants.DELAY_TIME);
        } catch (error) {
            message.error('Lỗi đăng nhập.');
        }
    };

    // fn: xử lý khi đăng nhập thất bại
    onLoginFailed = async (data) => {
        try {
            this.setState({ isSubmitting: false });
            message.error(data.message);
        } catch (error) {
            message.error("Lỗi đăng nhập");
        }
    }

    // fn: đăng nhập
    onLogin = async (account) => {
        try {
            this.setState({ isSubmitting: true });
            const result = await post_loginuser(account);
            if (result && result.code === 0) {
                this.onLoginSuccess(result.data);
            }
            else {
                this.onLoginFailed(result);
            }
        } catch (error) {
            this.setState({ isSubmitting: false });
            if (error.response) {
                const { failedLoginTimes } = error.response.data;
                const messageError = error.response.data.message;
                if (failedLoginTimes >= constants.MAX_FAILED_LOGIN_TIMES) {
                    message.error(
                        'Vượt quá số lần đăng nhập.\nKiểm tra email hoặc nhấn "Quên mật khẩu"',
                        4,
                    );
                    this.setState({ isDisableLogin: true });
                } else {
                    message.error(messageError);
                }
            } else {
                message.error('Đăng nhập thất bại');
            }
            message.error("Lỗi đăng nhập");
        }
    };

    render() {
        const initialValue = {
            email: '',
            password: '',
            keepLogin: false,
        };

        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .trim()
                .required('* Email bạn là gì ?')
                .email('* Email không hợp lệ !'),
            password: Yup.string()
                .trim()
                .required('* Mật khẩu của bạn là gì ?'),
        });

        const suffixColor = 'rgba(0, 0, 0, 0.25)';

        return (
            <div className='br'>
                <div className='Login-title container '>
                    <h1 className='m-b-20 m-t-20 underline-title'>
                        <h1>Đăng nhập</h1>
                    </h1>
                </div>
                <div className="Login container">
                    <div className='Login-content'>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={validationSchema}
                            onSubmit={this.onLogin}>
                            {(formikProps) => {
                                return (
                                    <Form className="bg-form">
                                        <Row
                                            className="input-border"
                                            gutter={[40, 24]}
                                            justify="center"
                                            style={{ margin: 0 }}>
                                            {/* Form thông tin đăng nhập */}
                                            <Col span={24} className="m-t-20">
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
                                            <Col span={24}>
                                                <FastField
                                                    name="password"
                                                    component={InputField}
                                                    className="input-form-common"
                                                    type="password"
                                                    placeholder="Mật khẩu *"
                                                    size="large"
                                                    autoComplete="on"
                                                    iconRender={(visible) =>
                                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                                    }
                                                />
                                            </Col>
                                            <Col span={24}>
                                                <div className="d-flex justify-content-between">
                                                    <FastField name="keepLogin" component={CheckboxField}>
                                                        <b>Duy trì đăng nhập</b>
                                                    </FastField>
                                                    <Link
                                                        to="/login/forgot"
                                                        style={{ color: '#50aaff' }}>
                                                        <b>Quên mật khẩu ?</b>
                                                    </Link>
                                                </div>
                                            </Col>

                                            {/* Button submit */}
                                            <Col className="p-t-8 p-b-0 t-center" span={24}>
                                                <Button
                                                    className="Login-submit-btn w-100"
                                                    size="large"
                                                    type="primary"
                                                    htmlType="submit"
                                                    disabled={this.state.isDisableLogin}
                                                    loading={this.state.isSubmitting}>
                                                    Đăng nhập
                                                </Button>
                                            </Col>
                                            <Col span={24} className="p-t-0 t-center">
                                                <div className="or-option" style={{ color: '#acacac' }}>
                                                    HOẶC
                                                </div>
                                                <div className="m-t-20 m-b-20 font-weight-500">
                                                    Bạn chưa đã có tài khoản ?
                                                    <Link to="/signup-user">&nbsp;Đăng ký</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login_User);
