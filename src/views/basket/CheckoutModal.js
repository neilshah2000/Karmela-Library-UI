import React from 'react'
import {
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CListGroup,
    CListGroupItem,
    CButton
} from '@coreui/react'

const CheckoutModal = ({ show, onClose, books, onConfirm }) => {


    return (
        <CModal show={show} onClose={onClose}>
            <CModalHeader closeButton>Checkout</CModalHeader>
            <CModalBody>

                {books.map((book,i) => (
                    <CListGroup key={i}>
                        <CListGroupItem>
                            <h5>{book.title}</h5>
                            <div>
                                {Date.now()}
                            </div>
                        </CListGroupItem>
                    </CListGroup>
                ))}

            </CModalBody>
            <CModalFooter>
                <CButton onClick={onConfirm} color="primary">Confirm Checkout</CButton>
                <CButton color="secondary" onClick={onClose}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default CheckoutModal
