import { toastUpdateMessages } from './toast.actions'
import { TOAST_TYPE_ERROR, TOAST_TYPE_SUCCESS } from './constants'

export const processAllFailureActions = ({dispatch}) => next => action => {
    if(action.type.includes('failure') || action.type.includes('error')) {
        let message
        if (typeof action.payload === 'string' || action.payload instanceof String) {
            message = action.payload
        } else if (typeof action.payload.message === 'string' || action.payload.message instanceof String) {
            message = action.payload.message
        } else {
            message = JSON.stringify(action.payload)
        }
        dispatch(toastUpdateMessages(action.type, message, TOAST_TYPE_ERROR))
    }
    return next(action)
};

// export const processAllSuccessActions = ({dispatch}) => next => action => {
//     if(action.type.includes('success')) {
//         let message = ''
//         if (typeof action.payload === 'string') {
//             message = action.payload
//         }
//         dispatch(toastUpdateMessages(action.type, message, TOAST_TYPE_SUCCESS))
//     }
//     return next(action)
// };


export const toastMiddleware = [
    processAllFailureActions,
    // processAllSuccessActions,
]