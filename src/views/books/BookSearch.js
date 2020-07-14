import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CPagination,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useBookFetch } from './../../services/useBookFetch';

const fields = ['title','zoteroId', 'authorNames']


const BookSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // search term that goes to back end
    const [inputText, setInputText] = useState(''); // text in the search input
    const [shelf, setShelf] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    // API call to get books. Re-triggered when any of the arguments changes
    const [books, pageCount] = useBookFetch(currentPage, rowsPerPage, searchTerm, shelf)


    function searchButtonClicked() {
        setShelf(null)
        setSearchTerm(inputText);
    }

    function onShelfUpdated(newShelf) {
        setInputText('');
        setShelf(4)
    }

    function onSearchTextChange(e) {
        setInputText(e.target.value);
    }

    return (
        
        <>
        <CRow>
            <CCol>
            <CCard>
                <CCardHeader>
                    Book Search
                </CCardHeader>
                <CCardBody>
                    <CInputGroup className={'mb-4'}>
                        <CInputGroupPrepend>
                            <CButton onClick={searchButtonClicked} type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                        </CInputGroupPrepend>
                        <CInput placeholder="Title or abstract" onChange={onSearchTextChange} value={inputText}/>
                    </CInputGroup>
                    <CDataTable
                        items={books}
                        fields={fields}
                        scopedSlots = {{title: (book) => (
                            <td><Link to={`/bookEdit/${book.id}`}>{book.title}</Link></td>
                        )}}
                        hover
                        striped
                        bordered
                        size="sm"
                        itemsPerPage={rowsPerPage} />
                    <CPagination
                        activePage={currentPage}
                        pages={pageCount}
                        onActivePageChange={setCurrentPage} />
                    <span>{books.length + ' results'}</span>
                    <CButton onClick={onShelfUpdated} type="button" color="primary">Shelf</CButton>
                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default BookSearch
