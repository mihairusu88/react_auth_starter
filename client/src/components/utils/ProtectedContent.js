import React from 'react';

const ProtectedContent = ({ component: Component, isAuth, isLoading, children, ...rest }) => {
    if (isLoading) {
        return null;
    } else {
        if (Component !== undefined) {
            if (isAuth === true) {
                return <Component {...rest} />
            } else {
                return null;
            }
        } else {
            if (isAuth === true) {
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

export default ProtectedContent;