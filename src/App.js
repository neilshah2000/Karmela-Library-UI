import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
// import { getUserDetails } from './services/login.service';
// import { getAuthToken } from './services/auth.service';
import PasswordReset from './views/pages/register/PasswordReset'
import Toast from './containers/Toast'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Activate = React.lazy(() => import('./views/pages/register/Activate'));
const PasswordForgot = React.lazy(() => import('./views/pages/register/PasswordForgot'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {


    render() {
        return (
        <HashRouter>
            <Toast></Toast>
            <React.Suspense fallback={loading}>
                <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route path="/activate/:uid/:token" name="Activation Page" render={props => <Activate {...props}/>} />
                <Route exact path="/passwordForgot" name="Password Forgot" render={props => <PasswordForgot {...props}/>} />
                <Route exact path="/password/reset/confirm/:uid/:token" name="Password Reset" render={props => <PasswordReset {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
                </Switch>
            </React.Suspense>
        </HashRouter>
        );
    }
}

export default App;
