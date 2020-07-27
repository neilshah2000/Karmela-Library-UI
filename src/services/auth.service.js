import store from './../store';
import configureAxios from './axios.config';

export {
    setAuthTokens,
    getAuthToken,
    addUser,
    isLoggedIn,
    logUserOut
}

function setAuthTokens(jsonPromise) {
    return jsonPromise.then(json => {
        console.log(json.auth_token)
        setLoggedIn(true);
        storeAuthTokens(json.auth_token);
    });
}

function getAuthToken() {
    return localStorage.getItem('AUTH_TOKEN');
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