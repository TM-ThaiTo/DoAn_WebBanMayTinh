import React, { Component } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Form, Input, InputNumber, Row, Select, Tooltip } from 'antd';
import { connect } from 'react-redux';

const BANDWIDTHS = [
    { type: 0, label: '2.4 GHz' },
    { type: 1, label: '2.4 GHz/ 5GHz' },
];
const suffixColor = '#aaa';

class Router extends Component {

    render() {
        return (
            <Row gutter={[16, 16]}>
                {/* Băng thông */}
                <Col span={12} md={8} xl={6} xxl={4}>
                    <Form.Item
                        name="bandWidth"
                        rules={[{ required: true, message: 'Bắt buộc' }]}>
                        <Select size="large" placeholder="Băng thông *">
                            {BANDWIDTHS.map((item, index) => (
                                <Select.Option value={item.label} key={index}>
                                    {item.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                {/* Độ mạnh ăng ten */}
                <Col span={12} md={8} xl={6} xxl={4}>
                    <Form.Item
                        name="strong"
                        rules={[{ required: true, message: 'Bắt buộc' }]}>
                        <InputNumber
                            style={{ width: '100%' }}
                            step={1}
                            size="large"
                            min={0}
                            max={100}
                            placeholder="Độ mạnh ăng ten *"
                        />
                    </Form.Item>
                </Col>
                {/* Các cổng kết nối */}
                <Col span={12} md={8} xl={6} xxl={4}>
                    <Form.Item
                        name="numberOfPort"
                        rules={[{ required: true, message: 'Bắt buộc', whitespace: true }]}>
                        <Input
                            size="large"
                            placeholder="Các cổng kết nối *"
                            suffix={
                                <Tooltip title="1xWAN Gigabit">
                                    <InfoCircleOutlined style={{ color: suffixColor }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
        )
    }
}

// Map state từ Redux store vào props của component
const mapStateToProps = state => {
    return {
        // isLoggedIn: state.auth.isLoggedIn,
        // adminName: state.auth.adminName
    };
};

// Map các action creators để dispatch vào props của component
const mapDispatchToProps = dispatch => {
    return {
        // Ví dụ: loginAction: (name) => dispatch(actions.login(name)),
        // logoutAction: () => dispatch(actions.logout())
    };
};

// Kết nối component với Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Router);
