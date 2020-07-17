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
    CButton,
    CFormGroup,
    CLabel,
    CSelect,
    CForm,
    CCardFooter,
    CSwitch,
    CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useBookFetch } from './../../services/useBookFetch';
import { getShelves } from './../../services/book.service'

const fields = ['title','zoteroId', 'authorNames']


const BookSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // search term that goes to back end
    const [inputText, setInputText] = useState(''); // text in the search input
    const [shelves, setShelves] = useState([]);
    const [selectedShelf, setSelectedShelf] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    // API call to get books. Re-triggered when any of the arguments changes
    const [books, totalResults, pageCount] = useBookFetch(currentPage, rowsPerPage, searchTerm, selectedShelf)

    useEffect(() => {
        (async function fetchShelves(){
            getShelves().then((data) => {
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

    return (
        
        <>
        <CRow>
            <CCol>
            <CCard>
                <CCardHeader>
                    Book Search
                </CCardHeader>
                <CCardBody>
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
                                    <CLabel htmlFor="shelfSelect" class='pt-1'>Shelf</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CSelect custom name="shelfSelect" id="shelfSelect" onChange={onShelfSelected} value={selectedShelf}>
                                        <option disabled selected value='false'> -- select an option -- </option>
                                        {shelves.map((shelf) => {
                                            return <option value={shelf.id}>{shelf.name}</option>
                                        })}
                                    </CSelect>
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        
                        {books.map((book) => {
                            return <CCol xs="12" sm="6" md="4">
                                <CCard accentColor="primary">
                                    <CCardHeader>
                                        <h5>{book.title}</h5>
                                    </CCardHeader>
                                    <CCardBody>
                                        {book.author_names}
                                    </CCardBody>
                                    <CCardFooter>
                                        Copies: {book.copies.length}
                                    </CCardFooter>
                                </CCard>
                            </CCol>
                        })}

                    </CRow>


                    {/* <CDataTable
                        items={books}
                        fields={fields}
                        scopedSlots = {{title: (book) => (
                            <td><Link to={`/bookEdit/${book.id}`}>{book.title}</Link></td>
                        )}}
                        hover
                        striped
                        bordered
                        size="sm"
                        itemsPerPage={rowsPerPage} /> */}
                    <CPagination
                        activePage={currentPage}
                        pages={pageCount}
                        onActivePageChange={setCurrentPage} />
                    <span>{totalResults + ' results'}</span>
                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default BookSearch
