import { createStore } from 'redux'

const initialState = {
    sidebarShow: 'responsive',
    toasts: [], // https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
    spinner: 0
}

const changeState = (state = initialState, { type, toast, spinner, ...rest }) => {
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
        default:
            return state
    }
}

const store = createStore(changeState)
export default store