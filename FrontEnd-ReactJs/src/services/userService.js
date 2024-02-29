import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    // return axios.post('/api/login', { email: userEmail, password: userPassword });
    return axios.post('/api/Login', { Email: userEmail, Password: userPassword });
    // return axios.post('/api/account/verify/forgot');
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data);
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const editUser = (data) => {
    return axios.post('/api/edit-user', data);
}

const deleteUser = (idUser) => {
    return axios.delete('/api/delete-user', { data: { id: idUser } });
}

const getAllCode = (inputtype) => {
    return axios.get(`/api/all-codes?type=${inputtype}`);
}


export {
    handleLoginApi,
    getAllUser,
    createNewUser,
    getAllCode,
    editUser,
    deleteUser,

}
