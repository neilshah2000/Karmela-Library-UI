import { getBooks } from './book.service';
import { useState, useEffect } from 'react';

const useBookFetch = (currentPage, rowsPerPage, searchTerm, shelf) => {
    const [data, setData] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
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
            if (!shelf) {
                params.search = searchTerm;
            } else {
                params.shelf = shelf
            }
            const result = await getBooks(params)
            setData(result.results.map(makePretty));
            setTotalResults(result.count);
            setPageCount(Math.ceil(result.count / rowsPerPage))
        })();
    }, [currentPage, rowsPerPage, searchTerm, shelf]); // Dependency array. API call will be re-triggered on any change

    return [ data, totalResults, pageCount ];
};

export {
    useBookFetch
}