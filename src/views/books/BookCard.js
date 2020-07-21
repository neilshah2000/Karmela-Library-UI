import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CLink
} from '@coreui/react'
import { checkoutBook } from './../../services/book.service';

const BookCard = (props) => {
    
    function checkoutClicked() {
        const bookInstanceId = props.book.copies[0].id;
        checkoutBook(bookInstanceId).then((data) => {
            console.log(data);
        });
    }

    return (
        <CCard accentColor="primary">
            <CCardHeader>
                <h5>{props.book.title}</h5>
            </CCardHeader>
            <CCardBody>
                {props.book.author_names}
            </CCardBody>
            <CCardFooter>
                Copies: {props.book.copies.length}
                <CLink onClick={checkoutClicked}>Checkout</CLink>
            </CCardFooter>
        </CCard>
    )
}

export default BookCard