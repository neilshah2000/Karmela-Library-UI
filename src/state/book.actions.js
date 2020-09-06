export const BOOK_GET_SOME = '[Book] get some'
export const BOOK_GET_SOME_SUCCESS = '[Book] get some success'
export const BOOK_GET_SOME_FAILURE = '[Book] get some failure'
export const BOOK_UPDATE_SOME = '[Book] update some'

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


///// system actions

export const bookUpdateSome = (books) => ({
    type: BOOK_UPDATE_SOME,
    payload: books
});