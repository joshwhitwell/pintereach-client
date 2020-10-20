import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({component:Component, ...rest}) {
    return(
        <Route 
        { ...rest }
        render={(props) => {
            if (window.localStorage.getItem('token')) {
                return <Component {...props} />
            } else {
                return <Redirect to='/register' />
            }
        }}
        />
    )
}

export default PrivateRoute