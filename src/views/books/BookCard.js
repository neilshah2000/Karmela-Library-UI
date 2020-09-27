import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CLink,
} from '@coreui/react'
// import { checkoutBook, reserveBook } from './../../services/book.service';
import { bookAddToBasket } from './../../state/book.actions'
import { useDispatch } from 'react-redux'

const BookCard = (props) => {
    const dispatch = useDispatch()

    // function checkoutClicked() {
    //     const bookInstanceId = props.book.copies[0].id;
    //     checkoutBook(bookInstanceId).then((data) => {
    //         props.updated();
    //         const newState = dispatch({type: 'add-toast', toast: data})
    //     });
    // }

    // function reserveClicked() {
    //     const bookInstanceId = props.book.copies[0].id;
    //     reserveBook(bookInstanceId).then((data) => {
    //         console.log(data);
    //         props.updated();
    //         const newState = dispatch({type: 'add-toast', toast: data})
    //     });
    // }

    function addToBasketClicked() {
        dispatch(bookAddToBasket(props.book))
    }

    function getCopiesCount() {
        return props.book.copies.length;
    }

    function getAvailableCount() {
        return props.book.copies.filter(copy => copy.status === 'a').length;
    }

    function noCopiesAvailable() {
        return getAvailableCount() === 0
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
                <div className="d-flex justify-content-between">
                    <div>
                        <div>Copies: {getCopiesCount()}</div>
                        <div>Available: {getAvailableCount()}</div>
                    </div>
                    <div>
                        {/* <div><CLink onClick={checkoutClicked}>Checkout</CLink></div>
                        <div><CLink onClick={reserveClicked}>Reserve</CLink></div> */}
                        <div><CLink disabled={noCopiesAvailable()} className={(noCopiesAvailable() ? 'disabled-link' : null)} onClick={addToBasketClicked}>Add to Basket</CLink></div>
                    </div>
                </div> 
            </CCardFooter>
        </CCard>
    )
}

export default BookCard