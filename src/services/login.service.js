import Cookies from 'js-cookie';
import { setAuthTokens, addUser, isLoggenIn, logUserOut } from './auth.service';
import axios from 'axios';
import store from '../store';


function login(email, password) {
    let endpoint = '/auth/token/login/';
    let credentials = {email, password}
    // endpoint = buildParams(endpoint, credentials);
    let request = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
            // 'X-CSRFTOKEN': Cookies.get('csrftoken')
        }
    }
    return fetch(endpoint, request)
        .then(processLogin)
        .then(getUserDetails)
        
}

function logout() {
    const endpoint = '/auth/token/logout/'
    return axios.post(endpoint)
        .then(processLogout);
}

function register(email, password) {
    const endpoint = '/auth/users/'
    return axios.post(endpoint, {email, password})
}

function activate(uid, token) {
    const endpoint = '/auth/users/activation/'
    return axios.post(endpoint, {uid, token})
}

function passwordForgot(email) {
    const endpoint = '/auth/users/reset_password/'
    return axios.post(endpoint, {email})
}

function getUserDetails() {
    let endpoint = '/auth/users/me/';
    return axios(endpoint)
        .then(processUser);
}

// return a promise when login is finished processing + axios headers set
function processLogin(res) {
    console.log(res);
    if (res.status !== 200) {
        // invalid credentials
        return false
    } else {
        return setAuthTokens(res.json());
    }
}

function processLogout(res) {
    logUserOut();
    return res;
}

function processUser(res) {
    console.log(res.data);
    addUser(res.data)
}

export {
    login,
    logout,
    register,
    activate,
    passwordForgot,
    getUserDetails
}