import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import TableManageUserRedux from './TableManageUserRedux.js';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: [],
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userIdEdit: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRole = this.props.roleRedux;
            let arrPosition = this.props.positionRedux;
            let arrGenders = this.props.genderRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
            });
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (this.state.previewImgUrl === '') {
            return;
        } else {
            this.setState({
                isOpen: true
            })
        }
    }

    handleClickSave = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.createNewUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            });
        } if (action === CRUD_ACTIONS.EDIT) {
            // fire redux edit user
            this.props.editUserStart({
                email: this.state.email,
                //password: this.state.password,
                id: this.state.userIdEdit,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                //avatar: this.state.avatar,

                action: CRUD_ACTIONS.CREATE,
            });
        }

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    onChangeInputUser = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditUserFromTableChild = (user) => {
        this.setState({
            userIdEdit: user.id,
            email: user.email,
            password: 'user.password',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: user.avatar,

            action: CRUD_ACTIONS.EDIT,
        });
    }

    render() {
        let language = this.props.language;
        let isLoadingGenderReact = this.props.isLoadingGender;

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar } = this.state;

        return (
            <div className='user-redux-manager'>
                <div className='title'>User Redux Thai To</div>

                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>
                                {isLoadingGenderReact === true ? 'Loading Gender' : ''}
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => this.onChangeInputUser(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.onChangeInputUser(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstname" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInputUser(event, 'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInputUser(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInputUser(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.onChangeInputUser(event, 'address')}
                                />
                            </div>
                            {/* list gender */}
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInputUser(event, 'gender')}
                                    value={gender}
                                >
                                    {genders && genders.length > 0
                                        && genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {/* list position */}
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInputUser(event, 'position')}
                                    value={position}
                                >
                                    {positions && positions.length > 0
                                        && positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {/* list roleid */}
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInputUser(event, 'role')}
                                    value={role}
                                >
                                    {roles && roles.length > 0
                                        && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {/* image */}
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImage" type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImage'>Tải ảnh<i className="fas fa-upload"></i></label>
                                    <div
                                        className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                            {/* button save vs edit */}
                            <div className='col-12 my-3'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" :
                                        'btn btn-primary'}
                                    onClick={() => this.handleClickSave()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                            {/* table user */}
                            <div className='col-12 mb-5'>
                                <TableManageUserRedux
                                    handleEditUserFromTableChildKey={this.handleEditUserFromTableChild}
                                    actions={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }
}

// ham nay => lay gia tri sau khi redux dc goi
const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoadingGender: state.admin.isLoadingGender,

        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

// ham goi de khoi dong 1 function trong redux
const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUserStart: (data) => dispatch(actions.createNewUserStart(data)),
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        editUserStart: (data) => dispatch(actions.editUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
