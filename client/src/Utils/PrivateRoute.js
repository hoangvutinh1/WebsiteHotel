import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { RoomContext } from '../context';
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
    const context = useContext(RoomContext)
    const { getToken } = context
   
    return (
        <Route
            {...rest}
            render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;