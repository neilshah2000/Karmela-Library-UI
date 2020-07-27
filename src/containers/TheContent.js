import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import BookSearch from './../views/books/BookSearch';
import BookEditCreate from './../views/books/BookEditCreate'

// routes config
// import routes from '../routes'
import Spinner from './Spinner';
import Toast from './Toast';
import PrivateRoute from './../views/books/PrivateRoute';
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Toast></Toast>
        <Spinner></Spinner>
        <Suspense fallback={loading}>
          <Switch>
            <PrivateRoute exact path="/bookSearch" name="Book Search" component={BookSearch} />
            <PrivateRoute exact path="/book" name="Book Create" component={BookEditCreate} />
            <PrivateRoute exact path="/bookEdit/:id" name="Book Detail" component={BookEditCreate} />
            <Redirect from="/" to="/bookSearch" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
