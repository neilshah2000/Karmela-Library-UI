export default function getBooks() {
    const endpoint = '/catalog/api/books/?place=Zarautz&limit=10&offset=10'
    return fetch(endpoint)
        .then(response => {return response.json()})
}
