import { createStore } from 'redux'

const initialState = {
    sidebarShow: 'responsive',
    toasts: [],
    spinner: 0,
    auth_token: null,
    loggedIn: false,
    user: null
}

const changeState = (state = initialState, { type, toast, spinner, auth_token, loggedIn, user, ...rest }) => {
    switch (type) {
        case 'set':
            return {...state, ...rest }
        case 'add-toast':
            return {
                ...state,
                toasts: [...state.toasts, toast]
            }
        case 'show-spinner':
            return {
                ...state,
                spinner: state.spinner + 1
            }
        case 'hide-spinner':
            return {
                ...state,
                spinner: state.spinner - 1
            }
        case 'store-token':
            return {
                ...state,
                auth_token
            }
        case 'loggedIn':
            return {
                ...state,
                loggedIn
            }
        case 'update-user':
            return {
                ...state,
                user
            }
        default:
            return state
    }
}

const store = createStore(changeState)
export default store