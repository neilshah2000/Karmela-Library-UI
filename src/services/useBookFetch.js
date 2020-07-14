import { getBooks } from './book.service';
import { useState, useEffect } from 'react';

const useBookFetch = (currentPage, rowsPerPage, searchTerm, shelf) => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    function makePretty(book) {
        const authorNames = book.author_names.join(', ');
        book.authorNames = authorNames;
        return book;
    }

    useEffect(() => {
        (async function fetchData() {
            const params = {
                limit: rowsPerPage,
                offset: (rowsPerPage * currentPage) - rowsPerPage
            }
            // Add either the shelf or search parameter not both
            // shelf has to be null for string search to work
            if (shelf === null) {
                params.search = searchTerm;
            } else {
                params.shelf = shelf
            }
            const result = await getBooks(params)
            setData(result.results.map(makePretty));
            setPageCount(Math.ceil(result.count / rowsPerPage))
        })();
    }, [currentPage, rowsPerPage, searchTerm, shelf]);

    return [ data, pageCount ];
};

export {
    useBookFetch
}