import React, { useState } from "react";
import { ModalAlert } from "../../Modals";

const ExpensesAppModal = ({
  closeApp,
  openExpe,
  closeExpe,
  open,
  closeAll,
  close,
}) => {
  const [transactions, setTransactions] = useState(false);
  const [budget, setBudget] = useState(false);
  const [miscellaneous, setMiscellaneous] = useState(false);
  const [title, setTitle] = useState("Expenses App");

  function renderTransactions() {
    return (
      <>
        {transactions && (
          <>
            <div>Transactions</div>
          </>
        )}
      </>
    );
  }

  function renderBudget() {
    return (
      <>
        {budget && (
          <>
            <div>Budget</div>
          </>
        )}
      </>
    );
  }

  function renderMiscellaneous() {
    return (
      <>
        {miscellaneous && (
          <>
            <div>Miscellaneous</div>
          </>
        )}
      </>
    );
  }

  return (
    <ModalAlert
      open={open}
      onCloseAll={closeAll}
      onClose={
        !transactions && !budget && !miscellaneous
          ? close
          : () => {
              setTransactions(false);
              setBudget(false);
              setMiscellaneous(false);
              setTitle("Expenses App");
            }
      }
      title={title}
      type="expenses"
    >
      <div className="flex-auto m-3 justify-center items-center gap-6 md:w-1/2 lg:w-full w-full">
        {!transactions && !budget && !miscellaneous && (
          <>
            <button
              data-modal-toggle="defaultModal"
              onClick={() => {
                closeApp;
                closeExpe;
                setTitle("Transactions");
                setTransactions(true);
                setBudget(false);
                setMiscellaneous(false);
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
                setTitle("Budget");
                setTransactions(false);
                setBudget(true);
                setMiscellaneous(false);
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
                setTitle("Muiscellaneous");
                setTransactions(false);
                setBudget(false);
                setMiscellaneous(true);
              }}
              type="button"
              className="hover:text-white text-black bg-green-300 m-2 hover:bg-green-600 p-3 rounded-lg transition-all ease-in-out duration-500"
            >
              Miscellaneous
            </button>
          </>
        )}
        {renderTransactions()}
        {renderBudget()}
        {renderMiscellaneous()}
      </div>
    </ModalAlert>
  );
};

export default ExpensesAppModal;
