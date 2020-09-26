import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookGetBorrowed, bookReturn } from './../../state/book.actions'
import BorrowedBookCard from './BorrowedBookCard'
import {
    CCol,
    CRow,
} from '@coreui/react'

const MyBorrowed =  () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(bookGetBorrowed())
    }, [dispatch])
    const myBorrowedBooks =  useSelector(state => state.books.borrowed)

    console.log(myBorrowedBooks)

    const onBookReturned = (returnedBook) => {
        dispatch(bookReturn(returnedBook))
    }

    return (
        <>
            <div>My Borrowed</div>
            <CRow>
                {myBorrowedBooks.map((book) => {
                    return <CCol xs="12" sm="6" md="4" key={book.id} >
                        <BorrowedBookCard book={book} onBookReturned={onBookReturned}></BorrowedBookCard>
                    </CCol>
                })}
            </CRow>
        </>
    );
}

export default MyBorrowed;