import axios from 'axios';
import store from './../store';

export default function configureAxios() {
    addAuthToken(); // add header straight away if it exists
    // addAuthTokenChangeListener(); // add header when token changes
    addSpinnerState();
}

function addAuthToken() {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        console.log('auth token added ' + token)
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
    }
}

// function addAuthTokenChangeListener() {
//     window.addEventListener('storage', addAuthToken);
// }

function addSpinnerState() {
    axios.interceptors.request.use((config) => {
        store.dispatch({type: 'show-spinner'})
        return config;
    })
    axios.interceptors.response.use((response) => {
        store.dispatch({type: 'hide-spinner'})
        return response;
    }, (error) => {
        store.dispatch({type: 'hide-spinner'})
        return Promise.reject(error);
    })
}