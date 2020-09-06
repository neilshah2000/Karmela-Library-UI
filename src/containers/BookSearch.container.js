import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookSearch from './../views/books/BookSearch';
import { shelfGetAll } from './../state/shelf.actions'
import { bookGetSome } from './../state/book.actions'
import { getShelfDropDown } from './../state/shelf.selector'

const BookSearchContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // search term that goes to back end
    const [inputText, setInputText] = useState(''); // text in the search input
    const [selectedShelf, setSelectedShelf] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [bookListUpdated, setBookListUpdated] = useState(null) // used to trigger another book search api call when user does checkout, checkin or reserve

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(shelfGetAll())
    }, [dispatch])
    useEffect(() => {
        dispatch(bookGetSome(currentPage, rowsPerPage, searchTerm, selectedShelf))
    }, [dispatch, currentPage, rowsPerPage, searchTerm, selectedShelf])
    const shelves = useSelector(getShelfDropDown)
    const books = useSelector(state => state.books.searchResults.results)
    const totalResults = useSelector(state => state.books.searchResults.count)


    function searchButtonClicked() {
        setSelectedShelf(false)
        setSearchTerm(inputText);
    }

    function onShelfSelected(e) {
        setInputText('');
        setSelectedShelf(parseInt(e.target.value))
    }

    function onSearchTextChange(e) {
        setInputText(e.target.value);
    }

    function onBookUpdated(){
        console.log('bookupdated');
        setBookListUpdated(Math.random());
    }

    const bookSearchProps = {
        searchButtonClicked,
        onSearchTextChange,
        inputText,
        onShelfSelected,
        selectedShelf,
        shelves,
        books,
        onBookUpdated,
        currentPage,
        pageCount: Math.ceil(totalResults / rowsPerPage),
        setCurrentPage,
        totalResults
    }

    return (
        <BookSearch {...bookSearchProps}></BookSearch>
    )
}

export default BookSearchContainer