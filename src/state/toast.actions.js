export const TOAST_UPDATE_MESSAGES = '[Toast] update messages'

export const toastUpdateMessages = (title, message, type) => ({
    type: TOAST_UPDATE_MESSAGES,
    payload: { title, message, type }
});