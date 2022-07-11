import React from "react";
import { Circles, Rings } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div>
      <div className="fixed inset-0 right-0 left-0 bg-black opacity-30 transition-opacity duration-300 ease-in-out" />
      <div
        className="fixed overflow-y-auto overflow-x-hidden ml-auto mr-auto flex items-center md:w-full md:inset-0 max-w-screen-sm p-4 opacity-100 transition-opacity duration-300 ease-in-out"
        aria-hidden="true"
        tabIndex="-1"
      >
        <Rings
          type="Circles"
          color="#00DFFF"
          height={100}
          width={200}
          className="m-5"
        />

        <p className="text-3xl text-white text-center px-2">{message}</p>
      </div>
    </div>
  );
}

export default Spinner;
