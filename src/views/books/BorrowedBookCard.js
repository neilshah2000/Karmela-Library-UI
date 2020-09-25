import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CLink,
} from '@coreui/react'
// import { checkoutBook, reserveBook } from './../../services/book.service';
import { bookAddToBasket } from '../../state/book.actions'
import { useDispatch } from 'react-redux'

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