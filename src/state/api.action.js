export const API_REQUEST = '[app] API Request';

export const apiRequest = (url, config, onSuccess, onError, successData) => ({
    type: API_REQUEST,
    payload: url,
    meta: { config, onSuccess, onError, successData }
});