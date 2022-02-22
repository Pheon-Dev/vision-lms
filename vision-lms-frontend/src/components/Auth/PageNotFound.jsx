import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logowhite.png';

export default function PageNotFound() {
  const emailRef = useRef();
  const workIdRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    history("/")
  }

  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src="https://res.cloudinary.com/drf1wghco/video/upload/v1645542419/video_z1bqnf.mp4"
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width="240px" />
            </div>

            <div className="w-full max-w-xs">
              <div className="bg-white font-bold shadow-md rounded px-8 pt-6 pb-8 mb-4">
                404 ERROR : Page Not Found
              </div>
              <div className="flex justify-center mt-5 p-3 w-full">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  <Link to="/">
                    Home Page
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



