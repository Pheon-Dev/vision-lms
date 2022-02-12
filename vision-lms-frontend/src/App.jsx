import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Dashboard, Members } from './container';
import { Login, Auth } from './components';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem('user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : localStorage.clear();

    // if (!User) navigate('/')
    if (!User) navigate('/login');
    // if (!User) navigate('/authentication');
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="authentication" element={<Auth />} />
      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
