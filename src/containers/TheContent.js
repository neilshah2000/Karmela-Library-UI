import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import BookSearchContainer from './BookSearch.container'
import BookEditCreate from './../views/books/BookEditCreate'
import Basket from './../views/basket/Basket'
import MyBorrowed from './../views/books/MyBorrowed'
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
            <PrivateRoute exact path="/bookSearch" name="Book Search" component={BookSearchContainer} />
            <PrivateRoute exact path="/book" name="Book Create" component={BookEditCreate} />
            <PrivateRoute exact path="/bookEdit/:id" name="Book Detail" component={BookEditCreate} />
            <PrivateRoute exact path="/basket" name="Basket" component={Basket} />
            <PrivateRoute exact path="/myBorrowed" name="My Borrowed" component={MyBorrowed} />
            <Redirect from="/" to="/bookSearch" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
