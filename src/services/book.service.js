function getBooks(params) {
    let endpoint = '/catalog/api/books/';
    endpoint = buildParams(endpoint, params);
    return fetch(endpoint)
        .then(response => {return response.json()})
}

function createBook(book) {
    let endpoint = '/catalog/api/books/';
    let request = {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(endpoint, request)
        .then(response => {return response.json()})
}


function buildParams(endpoint, params) {
    const url = 'http://' + window.location.host + endpoint;
    console.log(url);
    let builtUrl = new URL(url);
    Object.keys(params).forEach((key) => {
        builtUrl.searchParams.append(key, params[key])
    });
    return builtUrl;
}

export {
    getBooks,
    createBook
}