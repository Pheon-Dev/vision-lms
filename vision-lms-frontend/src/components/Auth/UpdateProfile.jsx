import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logowhite.png';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updatePassword, currentUser, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history("/")
      })
      .catch(() => {
        setError("Failed to Update Account")
      })
    // .finally(() => {
    // setLoading(false)
    // })

    // // try {
    // setError("")
    // setLoading(true)
    // await signup(emailRef.current.value, passwordRef.current.value)
    // // history.push("/sign-in")
    // history("/sign-in")
    // // } catch {
    // // setError("Failed to create an account")
    // // }

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
                <div className="mb-4">
                  {error && <div className="text-xs text-red-500">{error}</div>}
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                    className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="email" type="email" placeholder="Email" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
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
                    Update
                  </button>
                  <p className="text-gray-500 text-xs italic">Cancel Changes?</p>
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
                    Cancel
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


