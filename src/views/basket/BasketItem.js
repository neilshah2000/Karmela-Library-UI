import React from 'react'
import {
    CCard,
    CCardFooter,
    CCardHeader,
    CCardBody,
    CLink
} from '@coreui/react'


const BasketItem = ({book, onRemove}) => {

    const removeFromBasketClicked = () => {
        onRemove(book)
    }

    return (
        <CCard accentColor="success">
            <CCardHeader>
                <h5>{book.title}</h5>
            </CCardHeader>
            <CCardBody>
                {book.authorNames}
            </CCardBody>
            <CCardFooter>                
                <CLink onClick={removeFromBasketClicked}>Remove</CLink>
            </CCardFooter>
        </CCard>
    )
}

export default BasketItem
