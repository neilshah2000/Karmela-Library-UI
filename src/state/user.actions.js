export const USER_GET_ME = '[User] get me'
export const USER_GET_ME_SUCCESS = '[User] get me success'
export const USER_GET_ME_FAILURE = '[User] get me failure'
export const USERS_UPDATE_ME = '[User] update me'

export const USER_REGISTER = '[User] register'
export const USER_REGISTER_SUCCESS = '[User] register success'
export const USER_REGISTER_FAILURE = '[User] register failure'

export const USER_ACTIVATE = '[User] activate'
export const USER_ACTIVATE_SUCCESS = '[User] activate success'
export const USER_ACTIVATE_FAILURE = '[User] activate failure'

export const USER_FORGOT_PASSWORD = '[User] forgot password'
export const USER_FORGOT_PASSWORD_SUCCESS = '[User] forgot password success'
export const USER_FORGOT_PASSWORD_FAILURE = '[User] forgot password failure'

export const USER_RESET_PASSWORD = '[User] reset password'
export const USER_RESET_PASSWORD_SUCCESS = '[User] forgot reset success'
export const USER_RESET_PASSWORD_FAILURE = '[User] forgot reset failure'

export const USER_UPDATE_MESSAGE = '[User] update message'

//////// users defined actions

export const userGetMe = () => ({
    type: USER_GET_ME
});

export const userRegister = (email, password) => ({
    type: USER_REGISTER,
    payload: {
        email,
        password
    }
});

export const userUpdateMessage = (message) => ({
    type: USER_UPDATE_MESSAGE,
    payload: message
});

export const userActivate = (uid, token) => ({
    type: USER_ACTIVATE,
    payload: {
        uid,
        token
    }
});

export const userForgotPassword = (email) => ({
    type: USER_FORGOT_PASSWORD,
    payload: email
});

export const userResetPassword = (uid, token, password) => ({
    type: USER_RESET_PASSWORD,
    payload: {
        uid,
        token,
        password
    }
});

//////// internal actions

export const userUpdateMe = (user) => ({
    type: USERS_UPDATE_ME,
    payload: user
});

