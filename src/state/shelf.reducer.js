import { SHELF_UPDATE_ALL } from './shelf.actions'

const initShelf = {
    all: []
}

export function shelfReducer(state = initShelf, action) {
    switch(action.type) {
        case SHELF_UPDATE_ALL:
            return {...state, all: action.payload}
        default:
            return state
    }
}