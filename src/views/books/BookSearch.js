import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
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
import { useBookFetch } from './../../services/useBookFetch';
import { getShelves } from './../../services/book.service'
import BookCard from './BookCard';
import { logUserOut } from './../../services/auth.service';

const BookSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // search term that goes to back end
    const [inputText, setInputText] = useState(''); // text in the search input
    const [shelves, setShelves] = useState([]);
    const [selectedShelf, setSelectedShelf] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [bookListUpdated, setBookListUpdated] = useState(null) // used to trigger another book search api call when user does checkout, checkin or reserve

    // API call to get books. Re-triggered when any of the arguments changes
    const [books, totalResults, pageCount] = useBookFetch(currentPage, rowsPerPage, searchTerm, selectedShelf, bookListUpdated)

    useEffect(() => {
        (async function fetchShelves(){
            getShelves().then((data) => {
                // add blank option
                data.push({
                    id: false,
                    name: ' -- select an option -- '
                })
                setShelves(data);
            });
        })();
    }, []);


    function searchButtonClicked() {
        setSelectedShelf(false)
        setSearchTerm(inputText);
    }

    function onShelfSelected(e) {
        setInputText('');
        setSelectedShelf(parseInt(e.target.value))
    }

    function onSearchTextChange(e) {
        setInputText(e.target.value);
    }

    function onBookUpdated(){
        console.log('bookupdated');
        setBookListUpdated(Math.random());
    }

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
                <CButton onClick={logUserOut}>logout</CButton>
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
