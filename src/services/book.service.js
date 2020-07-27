import { buildParams } from './helpers'
import axios from 'axios';


function getBooks(params) {
    let endpoint = '/catalog/api/books/';
    endpoint = buildParams(endpoint, params);
    return axios.get(endpoint)
        .then(response => {return response.data})
}

function getBook(bookId) {
    let endpoint = '/catalog/api/books/' + bookId;
    return axios.get(endpoint)
        .then(response => {return response.data})
}

function createBook(book) {
    const endpoint = '/catalog/api/books/';
    const body = JSON.stringify(book);
    return axios.post(endpoint, body)
        .then(response => {return response.data})
}

function updateBook(book) {
    let endpoint = '/catalog/api/books/' + book.id + '/';
    const body = JSON.stringify(book);
    return axios.put(endpoint, body)
        .then(response => {return response.data})
}

function getAuthors() {
    let endpoint = '/catalog/api/authors/';
    return axios.get(endpoint)
        .then(response => {return response.data})
        .then((result) => result.map((author) => { // add the fields needed for the select component
            author.value = author.id;
            author.key = author.id;
            author.label = author.first_name + ' ' + author.last_name;
            return author;
        }));
}

function getShelves() {
    let endpoint = '/catalog/api/shelves/';
    return axios.get(endpoint)
        .then(response => {return response.data})
}

function checkoutBook(bookInstanceId) {
    let endpoint = '/catalog/api/copies/' + bookInstanceId + '/checkout/';
    return axios.post(endpoint)
        .then(response => {return response.data})
}

function reserveBook(bookInstanceId) {
    let endpoint = '/catalog/api/copies/' + bookInstanceId + '/reserve/';
    return axios.post(endpoint)
        .then(response => {return response.data})
}

export {
    getBooks,
    createBook,
    getAuthors,
    getBook,
    updateBook,
    getShelves,
    checkoutBook,
    reserveBook
}