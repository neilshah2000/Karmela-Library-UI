import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_CHECK, LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAILURE, LOGOUT_RESPONSE,
    updateLogin } from './login.actions'
import { apiRequest } from './api.action'
import { userGetMe } from './user.actions'


export const loginProcessor = (store) => {
    return function(next) {
        return function(action) {
            next(action)
            if (action.type === LOGIN) {
                // dispatch start spinner
                store.dispatch(apiRequest(
                    '/auth/token/login/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(action.payload)
                    },
                    LOGIN_SUCCESS, LOGIN_FAILURE)
                )
            }
        }
    }   
}


export const loginResponseProcessor = (store) => {
    return function(next) {
        return function(action) {
            next(action)
            if (action.type === LOGIN_SUCCESS) {
                store.dispatch(updateLogin(true, action.payload.auth_token))
                store.dispatch(userGetMe())
            }
            if (action.type === LOGIN_FAILURE) {
                store.dispatch(updateLogin(false, null))
            }
        }
    }   
}


// Same as method above but tries to use existing auth cookie and no credentials
// Back end sends HttpOnlyCookie so we can't access it and it always gets sent with every request
const loginCheckProcessor = ({ dispatch, getState }) => next => action => {
    next(action)
    if (action.type === LOGIN_CHECK) {
        dispatch(apiRequest(
            '/_session',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            },
            LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAILURE)
        )
    }
}

export const loginCheckResponseProcessor = (store) => {
    return function(next) {
        return function(action) {
            next(action)
            if (action.type === LOGIN_CHECK_SUCCESS) {
                if(action.payload.userCtx.name) {
                    console.log(action)
                    store.dispatch(updateLogin(true, action.payload.userCtx))
                } else { // back end can send a successful response but with an empty user
                    store.dispatch(updateLogin(false, null))
                }
            }
            if (action.type === LOGIN_CHECK_FAILURE) {
                store.dispatch(updateLogin(false, null))
            }
        }
    }   
}


const logoutProcessor = ({ dispatch, getState }) => next => action => {
    next(action)
    if (action.type === LOGOUT) {
        dispatch(apiRequest(
            '/_session',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            LOGOUT_RESPONSE, LOGOUT_RESPONSE)
        )
    }
}


const logoutResponseProcessor = ({ dispatch, getState }) => next => action => {
    next(action)
    if (action.type === LOGOUT_RESPONSE) {
        dispatch(updateLogin(false, null))
    }
}

export const loginMiddleware = [loginProcessor, loginResponseProcessor, loginCheckProcessor, loginCheckResponseProcessor, logoutProcessor, logoutResponseProcessor];