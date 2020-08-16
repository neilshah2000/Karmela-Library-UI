import store from './../store';
import configureAxios from './axios.config';

export {
    setAuthTokens,
    getAuthToken,
    clearAuthToken,    
    addUser,
    isLoggedIn,
    logUserOut    
}

function setAuthTokens(json) {
    setLoggedIn(true);
    storeAuthTokens(json.auth_token);
    return true
}

function getAuthToken() {
    return localStorage.getItem('AUTH_TOKEN');
}

function clearAuthToken() {
    return localStorage.removeItem('AUTH_TOKEN');
}

// has a token
// has a user
function isLoggedIn() {
    return store.getState().loggedIn
}

function addUser(user) {
    // set logged in state true
    store.dispatch({type: 'loggedIn', loggedIn: true})
    store.dispatch({type: 'update-user', user: user})
    // set loggin in user
}

function logUserOut() {
    console.log('loggin out..')
    localStorage.removeItem('AUTH_TOKEN');
    store.dispatch({type: 'loggedIn', loggedIn: false})
    store.dispatch({type: 'update-user', user: null})
    configureAxios();
}

//////// private ///////

function storeAuthTokens(token) {
    // store.dispatch({type: 'store-token', auth_token: token})
    localStorage.setItem('AUTH_TOKEN', token)
    configureAxios();
}

function setLoggedIn() {

}

function setUser() {

}

function setUsersGroups() {

}