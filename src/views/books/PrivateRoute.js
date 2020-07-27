import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './../../services/auth.service';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(Component)
    return (
        <Route {...rest} render={props => (
            isLoggedIn()
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute