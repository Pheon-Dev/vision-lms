import React, { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { ModalAlert } from "../../Modals";
  export function renderAppsModal() {
  const [openApps, setOpenApps] = useState(false);
    return (
      <div>
        <ModalAlert
          open={openApps}
          onClose={() => {
            setOpenApps(false);
          }}
          type="apps"
          title="All Applications"
          message="Navigate to Disbursed Loans ..."
          path="/"
        >
          <div className="flex items-center gap-6 w-full">
            <button
              data-modal-toggle="defaultModal"
              onClick={() => {
                setOpenApps(false);
                setOpenExpenses(true);
              }}
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-800 p-3 rounded-lg"
            >
              Expenses
            </button>
            <button
              data-modal-toggle="defaultModal"
              onClick={() => {
                setOpenApps(false);
                setOpenExpenses(true);
              }}
              type="button"
              className="text-white bg-violet-500 hover:bg-violet-800 p-3 rounded-lg"
            >
              Income
            </button>
            <button
              data-modal-toggle="defaultModal"
              onClick={() => {
                setOpenApps(false);
                setOpenExpenses(true);
              }}
              type="button"
              className="text-white bg-green-500 hover:bg-green-800 p-3 rounded-lg"
            >
              Miscellaneous
            </button>
          </div>
        </ModalAlert>
      </div>
    );
  }

  export function renderExpensesAppModal() {
  const [openExpenses, setOpenExpenses] = useState(false);
    return (
      <div>
        <ModalAlert
          open={openExpenses}
          onCloseAll={() => {
            setOpenApps(false);
            setOpenExpenses(false);
          }}
          onClose={() => {
            setOpenApps(true);
            setOpenExpenses(false);
          }}
          title="Expenses App"
          type="expenses"
          message="Navigate to Disbursed Loans ..."
          path="/apps/expenses"
        >
          <div className="flex items-center w-full">
            <div className="bg-green-300 opacity-80 relative rounded-full p-2">
              <BsCheck2Circle className="w-10 font-bold text-black h-10" />
            </div>
            <div className="text-md p-3">
              <span className="font-bold text-3xl">Successfully Approved!</span>
            </div>
          </div>
        </ModalAlert>
      </div>
    );
  }


