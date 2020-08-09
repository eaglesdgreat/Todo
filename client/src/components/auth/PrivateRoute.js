import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticate } from './auth.helper'

//  The private route will allow us to declear protected routes
// for the frontend and restrict view access based on authentication and authorization
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticate()
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    />
  )
}

export {
  PrivateRoute,
}