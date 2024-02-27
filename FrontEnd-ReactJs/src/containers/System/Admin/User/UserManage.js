import React, { Component } from 'react';
import { connect } from 'react-redux';

// cac file css, api
import "./UserManage.scss";

// import * as actions from '../../../store/actions';
// import * as actions from '../../../../store/actions';


class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userRedux: [],

            arrUser: [
                {
                    email: 'john.doe@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St',
                    gender: 'Male',
                    role: 'Admin'
                },
                {
                    email: 'jane.smith@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    address: '456 Oak Ave',
                    gender: 'Female',
                    role: 'User'
                },
                {
                    email: 'jane.smith@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    address: '456 Oak Ave',
                    gender: 'Female',
                    role: 'User + Shop Owner'
                },
                // ... Thêm các đối tượng người dùng khác nếu cần
            ]
        }
    }

    componentDidMount() {
        // this.props.fetchAllUserStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers != this.props.listUsers) {
        //     this.setState({
        //         userRedux: this.props.listUsers,
        //     })
        // }
    }

    handleCreate_A_NewUser = () => {
        alert("check create a new user");
    }

    handleCreate_N_User = () => {
        alert("check create nhiều user");
    }
    handleEditUser = () => {
        alert("check edit user");
    }

    handleDeleteUser = () => {
        alert("delete user");
    }
    render() {
        const { arrUser } = this.state;
        return (

            <>
                <div className='user-manager'>
                    <div className='title'>Quản lý người dùng</div>
                    <div className='manage'>
                        <div className='btn-create'>
                            <button className='btn-create-1'
                                onClick={() => this.handleCreate_A_NewUser()}
                            >Thêm người dùng</button>
                            <button className='btn-create-n'
                                onClick={() => this.handleCreate_N_User()}
                            >Thêm nhiều người dùng</button>
                        </div>
                    </div>
                    <div className='content'>
                        <table id='TableManageUserRedux'>
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>FistName</th>
                                    <th>LastName</th>
                                    <th>Address</th>
                                    <th>Gender</th>
                                    <th>Role</th>

                                    <th>Action</th>
                                </tr>
                                {arrUser && arrUser.length > 0 &&
                                    arrUser.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    <button className='btn-edit'
                                                        onClick={() => this.handleEditUser(item)}
                                                    > <i className="fas fa-pencil-alt"></i></button>
                                                    <button className='btn-delete'
                                                        onClick={() => this.handleDeleteUser(item)}
                                                    > <i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        // listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        // deleteAUserStart: (idUser) => dispatch(actions.deleteAUserStart(idUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
