import axios from '../axios';
import * as queryString from 'query-string';

// const adminService = {

//     /**
//      * Đăng nhập hệ thống
//      * {
//      *  "username": "string",
//      *  "password": "string"
//      * }
//      */
//     login(loginBody) {
//         return axios.post(`/admin/login`, loginBody)
//     },

// };


const getAllAdmin = () => {
    return axios.get("/api/admin/get-admin");
}

const getUser_Admin = () => {
    return axios.get("/api/admin/get-user");
}

export {
    getAllAdmin,
    getUser_Admin,
}