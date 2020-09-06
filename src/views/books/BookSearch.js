import React from 'react'
import {
    CCol,
    CRow,
    CPagination,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CButton,
    CFormGroup,
    CLabel,
    CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import BookCard from './BookCard';

const BookSearch = ({ searchButtonClicked, onSearchTextChange, inputText, onShelfSelected, selectedShelf, shelves,
    books, onBookUpdated, currentPage, pageCount, setCurrentPage, totalResults}) => {
        
    return (
        <CRow>
            <CCol>
            <h2 className='mb-4'>Book Search</h2>
                <CRow>
                    <CCol sm='4'>
                        <CInputGroup className={'mb-4'}>
                            <CInputGroupPrepend>
                                <CButton onClick={searchButtonClicked} type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                            </CInputGroupPrepend>
                            <CInput placeholder="Title or abstract" onChange={onSearchTextChange} value={inputText}/>
                        </CInputGroup>
                    </CCol>
                    <CCol sm='4'></CCol>
                    <CCol sm='4'>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="shelfSelect" className='pt-1'>Shelf</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CSelect custom name="shelfSelect" id="shelfSelect" onChange={onShelfSelected} value={selectedShelf}>
                                    {shelves.map((shelf) => {
                                        return <option value={shelf.id} key={shelf.id}>{shelf.name}</option>
                                    })}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    
                    {books.map((book) => {
                        return <CCol xs="12" sm="6" md="4" key={book.id} >
                            <BookCard book={book} updated={onBookUpdated}></BookCard>
                        </CCol>
                    })}

                </CRow>

                <CPagination
                    activePage={currentPage}
                    pages={pageCount}
                    onActivePageChange={setCurrentPage} />
                <span>{totalResults + ' results'}</span>
            </CCol>
        </CRow>
    )
}

export default BookSearch
