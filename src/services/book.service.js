import Cookies from 'js-cookie';

function getBooks(params) {
    let endpoint = '/catalog/api/books/';
    endpoint = buildParams(endpoint, params);
    return fetch(endpoint)
        .then(response => {return response.json()})
}

function getBook(bookId) {
    let endpoint = '/catalog/api/books/' + bookId;
    return fetch(endpoint)
        .then(response => {return response.json()})
}

function createBook(book) {
    let endpoint = '/catalog/api/books/';
    let request = {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': Cookies.get('csrftoken')
        }
    }
    return fetch(endpoint, request)
        .then(response => {return response.json()})
}

function updateBook(book) {
    let endpoint = '/catalog/api/books/' + book.id + '/';
    let request = {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': Cookies.get('csrftoken')
        }
    }
    return fetch(endpoint, request)
        .then(response => {return response.json()})
}

function getAuthors() {
    let endpoint = '/catalog/api/authors/';
    return fetch(endpoint)
        .then(response => {return response.json()})
        .then((result) => result.map((author) => { // add the fields needed for the select component
            author.value = author.id;
            author.key = author.id;
            author.label = author.first_name + ' ' + author.last_name;
            return author;
        }));
}

function getShelves() {
    let endpoint = '/catalog/api/shelves/';
    return fetch(endpoint)
        .then(response => {return response.json()})
}

function checkoutBook(bookInstanceId) {
    let endpoint = '/catalog/api/copies/' + bookInstanceId + '/checkout/';
    let request = {
        method: 'POST'
    }
    return fetch(endpoint, request)
        .then(response => {return response.json()})
}


function buildParams(endpoint, params) {
    const url = window.location.origin + endpoint;
    console.log(url);
    let builtUrl = new URL(url);
    Object.keys(params).forEach((key) => {
        builtUrl.searchParams.append(key, params[key])
    });
    return builtUrl;
}

export {
    getBooks,
    createBook,
    getAuthors,
    getBook,
    updateBook,
    getShelves,
    checkoutBook
}