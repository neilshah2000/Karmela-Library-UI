export const SHELF_GET_ALL = '[Shelf] get all'
export const SHELF_GET_ALL_SUCCESS = '[Shelf] get all success'
export const SHELF_GET_ALL_FAILURE = '[Shelf] get all failure'
export const SHELF_UPDATE_ALL = '[Shelf] update all'

///// user defined actions

export const shelfGetAll = () => ({
    type: SHELF_GET_ALL,
});


///// system actions

export const shelfUpdateAll = (shelves) => ({
    type: SHELF_UPDATE_ALL,
    payload: shelves
});