import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logowhite.png';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // try {
    setMessage("")
    setError("")
    setLoading(true)
    // await signin(emailRef.current.value, passwordRef.current.value)
    await resetPassword(emailRef.current.value)
    setMessage("Check your inbox for further instructions.")
    // history.push("/sign-in")
    // } catch {
    // setError("Failed to reset password")
    // }

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
                {message && <div className="text-xs text-green-500">{message}</div>}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="email" type="email" required placeholder="example@email.com" />
                </div>
                <div className="flex items-center justify-between">
                  <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Reset
                  </button>
                  <Link to="/sign-in">
                    <button disabled={loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                      Sign in
                    </button>
                  </Link>
                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/sign-in"> */}
                  {/*   Sign In */}
                  {/* </a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


