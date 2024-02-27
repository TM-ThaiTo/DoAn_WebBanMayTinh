import React, { Component } from 'react';
import { connect } from 'react-redux';

// cac file css, api
import "./TableManageUserRedux.scss";

import * as actions from '../../../store/actions';


class TableManageUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllUserStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            })
        }
    }

    // delete user
    handleDeleteUser = (user) => {
        this.props.deleteAUserStart(user.id);
    }

    // edit user
    handleEditUser = (user) => {
        this.props.handleEditUserFromTableChildKey(user);
    }

    render() {
        console.log(this.props.listUsers);
        console.log("check state trong table: ", this.state.userRedux);
        let arrUser = this.state.userRedux;
        return (
            <table id='TableManageUserRedux'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>FistName</th>
                        <th>LastName</th>
                        <th>Address</th>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserStart: (idUser) => dispatch(actions.deleteAUserStart(idUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUserRedux);
