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

// post thêm sản phẩm
const postAddProduct = (product) => {
    return axios.post("/api/admin/products/add", product);
}

const getAllAdmin = () => {
    return axios.get("/api/admin/get-admin");
}

const getUser_Admin = () => {
    return axios.get("/api/admin/get-user");
}

const getAPIProductList = () => {
    return axios.get("/api/admin/products");
}

export {
    getAllAdmin,
    getUser_Admin,

    postAddProduct,
    getAPIProductList,
}