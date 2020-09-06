import { USERS_UPDATE_ME, USER_UPDATE_MESSAGE } from './user.actions'

const initUser = {
    me: null,
    message: ''
}

export function userReducer(state = initUser, action) {
    switch(action.type) {
        case USERS_UPDATE_ME:
            return {...state, me: action.payload}
        case USER_UPDATE_MESSAGE:
            return {...state, message: action.payload}
        default:
            return state
    }
}