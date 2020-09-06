import { TOAST_UPDATE_MESSAGES } from './toast.actions'

const initToasts = {
    all: []
}

export function toastReducer(state = initToasts, action) {
    switch(action.type) {
        case TOAST_UPDATE_MESSAGES:
            return {...state, all: [...state.all, action.payload]}
        default:
            return state
    }
}