import React, { useState, useEffect } from 'react'
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
import { getBooks } from '../../services/book.service';

const fields = ['title','zoteroId', 'authorNames']


const BookList = () => {
    const [data, setData] = useState({ books: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // search term that goes to back end
    const [inputText, setInputText] = useState(''); // text in the search input
    const [resultCount, setResultCount] = useState(0);
    const rowsPerPage = 20;

    useEffect(() => {
        (async function fetchData() {
            const params = {
                search: searchTerm,
                limit: rowsPerPage,
                offset: (rowsPerPage * currentPage) - rowsPerPage
            }
            const result = await getBooks(params)
            setData({
                books: result.results.map(makePretty)
            });
            setResultCount(result.count)
            setPageCount(Math.ceil(result.count / rowsPerPage))
        })();
    }, [currentPage, searchTerm]);

    function makePretty(book) {
        let authorNames = '';
        book.author.forEach((auth) => {
            let name = '';
            if (auth.first_name) {
                name = name + auth.first_name + ' ';
            }
            if (auth.last_name) {
                name = name + auth.last_name;
            }
            authorNames = authorNames + name + ', '
        });
        book.authorNames = authorNames;
        return book
    }

    function searchButtonClicked() {
        setSearchTerm(inputText);
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
                        <CInput placeholder="Title or abstract" onChange={onSearchTextChange}/>
                    </CInputGroup>
                    <CDataTable
                        items={data.books}
                        fields={fields}
                        hover
                        striped
                        bordered
                        size="sm"
                        itemsPerPage={rowsPerPage} />
                    <CPagination
                        activePage={currentPage}
                        pages={pageCount}
                        onActivePageChange={setCurrentPage} />
                    <span>{resultCount + ' results'}</span>
                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default BookList
