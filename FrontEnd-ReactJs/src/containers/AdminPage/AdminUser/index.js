import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Popconfirm, Spin, Table } from 'antd';

import { getAllAdmin } from '../../../services/adminService';
// import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
// import './index.scss';


class AdminUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
        };
    }

    columns = [
        {
            title: 'User Name',
            key: 'userName',
            dataIndex: 'userName',
        },
        {
            title: 'Họ tên',
            key: 'fullName',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Quê quán',
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: 'Tuổi',
            key: 'age',
            dataIndex: 'age',
        },
        {
            title: 'Số điện thoại',
            key: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'Facebook',
            key: 'fb',
            dataIndex: 'fb',
            render: (fb) => (
                <a href={fb} target="blank" rel="noopener noreferrer">
                    Link Facebook
                </a>
            ),
        },
    ];

    componentDidMount() {
        this.getUserAdminList();
    }

    componentWillUnmount() {
    }

    getUserAdminList = async () => {
        try {
            const response = await getAllAdmin();
            if (response && response.code === 0) {
                const list = response.data || [];
                const listWithKey = list.map((item, index) => ({ ...item, key: index }));
                this.setState({ data: listWithKey, isLoading: false });
            } else {
                message.error('Lấy danh sách Admin thất bại');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            message.error('Lấy danh sách Admin thất bại');
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <>
                {this.state.isLoading ? (
                    <Spin className="trans-center" tip="Đang lấy danh sách ..." />
                ) : (
                    <Table pagination={false} columns={this.columns} dataSource={this.state.data} />
                )}
            </>
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
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
