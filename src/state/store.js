import { createStore, applyMiddleware, combineReducers } from 'redux'
import { uiReducer } from './ui.reducer'
import { logger } from './logger.middleware'
import { loginMiddleware } from './login.middleware'
import { loginReducer } from './login.reducer'
import { api } from './api.middleware'
import { toastMiddleware } from './toast.middleware'
import { toastReducer } from './toast.reducer'
import { errorThrownProcessor } from './errors.middleware'
import { userReducer } from './user.reducer'
import { userMiddleware } from './user.middleware'
import { shelfMiddleware } from './shelf.middleware'
import { shelfReducer } from './shelf.reducer'
import { bookReducer } from './book.reducer'
import { bookMiddleware } from './book.middleware'

const reducers = combineReducers({
    ui  : uiReducer,
    login: loginReducer,
    toasts: toastReducer,
    user: userReducer,
    shelf: shelfReducer,
    books: bookReducer
});

const myMiddleware = applyMiddleware(
    ...loginMiddleware,
    logger,
    api,
    ...toastMiddleware,
    ...userMiddleware,
    ...shelfMiddleware,
    ...bookMiddleware,
    errorThrownProcessor,
)

const store = createStore(reducers, myMiddleware)
export default store