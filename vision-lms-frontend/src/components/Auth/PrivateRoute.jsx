import React from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute() {
  const { currentUser } = useAuth();
  // const navigate = useNavigate();
  if (!currentUser) navigate('/sign-in');

  // useEffect(() => {
  //   const User =
  //     localStorage.getItem('user') !== 'undefined'
  //       ? JSON.parse(localStorage.getItem('user'))
  //       : localStorage.clear();

  //   if (!User) navigate('/login')
  // }, []);

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


