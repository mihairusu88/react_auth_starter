import React from 'react';

const PublicContent = ({ component: Component, isAuth, isLoading, children, ...rest }) => {
    if (isLoading) {
        return null;
    } else {
        if (Component !== undefined) {
            if (isAuth === false || isAuth === null) {
                return <Component {...rest} />
            } else {
                return null;
            }
        } else {
            if (isAuth === false || isAuth === null) {
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

export default PublicContent;