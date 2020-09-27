import {API_REQUEST} from "./api.action";

// this middleware care only for API calls
export const api = ({dispatch, getState}) => next => action => {

    if(action.type === API_REQUEST) {
        const { config, onSuccess, onError } = action.meta;

        // add auth token if user is logged in
        const loggedIn = getState().login.loggedIn
        if (loggedIn) {
            const token = getState().login.authToken
            if (config.headers) {
                config.headers.Authorization = 'Token ' + token
            } else {
                config.headers = {
                    Authorization: 'Token ' + token
                }
            }
        }

        fetch(action.payload, config)
        .then(response => {
            if(!response.ok) {
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    return Promise.reject(response.statusText)
                }
                return new Promise((resolve, reject) => {
                    response.json().then((json) => {
                        reject(json)
                    })
                })
            }
            return response
        })
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // we could try and parse response.text() here but im not sure if that could throw an error in certain cases
                // ...so lets just return ''
                return Promise.resolve('')
            }
            return response.json();
        })
        .then((data) => {
            return dispatch({ type: onSuccess, payload: data, meta: action })
        })
        .catch(error => {
            return dispatch({ type: onError, payload: error, meta: action })
        })
    }
    return next(action)
};