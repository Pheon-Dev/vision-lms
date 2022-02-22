import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logowhite.png';

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("")
      setLoading(true)
      await signin(emailRef.current.value, passwordRef.current.value)
      history("/")
    } catch {
      setError("Failed to Sign In")
    }

    setLoading(false)
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
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {error && <div className="text-xs text-red-500">{error}</div>}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="email" type="email" placeholder="Email" />
                </div>
                {/* <div className="mb-4"> */}
                {/*   <label className="block text-gray-700 text-sm font-bold mb-2"> */}
                {/*     Work ID Number */}
                {/*   </label> */}
                {/*   <input */}
                {/*     ref={workIdRef} */}
                {/*     // value={workId} */}
                {/*     // onChange={(e) => setWorkId(e.target.value)} */}
                {/*     className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" */}
                {/*     id="workIdNumber" type="text" placeholder="123456" /> */}
                {/* </div> */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="password" type="password" placeholder="********" />
                </div>
                <div className="flex flex-wrap">

                  <div className="flex">
                    <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                      Sign In
                    </button>
                    {/* <div className="flex mt-3 ml-9 items-end justify-end"> */}
                    {/*   <p className="text-gray-500 mr-1 text-xs italic">No Account?</p> */}
                    {/*   <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/sign-up"> */}
                    {/*     Sign Up */}
                    {/*   </a> */}
                    {/* </div> */}
                  </div>
                  {/* <div className="flex mt-3 justify-end mr-3 items-center w-full"> */}
                  {/*   <p className="text-gray-500 mr-2 text-xs italic">Forgot Password?</p> */}
                  {/*   <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/forgot-password"> */}
                  {/*     Reset */}
                  {/*   </a> */}
                  {/* </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


