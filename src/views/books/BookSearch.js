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
import { getBooks } from '../../services/book.service';

const fields = ['title','zoteroId', 'authorNames']


const BookSearch = () => {
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
        const authorNames = book.author_names.join(', ');
        book.authorNames = authorNames;
        return book;
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
                    <span>{resultCount + ' results'}</span>
                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default BookSearch
