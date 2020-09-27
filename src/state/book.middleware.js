import { BOOK_GET_SOME, BOOK_GET_SOME_SUCCESS, BOOK_GET_SOME_FAILURE, BOOK_CHECKOUT, BOOK_CHECKOUT_SUCCESS, BOOK_CHECKOUT_FAILURE, BOOK_GET_BORROWED, 
    BOOK_GET_BORROWED_SUCCESS, BOOK_GET_BORROWED_FAILURE, BOOK_RETURN, BOOK_RETURN_SUCCESS, BOOK_RETURN_FAILURE, BOOK_ADD_TO_BASKET, BOOK_REMOVE_FROM_BASKET,
    BOOK_CLEAR_BASKET, 
    bookUpdateSome, bookUpdateBorrowed, bookClearBasket, bookSetShowModal, bookGetBorrowed } from './book.actions'
import { apiRequest } from './api.action'
import { toastUpdateMessages } from './toast.actions'
import { TOAST_TYPE_ERROR, TOAST_TYPE_SUCCESS } from './constants'

export const bookGetSomeSideEffect = (store) => next => action => {
    next(action)
    if (action.type === BOOK_GET_SOME) {
        const { currentPage, rowsPerPage, searchTerm, shelf } = action.payload
        const params = {
            limit: rowsPerPage,
            offset: (rowsPerPage * currentPage) - rowsPerPage
        }
        // Add either the shelf or search parameter not both
        // shelf has to be null for string search to work
        if (!shelf) {
            params.search = searchTerm;
        } else {
            params.shelf = shelf
        }

        var url = new URL(window.location.origin + '/catalog/api/books/')
        url.search = new URLSearchParams(params).toString();

        store.dispatch(apiRequest(
            url,
            { },
            BOOK_GET_SOME_SUCCESS, BOOK_GET_SOME_FAILURE)
        )
    }
}

export const bookGetSomeProcessor = (store) => next => action => {
    next(action)
    if (action.type === BOOK_GET_SOME_SUCCESS) {
        function makePretty(book) {
            const authorNames = book.author_names.join(', ');
            book.authorNames = authorNames;
            return book;
        }
        const prettyBooks = action.payload.results.map(makePretty)
        store.dispatch(bookUpdateSome(action.payload))
    }
}

export const bookCheckoutSideEffect = (store) => next => action => {
    next(action)
    if (action.type === BOOK_CHECKOUT) {
        const url = '/catalog/api/copies/checkoutBulk/';
        store.dispatch(apiRequest(
            url,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(action.payload)
            },
            BOOK_CHECKOUT_SUCCESS, BOOK_CHECKOUT_FAILURE)
        )
    }
}


export const bookCheckoutProcessor = ({ dispatch }) => next => action => {
    next(action)
    if (action.type === BOOK_CHECKOUT_SUCCESS) {
        dispatch(bookClearBasket())
        dispatch(bookSetShowModal(false))
        const borrowedTitles = action.payload.map(bookInstance => bookInstance.book.title)
        borrowedTitles.forEach(bookTitle => {
            dispatch(toastUpdateMessages('Checkout success. Enjoy your book', bookTitle, TOAST_TYPE_SUCCESS))
        })
    }
}

export const bookGetBorrowedSideEffect = (store) => next => action => {
    next(action)
    if (action.type === BOOK_GET_BORROWED) {
        const url = '/catalog/api/copies/currentLoans/';
        store.dispatch(apiRequest(
            url,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            BOOK_GET_BORROWED_SUCCESS, BOOK_GET_BORROWED_FAILURE)
        )
    }
}

export const bookGetBorrowedProcessor = ({dispatch}) => next => action => {
    next(action)
    if (action.type === BOOK_GET_BORROWED_SUCCESS) {
        dispatch(bookUpdateBorrowed(action.payload))
    }
    if (action.type === BOOK_GET_BORROWED_FAILURE) {
    }
}


export const bookReturnSideEffect = (store) => next => action => {
    next(action)
    if (action.type === BOOK_RETURN) {
        const url = '/catalog/api/copies/' + action.payload.id + '/returnBook/';
        store.dispatch(apiRequest(
            url,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            },
            BOOK_RETURN_SUCCESS, BOOK_RETURN_FAILURE)
        )
    }
}

export const bookReturnProcessor = ({dispatch}) => next => action => {
    next(action)
    if (action.type === BOOK_RETURN_SUCCESS) {
        dispatch(bookGetBorrowed())
        dispatch(toastUpdateMessages('Return success. Please place your book in the return basket', action.payload.book.title, TOAST_TYPE_SUCCESS))
    }
    if (action.type === BOOK_RETURN_FAILURE) {
    }
}

// process all basket actions as successful as there is no api call, so all front end stuff
export const bookBasketProcessor = ({dispatch}) => next => action => {
    next(action)
    if (action.type === BOOK_ADD_TO_BASKET) {
        dispatch(toastUpdateMessages('Book Added To Basket', action.payload.title, TOAST_TYPE_SUCCESS))
    }
    if (action.type === BOOK_REMOVE_FROM_BASKET) {
        dispatch(toastUpdateMessages('Book Removed Basket', action.payload.title, TOAST_TYPE_SUCCESS))
    }
}


export const bookMiddleware = [
    bookGetSomeSideEffect,
    bookGetSomeProcessor,
    bookCheckoutSideEffect,
    bookCheckoutProcessor,
    bookGetBorrowedProcessor,
    bookGetBorrowedSideEffect,
    bookReturnSideEffect,
    bookReturnProcessor,
    bookBasketProcessor
]