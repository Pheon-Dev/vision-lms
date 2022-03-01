import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthProvider } from "./contexts/AuthContext";
// import { useLipaNaMpesa } from "./mpesa";

import { Dashboard, Members } from './container';
import { Login, SignIn, SignUp, UpdateProfile, ForgotPassword, PrivateRoute, PageNotFound } from './components/Auth';

function App() {
  const navigate = useNavigate();
  // const [lipaNaMpesa, setLipaNaMpesa] = useState('')
  // const { data } = useLipaNaMpesa();

  // console.log(data);

  // if (!currentUser) navigate('/sign-in');
  // console.log(currentUser.email)
  // useEffect(() => {
  //   const User =
  //     localStorage.getItem('user') !== 'undefined'
  //       ? JSON.parse(localStorage.getItem('user'))
  //       : localStorage.clear();

  //   // console.log(User);
  //   if (!User) navigate('/login')
  //   // if (!User) navigate('/sign-in')
  //   // if (!User) navigate('/authentication');
  // }, []);
  // // if (!currentUser) navigate('/sign-in');

  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
