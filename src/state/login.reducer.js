import { UPDATE_LOGIN } from './login.actions'

const initLogin = {
    loggedIn: false,
    authToken: null
}

export function loginReducer(state = initLogin, action) {
    switch(action.type) {
        case UPDATE_LOGIN:
            return {...state, loggedIn: action.payload.loggedIn, authToken: action.payload.authToken}
        default:
            return state
    }
}