import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedContent = ({ component: Component, user: { isAuthenticated, isLoading }, children, ...rest }) => {
    if (isLoading) {
        return null;
    } else {
        if (Component !== undefined) {
            if (isAuthenticated === true) {
                return <Component {...rest} />
            } else {
                return null;
            }
        } else {
            if (isAuthenticated === true) {
                return (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                );
            } else {
                return null;
            }
        }
    }
}

ProtectedContent.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ProtectedContent);