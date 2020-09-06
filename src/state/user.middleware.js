import { USER_GET_ME, USER_GET_ME_SUCCESS, USER_GET_ME_FAILURE, USERS_UPDATE_ME, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
    USER_ACTIVATE, USER_ACTIVATE_SUCCESS, USER_ACTIVATE_FAILURE,
    userUpdateMe, userUpdateMessage } from './user.actions'
import { apiRequest } from './api.action'



export const usersGetMeSideEffect = (store) => next => action => {
    next(action)
    if (action.type === USER_GET_ME) {
        store.dispatch(apiRequest(
            '/auth/users/me/',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            USER_GET_ME_SUCCESS, USER_GET_ME_FAILURE)
        )
    }
}

export const usersGetMeProcessor = (store) => next => action => {
    next(action)
    if (action.type === USER_GET_ME_SUCCESS) {
        store.dispatch(userUpdateMe(action.payload))
    }
}

export const usersRegisterSideEffect = (store) => next => action => {
    next(action)
    if (action.type === USER_REGISTER) {
        const body = {
            email: action.payload.email,
            password: action.payload.password
        }
        store.dispatch(apiRequest(
            '/auth/users/',
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE)
        )
    }
}

export const usersRegisterProcessor = (store) => next => action => {
    next(action)
    if (action.type === USER_REGISTER_SUCCESS) {
        store.dispatch(userUpdateMessage('Account created. Please check your email to activate account'))
    }
    if (action.type === USER_REGISTER_FAILURE) {
        store.dispatch(userUpdateMessage(action.payload.message))
    }
}


export const usersActivateSideEffect = (store) => next => action => {
    next(action)
    if (action.type === USER_ACTIVATE) {
        const body = {
            uid: action.payload.uid,
            token: action.payload.token
        }
        store.dispatch(apiRequest(
            '/auth/users/activation/',
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            USER_ACTIVATE_SUCCESS, USER_ACTIVATE_FAILURE)
        )
    }
}

export const usersActivateProcessor = (store) => next => action => {
    next(action)
    if (action.type === USER_ACTIVATE_SUCCESS) {
        store.dispatch(userUpdateMessage('Thank you, your account has been activated'))
    }
    if (action.type === USER_ACTIVATE_FAILURE) {
        store.dispatch(userUpdateMessage('Sorry, activation failed'))
    }
}


export const userMiddleware = [
    usersGetMeSideEffect,
    usersGetMeProcessor,
    usersRegisterSideEffect,
    usersRegisterProcessor,
    usersActivateSideEffect,
    usersActivateProcessor
]