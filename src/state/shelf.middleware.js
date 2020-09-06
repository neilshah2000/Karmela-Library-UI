import { SHELF_GET_ALL, SHELF_GET_ALL_SUCCESS, SHELF_GET_ALL_FAILURE,
    shelfUpdateAll } from './shelf.actions'
import { apiRequest } from './api.action'

export const shelfGetAllSideEffect = (store) => next => action => {
    next(action)
    if (action.type === SHELF_GET_ALL) {
        store.dispatch(apiRequest(
            '/catalog/api/shelves/',
            { },
            SHELF_GET_ALL_SUCCESS, SHELF_GET_ALL_FAILURE)
        )
    }
}

export const shelfGetAllProcessor = (store) => next => action => {
    next(action)
    if (action.type === SHELF_GET_ALL_SUCCESS) {
        store.dispatch(shelfUpdateAll(action.payload))
    }
}


export const shelfMiddleware = [
    shelfGetAllSideEffect,
    shelfGetAllProcessor,
]