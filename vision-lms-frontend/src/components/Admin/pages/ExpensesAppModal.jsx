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
  const [date, setDate] = useState();
  const [transactionType, setTransactionType] = useState();
  const [transactionAmount, setTransactionAmount] = useState();
  const [validator, setValidator] = useState(false);

  const Label = ({ label }) => (
    <>
      <label className="block tracking-wide text-xs mb-2">
        <>
          <span className="uppercase text-gray-300 font-bold text-md">
            {label}
          </span>
          <span className="text-red-500 italic">*</span>
        </>
      </label>
    </>
  );

  const transactionTypeSelector = [
    {
      name: "Transaction Type ...",
      abbr: "T",
    },
    {
      name: "Expenditure",
      abbr: "E",
    },
    {
      name: "Income",
      abbr: "I",
    },
  ];

  let classInput =
    "rounded-lg bg-gray-700 focus:bg-gray-600 focus:text-gray-200 text-gray-300 focus:outline-none";
  function renderTransactions() {
    return (
      <>
        {transactions && (
          <div>
            <div className="flex justify-center items-center p-2 gap-8">
              <div className="w-full md:w-1/3">
                <Label
                  valid={validator}
                  label="Transaction Type"
                  item={transactionType}
                />
            <select
              onChange={(e) => {
                setTransactionType(e.target.value.toUpperCase());
                e.target.value.toUpperCase();
              }}
              className={classInput}
            >
              {transactionTypeSelector.map((item) => (
                <option
                  key={item.name}
                  className={classInput}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
              </div>
              <div className="w-full md:w-1/3">
                <Label
                  valid={validator}
                  label="Transaction Amount"
                  item={transactionAmount}
                />
                <input
                  type="number"
                  placeholder="Transaction Amount ..."
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className={classInput}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Label valid={validator} label="Date" item={date} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value.toUpperCase())}
                  className={classInput}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-center">
                <button
                  data-modal-toggle="defaultModal"
                  onClick={() => {
                    closeApp;
                    openExpe;
                    setTitle("Muiscellaneous Mini App");
                    setTransactions(false);
                    setBudget(false);
                    setMiscellaneous(true);
                  }}
                  type="button"
                  className="hover:text-white text-black font-bold bg-green-300 m-2 hover:bg-green-600 pl-3 pr-3 p-2 rounded-lg transition-all ease-in-out duration-500"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
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
                setTitle("Transactions Mini App");
                setTransactions(true);
                setBudget(false);
                setMiscellaneous(false);
              }}
              type="button"
              className="hover:text-white text-black font-bold bg-blue-300 m-2 hover:bg-blue-600 p-3 rounded-lg transition-all ease-in-out duration-500"
            >
              Transactions
            </button>
            <button
              data-modal-toggle="defaultModal"
              onClick={() => {
                closeApp;
                openExpe;
                setTitle("Budget Mini App");
                setTransactions(false);
                setBudget(true);
                setMiscellaneous(false);
              }}
              type="button"
              className="hover:text-white text-black bg-violet-400 font-bold m-2 hover:bg-violet-600 p-3 rounded-lg transition-all ease-in-out duration-500"
            >
              Budget
            </button>
            <button
              data-modal-toggle="defaultModal"
              onClick={() => {
                closeApp;
                openExpe;
                setTitle("Muiscellaneous Mini App");
                setTransactions(false);
                setBudget(false);
                setMiscellaneous(true);
              }}
              type="button"
              className="hover:text-white text-black bg-green-300 m-2 font-bold hover:bg-green-600 p-3 rounded-lg transition-all ease-in-out duration-500"
            >
              Miscellaneous
            </button>
          </>
        )}
      </div>
      {renderTransactions()}
      {renderBudget()}
      {renderMiscellaneous()}
    </ModalAlert>
  );
};

export default ExpensesAppModal;
