import React, { useState } from 'react'
import {
    CFormGroup,
    CLabel,
    CTextarea,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CInput,
    CCardFooter,
    CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { createBook } from '../../services/book.service';

const BookCreate = () => {
    const emptyBook = {
        title: '',
        titleShort: '',
        isbn: '',
        callNumber: '',
        language: '',
        pages: '',
        publisher: '',
        publisherPlace: '',
        issued: '',
        collectionTitle: '',
        place: '',
        abstract: ''
    }
    const [bookFields, setBookFields] = useState(emptyBook);

    function onFormInputChange(e) {
        const field = e.target.id;
        const value = e.target.value;
        let myBook = JSON.parse(JSON.stringify(bookFields))
        myBook[field] = value;
        setBookFields(myBook);
    }

    function bookSubmitClicked() {
        createBook(bookFields).then((res) => {
            console.log(res);
        })
    }

    function test() {
        console.log('test')
    }

    return (
        
        <>
        <CRow>
            <CCol xs="12" sm="6">
                <CCard>
                    <CCardHeader>
                    Create Book
                    </CCardHeader>

                    <CCardBody>
                        <CFormGroup>
                            <CLabel htmlFor="title">Title</CLabel>
                            <CInput id="title" placeholder="Book title" onChange={onFormInputChange} value={bookFields.title}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="titleShort">Short Title</CLabel>
                            <CInput id="titleShort" placeholder="Short title" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="isbn">ISBN</CLabel>
                            <CInput id="isbn" placeholder="978-1-86197-876-9" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="callNumber">Call Number</CLabel>
                            <CInput id="callNumber" placeholder="" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="language">Language</CLabel>
                            <CInput id="language" placeholder="es" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="pages">Pages</CLabel>
                            <CInput id="pages" placeholder="" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="publisher">Publisher</CLabel>
                            <CInput id="publisher" placeholder="" onChange={onFormInputChange} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="publisherPlace">Publisher Place</CLabel>
                            <CInput id="publisherPlace" placeholder="" onChange={onFormInputChange} />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="issued">Issued</CLabel>
                            <CInput id="issued" placeholder="" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="collectionTitle">Collection Title</CLabel>
                            <CInput id="collectionTitle" placeholder="" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="place">Place</CLabel>
                            <CInput id="place" placeholder="" onChange={onFormInputChange}/>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="abstract">Abstract</CLabel>
                            <CTextarea 
                                name="abstract" 
                                id="abstract" 
                                rows="10"
                                placeholder="Content..." onChange={onFormInputChange}/>
                        </CFormGroup>
                    </CCardBody>

                    <CCardFooter>
                        <span className='mr-2'>
                            <CButton type="submit" size="sm" color="primary"  onClick={bookSubmitClicked}>
                                <CIcon name="cil-scrubber"/> Submit
                            </CButton>
                        </span>
                        <CButton type="reset" size="sm" color="danger" onClick={test}>
                            <CIcon name="cil-ban"/> Reset
                        </CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
            <CCol xs="12" sm="6">
                {JSON.stringify(bookFields)}
            </CCol>
        </CRow>
        
        </>
    )
}

export default BookCreate
