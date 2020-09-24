import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CLabel,
    CSelect, CListGroup, CListGroupItem, CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import BasketItem from './BasketItem'
import { bookRemoveFromBasket, bookCheckout } from './../../state/book.actions'
import CheckoutModal from './CheckoutModal'


const Basket = () => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const basketItems = useSelector(state => state.books.basket)

    const removeFromBasketClicked = (book) => {
        console.log(book)
        dispatch(bookRemoveFromBasket(book))
    }

    const onClose = () => {
        setShowModal(false)
    }

    const onConfirmCheckout = () => {
        const bookInstances = []
        basketItems.forEach(book => {
            if (book.copies.length > 0) {
                bookInstances.push(book.copies[0])
            }
        })
        dispatch(bookCheckout(bookInstances))
    }

    const checkoutModalProps = {
        show: showModal,
        onClose,
        books: basketItems,
        onConfirm: onConfirmCheckout
    }

    return (
        <CRow>
            <CCol>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mb-4'>Basket</div>
                    <CButton onClick={() => setShowModal(true)} type="button" color="primary" disabled={basketItems.length === 0}>Checkout</CButton>
                </div>
                <CRow>
                    
                    {basketItems.map((book,i) => {
                        return <CCol xs="12" sm="6" md="4" key={i} >
                            <BasketItem book={book} onRemove={removeFromBasketClicked}></BasketItem>
                        </CCol>
                    })}

                </CRow>
                {basketItems.length === 0 && <CRow>
                    Basket is empty
                </CRow>}

                <CheckoutModal {...checkoutModalProps}></CheckoutModal>
            </CCol>
        </CRow>
    )
}

export default Basket
