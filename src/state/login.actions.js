export const LOGIN = '[login] login';
export const LOGIN_SUCCESS = '[login] login success';
export const LOGIN_FAILURE = '[login] login failure';

export const LOGOUT = '[login] logout';
export const LOGOUT_RESPONSE = '[login] logout response';

export const UPDATE_LOGIN = '[login] update login';

export const LOGIN_CHECK = '[login] check'
export const LOGIN_CHECK_SUCCESS = '[login] check success'
export const LOGIN_CHECK_FAILURE = '[login] check failure'

////// user actions

export const login = (email, password) => ({
    type: LOGIN,
    payload: {
        email,
        password
    }
});

export const logout = () => ({
    type: LOGOUT
});


//////// internal actions

export const updateLogin = (amILoggedIn, authToken) => ({
    type: UPDATE_LOGIN,
    payload: {
        loggedIn: amILoggedIn,
        authToken
    }
});


export const loginCheck = () => ({
    type: LOGIN_CHECK
});

