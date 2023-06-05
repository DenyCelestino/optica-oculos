import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  if (!localStorage.getItem('user')) {
    Navigate('/')
  } else {
    return <div>{children}</div>
  }
}

export default PrivateRoute
