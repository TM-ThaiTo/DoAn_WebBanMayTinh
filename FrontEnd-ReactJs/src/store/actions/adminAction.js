import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { getAllCode, createNewUser, getAllUser, editUser, deleteUser } from '../../services/userService';
// import { rest } from 'lodash';

// code chuẩn (start doing end)
// get gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            })

            let res = await getAllCode("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSucces(res.data));
            } else {
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log("fetchGenderStart error", e);
        }
    }
}
export const fetchGenderSucces = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCES,
    data: genderData,
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

// get position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode("position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSucces(res.data));
            } else {
                dispatch(fetchPositionFaided());
            }
        } catch (e) {
            dispatch(fetchPositionFaided());
            console.log("fetchGenderStart error", e);
        }
    }
}
export const fetchPositionSucces = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

// get role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSucces(res.data));
            } else {
                dispatch(fetchRoleFaided());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log("fetchGenderStart error", e);
        }
    }
}
export const fetchRoleSucces = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

// create user
export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess(res.data));
                dispatch(fetchAllUserStart());
                toast.success('Create new user success!');
            } else {
                dispatch(createUserFailed());
                toast.success('Create new user error!');
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log("createUserFailed error", e);
        }
    }
}
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

// read user (get all user)
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            //let res = await getAllUser("ALL");
            let resTest = await test();
            console.log("Test API", resTest);

            // if (res && res.errCode === 0) {
            //     dispatch(fetchAllUserSucces(res.user.reverse()));
            // } else {
            //     dispatch(fetchAllUserFaided());
            // }
        } catch (e) {
            //     dispatch(fetchAllUserFaided());
            //     console.log("fetchAllUserFaided error", e);
        }
    }
}
export const fetchAllUserSucces = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFaided = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

// update user
export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSucces());
                dispatch(fetchAllUserStart());
                toast.success('Update user success!');
            } else {
                dispatch(editUserFaided());
                toast.success('Update user error!');
            }
        } catch (e) {
            dispatch(editUserFaided());
            console.log("updateUserFaided error", e);
            toast.success('Update user error!');
        }
    }
}
export const editUserSucces = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    users: data
})
export const editUserFaided = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

// delete user
export const deleteAUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
                toast.success('Delete user success!');
            } else {
                dispatch(deleteUserFailed());
                toast.success('Delete user error!');
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("Delete user error!", e);
            toast.success('Delete user error!');
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

