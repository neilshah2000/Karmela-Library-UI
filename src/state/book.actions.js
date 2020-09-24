export const BOOK_GET_SOME = '[Book] get some'
export const BOOK_GET_SOME_SUCCESS = '[Book] get some success'
export const BOOK_GET_SOME_FAILURE = '[Book] get some failure'
export const BOOK_UPDATE_SOME = '[Book] update some'
export const BOOK_ADD_TO_BASKET = '[Book] add to basket'
export const BOOK_REMOVE_FROM_BASKET = '[Book] remove from basket'

export const BOOK_CHECKOUT = '[Book] checkout'
export const BOOK_CHECKOUT_SUCCESS = '[Book] checkout success'
export const BOOK_CHECKOUT_FAILURE = '[Book] checkout failure'

export const BOOK_GET_BORROWED = '[Book] get borrowed'
export const BOOK_GET_BORROWED_SUCCESS = '[Book] get borrowed success'
export const BOOK_GET_BORROWED_FAILURE = '[Book] get borrowed failure'

///// user defined actions

export const bookGetSome = (currentPage, rowsPerPage, searchTerm, shelf) => ({
    type: BOOK_GET_SOME,
    payload: {
        currentPage,
        rowsPerPage,
        searchTerm,
        shelf
    }
});

export const bookAddToBasket = (book) => ({
    type: BOOK_ADD_TO_BASKET,
    payload: book
});

export const bookRemoveFromBasket = (book) => ({
    type: BOOK_REMOVE_FROM_BASKET,
    payload: book
});

export const bookCheckout = (bookInstances) => ({
    type: BOOK_CHECKOUT,
    payload: bookInstances
});


///// system actions

export const bookUpdateSome = (books) => ({
    type: BOOK_UPDATE_SOME,
    payload: books
});