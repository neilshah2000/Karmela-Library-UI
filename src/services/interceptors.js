import store from './../store';

// Set up interceptor on all fetch API calls
// Increments redux spinner state when api is called
// Decrements redux spinner state again when it is returned
function wrapSpinners() {
    const originalFetch = window.fetch;
    window.fetch = function() {
        store.dispatch({type: 'show-spinner'})
        return originalFetch.apply(this, arguments)
            .then((res) => {
                store.dispatch({type: 'hide-spinner'})
                return res;
            })
    }
};

function addAuthHeader() {
    const originalFetch = window.fetch;
    window.fetch = function() {
        // if there is no second argument to fetch, add headers and add second argument

        // if there is a second argument to fetch, add the headers to it
        return originalFetch.apply(this, arguments)
    }
}