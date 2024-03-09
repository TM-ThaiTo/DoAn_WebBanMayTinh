import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message, Row, Col, Card } from 'antd';
import './index.scss';

class Login extends Component {


    onFinish = async (account) => {
        // try {
        //   const response = await adminApi.postLogin(account);
        //   if (response) {
        //     message.success('Đăng nhập thành công', 2);
        //     this.props.onLogin(true, response.data.name);
        //   }
        // } catch (error) {
        //   message.error('Tài khoản không tồn tại hoặc sai mật khẩu', 2);
        //   this.props.onLogin(false);
        // }
        this.props.onLoginAdmin(true, 'OK');
    };

    render() {
        return (
            <div className='center-screen'>
                <h2 className="title">Đăng nhập với quyền Admin</h2>
                <Form name="form" onFinish={this.onFinish}>
                    <div className="custom-login-form">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    label="Username"
                                    name="userName"
                                    rules={[
                                        { required: true, message: 'Please input your username!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24} className='pass-custom'>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please input your password!' },
                                    ]}
                                >
                                    <Input.Password className='input-pass-custom' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button
                                        size="large"
                                        className="w-100 m-t-8 custom-login-button"
                                        htmlType="submit"
                                        type="primary"
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    onLoginAdmin: PropTypes.func,
};

export default Login;
