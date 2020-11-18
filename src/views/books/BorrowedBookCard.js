import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CLink,
} from '@coreui/react'

const BorrowedBookCard = ({ book, onBookReturned }) => {
    const authorNames = book.book.author
                            .map(author => author.first_name + ' ' + author.last_name)
                            .join(', ')
    return (
        <CCard accentColor="primary">
            <CCardHeader>
                <h5>{book.book.title}</h5>
            </CCardHeader>
            <CCardBody>
                {authorNames}
            </CCardBody>
            <CCardFooter>                
                <CLink onClick={() => onBookReturned(book)}>Return</CLink>
            </CCardFooter>
        </CCard>
    )
}

export default BorrowedBookCard