import axios from '../axios';

// login admin
const postLoginAdmin = (account) => {
    return axios.post("/api/admin/login-admin", account);
};

const getStatus = () => {
    return axios.get("/api/admin/products");
};


// GET lấy danh sách admin
const getAllAdmin = () => {
    return axios.get("/api/admin/get-admin");
}

// GET lấy danh sách user
const getUser_Admin = () => {
    return axios.get("/api/admin/get-user");
}

// GET lấy tất cả sản phẩm
const getAPIProductList = () => {
    return axios.get("/api/admin/products");
}

// POST thêm sản phẩm
const postAddProduct = (product) => {
    return axios.post("/api/admin/products/add", product);
}


export {
    getAllAdmin,
    getUser_Admin,

    postAddProduct,
    getAPIProductList,
    postLoginAdmin,


    getStatus,

}