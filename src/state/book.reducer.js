import { BOOK_UPDATE_SOME } from './book.actions'

const initBook = {
    searchResults: {
        results: [],
        count: 0
    }
}

export function bookReducer(state = initBook, action) {
    switch(action.type) {
        case BOOK_UPDATE_SOME:
            return {...state, searchResults: action.payload}
        default:
            return state
    }
}