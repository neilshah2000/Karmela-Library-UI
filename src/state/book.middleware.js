import { BOOK_GET_SOME, BOOK_GET_SOME_SUCCESS, BOOK_GET_SOME_FAILURE, BOOK_CHECKOUT, BOOK_CHECKOUT_SUCCESS, BOOK_CHECKOUT_FAILURE, 
    bookUpdateSome } from './book.actions'
import { apiRequest } from './api.action'

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
        // const url = '/catalog/api/copies/' + action.payload[0].id + '/checkoutBulk/';
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


export const bookMiddleware = [
    bookGetSomeSideEffect,
    bookGetSomeProcessor,
    bookCheckoutSideEffect
]