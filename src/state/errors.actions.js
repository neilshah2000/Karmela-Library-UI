export const ERRORS_THROWN = '[Errors] thrown'


//////// internal actions

export const errorsThrown = (error) => ({
    type: ERRORS_THROWN,
    payload: error
});

