import axios from '../axios';

// POST:  API login bang tai khoan thong thuong
const Api_login_User = (account) => {
    return axios.post("/api/login", account);
};

export {
    Api_login_User,
}