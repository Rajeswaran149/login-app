import axios from 'axios';
const API_URL = 'http://localhost:5000'

const ApiService = {
    login: (username , password) => {
        return axios.post(`$({API_URL}/api/auth/login)`,{ username , password })
        .then( response => {
            // console.log(username);
            return response.data;
        })
        .catch (error => {
          throw error.response.data;
        });
    },
    createUser : (userData) => {
        return axios.post(`${API_URL}/users` , userData)
        .then ( response => {
            return response.data;
        })
        .catch ((error) => {
            throw error.response.data;
        })
    },
    updateUser:(userId , userData) => {
        return axios.put(`${API_URL}/users/${userId}`, userData)
        .then (response => {
            return response.data;
        })
        .catch ((error) => {
            throw error.response.data;
        })
    },
    deleteUser: (userId) => {
        return axios.delete(`${API_URL}/users/${userId}`)
        .then ((response) => {
            return response.data;
        })
        .catch ((error) => {
            throw error.response.data;
        });
    }
};
export default ApiService; 