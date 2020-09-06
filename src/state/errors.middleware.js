import { ERRORS_THROWN } from './errors.actions'
import { toastUpdateMessages } from './toast.actions'

export const errorThrownProcessor = ({ dispatch, getState }) => next => action => {
    next(action)
    if (action.type === ERRORS_THROWN) {
        dispatch(toastUpdateMessages(action.type, action.payload, 'error'))
    }
}
