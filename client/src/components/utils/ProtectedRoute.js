import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route {...isAuthenticated} {...rest} render={
            (props) => {
                if (isAuthenticated === false || isAuthenticated === null) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }
        }
        />
    );
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);