import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select';
import AuthorList from './AuthorList';
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
import { createBook, updateBook, getAuthors, getBook } from '../../services/book.service';

const BookEditCreate = (props) => {
    const params = useParams();
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
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    useEffect(() => {
        (async function getData(){
            if (params.id) {
                let [authorData, bookData] = await Promise.all([getAuthors(), getBook(params.id)]);
                setBookFields(bookData);
                setAuthors(authorData);
                const originalSelectedAuthors = authorData.filter((myAuth) => {
                    return bookData.author.includes(myAuth.id);
                })
                setSelectedAuthors(originalSelectedAuthors);
            } else {
                const authorData = await getAuthors();
                setAuthors(authorData);
            }
        })();
    }, [params]);

    function onAuthorSelectChange(newSelected) {
        setSelectedAuthors(newSelected);
    }

    function onFormInputChange(e) {
        const field = e.target.id;
        const value = e.target.value;
        let myBook = JSON.parse(JSON.stringify(bookFields))
        myBook[field] = value;
        setBookFields(myBook);
    }

    function bookSubmitClicked() {
        bookFields.author = selectedAuthors.map((auth) => {
            return auth.key;
        });
        if(params.id) {
            updateBook(bookFields).then((res) => {
                console.log(res);
            });
        } else {
            createBook(bookFields).then((res) => {
                console.log(res);
            })
        }
    }

    function test() {
        console.log('test')
    }

    return (
        <>
        <CRow>
            <CCol>
                <h2 className='mb-4'>Create Book</h2>
                <CFormGroup>
                    <CLabel htmlFor="title">Authors</CLabel>
                    <Select
                        components={{ MenuList: AuthorList }}
                        onChange={onAuthorSelectChange}
                        value={selectedAuthors}
                        options={authors}
                        isMulti={true}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="title">Title</CLabel>
                    <CInput id="title" placeholder="Book title" onChange={onFormInputChange} value={bookFields.title || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="titleShort">Short Title</CLabel>
                    <CInput id="titleShort" placeholder="Short title" onChange={onFormInputChange} value={bookFields.titleShort || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="isbn">ISBN</CLabel>
                    <CInput id="isbn" placeholder="978-1-86197-876-9" onChange={onFormInputChange} value={bookFields.isbn || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="callNumber">Call Number</CLabel>
                    <CInput id="callNumber" placeholder="" onChange={onFormInputChange} value={bookFields.callNumber || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="language">Language</CLabel>
                    <CInput id="language" placeholder="es" onChange={onFormInputChange} value={bookFields.language || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="pages">Pages</CLabel>
                    <CInput id="pages" placeholder="" onChange={onFormInputChange} value={bookFields.pages || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="publisher">Publisher</CLabel>
                    <CInput id="publisher" placeholder="" onChange={onFormInputChange} value={bookFields.publisher || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="publisherPlace">Publisher Place</CLabel>
                    <CInput id="publisherPlace" placeholder="" onChange={onFormInputChange} value={bookFields.publisherPlace || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="issued">Issued</CLabel>
                    <CInput id="issued" placeholder="" onChange={onFormInputChange} value={bookFields.issued || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="collectionTitle">Collection Title</CLabel>
                    <CInput id="collectionTitle" placeholder="" onChange={onFormInputChange} value={bookFields.collectionTitle || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="place">Place</CLabel>
                    <CInput id="place" placeholder="" onChange={onFormInputChange} value={bookFields.place || ''}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="abstract">Abstract</CLabel>
                    <CTextarea 
                        name="abstract" 
                        id="abstract" 
                        rows="10"
                        placeholder="Content..." onChange={onFormInputChange} value={bookFields.abstract || ''}/>
                </CFormGroup>
            </CCol>
        </CRow>
        <CRow>
            <CCol>
                <span className='mr-2'>
                    <CButton type="submit" size="sm" color="primary"  onClick={bookSubmitClicked}>
                        <CIcon name="cil-scrubber"/> Submit
                    </CButton>
                </span>
                <CButton type="reset" size="sm" color="danger" onClick={test}>
                    <CIcon name="cil-ban"/> Reset
                </CButton>
            </CCol>
        </CRow>
        </>
    )
}

export default BookEditCreate
