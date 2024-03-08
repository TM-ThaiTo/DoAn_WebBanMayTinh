import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Popconfirm, Spin, Table } from 'antd';

import { getUser_Admin } from '../../../services/adminService';
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
// import './index.scss';


class CustomerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        };
    }

    onDelCustomer = async (id) => {
        try {
            // Gọi API hoặc service để xoá người dùng theo ID
            // const response = await deleteUser(id);

            // Cập nhật UI nếu xoá thành công
            // if (response && response.data.code === 0) {
            //     message.success('Xoá tài khoản thành công');
            //     this.setState({
            //         data: this.state.data.filter((item) => item.id !== id),
            //     });
            // } else {
            //     message.error('Xoá tài khoản thất bại');
            // }
        } catch (error) {
            message.error('Xoá tài khoản thất bại');
        }
    };

    columns = [
        {
            title: 'ID',
            key: 'id_account',
            dataIndex: 'id_account',
            render: (v) => <a>{v}</a>,
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Loại tài khoản',
            key: 'authType',
            dataIndex: 'authType',
        },
        {
            title: 'Họ tên',
            key: 'fullName',
            dataIndex: 'fullName',
        },
        {
            title: 'Quê quán',
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: 'Ngày sinh',
            key: 'birthDay',
            dataIndex: 'birthDay',
        },
        {
            title: 'Giới tính',
            key: 'gender',
            dataIndex: 'gender',
            render: (gender) => (gender ? 'Nam' : 'Nữ'),
        },
        {
            title: '',
            render: (_v, records) => (
                <Popconfirm
                    title="Bạn có chắc muốn xoá ?"
                    placement="left"
                    cancelText="Huỷ bỏ"
                    okText="Xoá"
                    onConfirm={() => this.onDelCustomer(records.id_account)}>
                    <Button danger>Xoá</Button>
                </Popconfirm>
            ),
        },
    ];

    componentDidMount() {
        this.getCustomerList();
    }

    componentWillUnmount() { }

    getCustomerList = async () => {
        try {
            this.setState({ isLoading: true });

            // Gọi API hoặc service để lấy danh sách người dùng
            const response = await getUser_Admin();

            // Cập nhật state nếu lấy dữ liệu thành công
            if (response && response.data && response.code === 0) {
                const userList = response.data;

                const newList = userList.map((item) => {
                    return {
                        key: item.id_account,
                        id_account: item.id_account,
                        email: item.email,
                        authType: item.authType,
                        fullName: item.fullName,
                        address: item.address,
                        birthDay: item.birthDay,
                        gender: item.gender,
                    };
                });

                this.setState({ data: newList, isLoading: false });
            } else {
                message.error('Lấy danh sách người dùng thất bại');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            message.error('Lấy danh sách người dùng thất bại');
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <>
                {this.state.isLoading ? (
                    <Spin className="trans-center" tip="Đang lấy danh sách ..." />
                ) : (
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        pagination={{ showLessItems: true, position: ['bottomCenter'] }}
                    />
                )}
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CustomerUser);
