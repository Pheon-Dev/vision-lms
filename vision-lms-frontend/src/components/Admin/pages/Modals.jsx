import React from "react";

export const ExpensesAppModal = ({ closeApp, openExpe, closeExpe, openTrans }) => {
  return (
    <div className="flex-auto m-3 justify-center items-center gap-6 md:w-1/2 lg:w-full w-full">
      <button
        data-modal-toggle="defaultModal"
        onClick={() => {
          closeApp;
          closeExpe;
          openTrans;
        }}
        type="button"
        className="hover:text-white text-black bg-blue-300 m-2 hover:bg-blue-600 p-3 rounded-lg transition-all ease-in-out duration-500"
      >
        Transactions
      </button>
      <button
        data-modal-toggle="defaultModal"
        onClick={() => {
          closeApp;
          openExpe;
        }}
        type="button"
        className="hover:text-white text-black bg-violet-400 m-2 hover:bg-violet-600 p-3 rounded-lg transition-all ease-in-out duration-500"
      >
        Budget
      </button>
      <button
        data-modal-toggle="defaultModal"
        onClick={() => {
          closeApp;
          openExpe;
        }}
        type="button"
        className="hover:text-white text-black bg-green-300 m-2 hover:bg-green-600 p-3 rounded-lg transition-all ease-in-out duration-500"
      >
        Miscellaneous
      </button>
    </div>
  );
};

export const TransactionsModal = ({ closeExpe, openTrans }) => {
  return (
    <div className="flex-auto m-3 justify-center items-center gap-6 md:w-1/2 lg:w-full w-full">
      <button
        data-modal-toggle="defaultModal"
        onClick={() => {
          closeExpe;
          openTrans;
        }}
        type="button"
        className="hover:text-white text-black bg-blue-300 m-2 hover:bg-blue-600 p-3 rounded-lg transition-all ease-in-out duration-500"
      >
        Transactions
      </button>
      <button
        data-modal-toggle="defaultModal"
        onClick={() => {
          closeExpe;
          openTrans;
        }}
        type="button"
        className="hover:text-white text-black bg-violet-400 m-2 hover:bg-violet-600 p-3 rounded-lg transition-all ease-in-out duration-500"
      >
        Budget
      </button>
      <button
        data-modal-toggle="defaultModal"
        onClick={() => {
          closeExpe;
          openTrans;
        }}
        type="button"
        className="hover:text-white text-black bg-green-300 m-2 hover:bg-green-600 p-3 rounded-lg transition-all ease-in-out duration-500"
      >
        Miscellaneous
      </button>
    </div>
  );
};
