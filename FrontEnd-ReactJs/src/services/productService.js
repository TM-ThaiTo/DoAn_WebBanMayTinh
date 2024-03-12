import axios from '../axios';


// api lấy sản phẩm theo id
const getProductById = (id) => {
    return axios.get(`/api/admin/products?id=${id}`);
};

export {
    getProductById,
}