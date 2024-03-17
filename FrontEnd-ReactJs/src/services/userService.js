import axios from '../axios';

// POST:  API login bang tai khoan thong thuong
const post_loginuser = (account) => {
    return axios.post("/api/login", account);
};

export {
    post_loginuser,
}