import React from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  // const navigate = useNavigate();
  // if (!currentUser) navigate('/sign-in');
  console.log(currentUser)
  return (
    <Route
      {...rest}
      render={props => {
        // return <Component {...props} />
        return currentUser ? <Component {...props} /> : <Navigate to="/sign-in" />
      }}
    >
    </Route>
  )
}


