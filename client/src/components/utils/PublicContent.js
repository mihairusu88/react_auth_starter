import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PublicContent = ({ component: Component, user: { isAuthenticated, isLoading }, children, ...rest }) => {
    if (isLoading) {
        return null;
    } else {
        if (Component !== undefined) {
            if (isAuthenticated === false || isAuthenticated === null) {
                return <Component {...rest} />
            } else {
                return null;
            }
        } else {
            if (isAuthenticated === false || isAuthenticated === null) {
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

PublicContent.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PublicContent);