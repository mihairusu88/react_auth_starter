import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route {...isAuth} {...rest} render={
            (props) => {
                if (isAuth === false || isAuth === null) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }
        }
        />
    );
}

export default ProtectedRoute;