import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AuthProvider } from "./contexts/AuthContext";
// import { useLipaNaMpesa } from "./mpesa";
import { Dashboard, Members } from "./container";
import {
  Login,
  SignIn,
  SignUp,
  UpdateProfile,
  ForgotPassword,
  PrivateRoute,
  PageNotFound,
} from "./components/Auth";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

export default function App () {
  const { setCurrentColour, setCurrentMode, currentMode, activeMenu, currentColour, themeSettings, setThemeSettings } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const currentThemeColour = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");

    if (currentThemeColour && currentThemeMode) {
      setCurrentColour(currentThemeColour);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-8 bottom-8" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{
                background: currentColour,
                borderRadius: "50%",
              }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
      </div>
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
    </div>
  );
}
