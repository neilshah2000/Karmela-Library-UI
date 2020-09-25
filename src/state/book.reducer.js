import { BOOK_UPDATE_SOME, BOOK_ADD_TO_BASKET, BOOK_REMOVE_FROM_BASKET, BOOK_UPDATE_BORROWED } from './book.actions'

const initBook = {
    searchResults: {
        results: [],
        count: 0
    },
    basket: [],
    borrowed: []
}

export function bookReducer(state = initBook, action) {
    switch(action.type) {
        case BOOK_UPDATE_SOME:
            return {...state, searchResults: action.payload}
        case BOOK_ADD_TO_BASKET:
            const alreadyExists = state.basket.find(book => book.id === action.payload.id)
            if (typeof alreadyExists === 'undefined') {
                const basketUpdate = [action.payload]
                return {...state, basket: state.basket.concat(basketUpdate)}
            } else {
                return {...state}
            }
        case BOOK_REMOVE_FROM_BASKET:
            const removeBookId = action.payload.id
            return {...state, basket: state.basket.filter(book => book.id !== removeBookId)}
        case BOOK_UPDATE_BORROWED:
            return {...state, borrowed: action.payload}
        default:
            return state
    }
}