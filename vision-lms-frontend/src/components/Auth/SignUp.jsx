import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import bgVideo from '../../assets/bgVideo.mp4';
import logo from '../../assets/logowhite.png';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!")
    }

    // try {
    setError("")
    setLoading(true)
    await signup(emailRef.current.value, passwordRef.current.value)
    // history.push("/sign-in")
    history("/sign-in")
    // } catch {
    // setError("Failed to create an account")
    // }

    setLoading(false)
  }

  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src={bgVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-2">
              <img src={logo} width="240px" />
            </div>

            <div className="w-full max-w-xs">
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {error && <div className="text-xs text-red-500">{error}</div>}
                {/* <div className="mb-4"> */}
                {/*   <label className="block text-gray-700 text-sm font-bold mb-2"> */}
                {/*     User Name */}
                {/*   </label> */}
                {/*   <input */}
                {/*     ref={userNameRef} */}
                {/*     className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" */}
                {/*     id="username" type="text" placeholder="User Name" /> */}
                {/* </div> */}
                {/* <div className="mb-4"> */}
                {/*   <label className="block text-gray-700 text-sm font-bold mb-2"> */}
                {/*     Work ID Number */}
                {/*   </label> */}
                {/*   <input */}
                {/*     ref={workIdRef} */}
                {/*     className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" */}
                {/*     id="workIdNumber" type="text" placeholder="123456" /> */}
                {/* </div> */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="email" type="email" placeholder="example@email.com" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter Password
                  </label>
                  <input
                    ref={passwordRef}
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="new-password" type="password" placeholder="********" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    ref={passwordConfirmRef}
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="confirm-password" type="password" placeholder="********" />
                  {/* <p className="text-gray-500 text-xs italic">Use a combination of letters, numbers and symbols. (Minimum of 8 characters)</p> */}
                </div>
                <div className="flex items-center justify-between">
                  <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign Up
                  </button>
                  <p className="text-gray-500 text-xs italic">Have an Account?</p>
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/sign-in">
                    Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

