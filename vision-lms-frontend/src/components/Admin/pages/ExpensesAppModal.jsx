import React, { useState, useEffect } from "react";
import { ModalAlert } from "../../Modals";
import { ListLayout, Spinner, Status } from "../../Components";
import { BsCheck2Circle } from "react-icons/bs";
import { client } from "../../../client";

const ExpensesAppModal = ({
  closeApp,
  openExpe,
  closeExpe,
  open,
  closeAll,
  close,
}) => {
  const [expenditures, setExpenditures] = useState(false);
  const [budget, setBudget] = useState(false);
  const [miscellaneous, setMiscellaneous] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [title, setTitle] = useState("Expenses App");
  const [expenditureDate, setExpenditureDate] = useState("");
  const [expenditureType, setExpenditureType] = useState("");
  const [expenditureAmount, setExpenditureAmount] = useState("");
  const [expenditureDescription, setExpenditureDescription] = useState("");
  const [validator, setValidator] = useState(false);

  const overheadSelector = [
    {
      id: 0,
      name: null,
    },
    {
      id: 1,
      name: "Rent",
    },
    {
      id: 2,
      name: "Internet",
    },
  ];

  const operationalSelector = [
    {
      id: 0,
      name: null,
    },
    {
      id: 1,
      name: "Salaries",
    },
    {
      id: 2,
      name: "Electricity",
    },
    {
      id: 3,
      name: "Drinking Water",
    },
    {
      id: 4,
      name: "Kitchen & Cleaning",
    },
    {
      id: 5,
      name: "Transport",
    },
    {
      id: 6,
      name: "Stationery, Printing & Photocopying",
    },
    {
      id: 7,
      name: "Telephone & Airtime",
    },
    {
      id: 8,
      name: "Bank & Safaricom Charges",
    },
  ];

  const otherSelector = [
    {
      id: 0,
      name: null,
    },
    {
      id: 1,
      name: "Miscellaneous",
    },
  ];

  const expenditureTypeSelector = [
    {
      id: 0,
      name: null,
    },
    {
      id: 1,
      name: "Overhead",
    },
    {
      id: 2,
      name: "Operational",
    },
    {
      id: 3,
      name: "Other",
    },
  ];

  const handleSubmit = () => {
    setProcessing(true);
    if (expenditureDate && expenditureType && expenditureAmount) {
      const doc = {
        _type: "expenditures",
        expenditureDate,
        expenditureType,
        expenditureAmount,
        expenditureDescription,
      };
      client.create(doc).then(() => {
        setOpenSubmit(true);
        setProcessing(false);
        setExpenditureDate("");
        setExpenditureAmount("");
        setExpenditureType("");
        setExpenditureDescription("");
      });
    } else {
      setValidator(true);
    }
  };

  const Label = ({ label }) => (
    <>
      <label className="block tracking-wide text-xs mb-2">
        <>
          <span className="uppercase text-gray-300 font-bold text-md">
            {label}
          </span>
          <span className="text-green-500 italic">*</span>
        </>
      </label>
    </>
  );

  let classInput =
    "rounded-lg w-full bg-gray-700 focus:bg-gray-600 focus:text-gray-200 text-gray-300 focus:outline-none";
  function renderExpenditures() {
    return (
      <>
        {expenditures && (
          <div>
            <div className="flex justify-center items-center p-2 gap-8">
              <div className="w-full md:w-1/2">
                <Label
                  valid={validator}
                  label="Expenditure Type"
                  item={expenditureType}
                />
                <select
                  onChange={(e) => {
                    setExpenditureType(e.target.value.toUpperCase());
                  }}
                  className={classInput}
                >
                  {expenditureTypeSelector.map((item) => (
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
              <div className="w-full md:w-1/2 m-5">
                <Label
                  valid={validator}
                  label="Expenditure Desc"
                  item={expenditureDescription}
                />
                <select
                  onChange={(e) => {
                    setExpenditureDescription(e.target.value.toUpperCase());
                  }}
                  className={classInput}
                >
                  {expenditureType === "OVERHEAD" &&
                    overheadSelector.map((item) => (
                      <option
                        key={item.id}
                        className={classInput}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  {expenditureType === "OPERATIONAL" &&
                    operationalSelector.map((item) => (
                      <option
                        key={item.id}
                        className={classInput}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  {expenditureType === "OTHER" &&
                    otherSelector.map((item) => (
                      <option
                        key={item.id}
                        className={classInput}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center p-2 gap-8">
                <div className="w-full md:w-1/2">
                  <Label
                    valid={validator}
                    label="Expenditure Amount"
                    item={expenditureAmount}
                  />
                  <input
                    type="number"
                    placeholder="Expenditure Amount ..."
                    value={expenditureAmount}
                    onChange={(e) => {
                      setExpenditureAmount(e.target.value);
                    }}
                    className={classInput}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Label
                    valid={validator}
                    label="Expenditure Date"
                    item={expenditureDate}
                  />
                  <input
                    type="date"
                    value={expenditureDate}
                    onChange={(e) => {
                      setExpenditureDate(e.target.value.toUpperCase());
                    }}
                    className={classInput}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-1/2 mt-5">
              <button
                data-modal-toggle="defaultModal"
                onClick={() => {
                  handleSubmit();
                  setValidator(true);
                }}
                type="button"
                className="hover:text-white w-full text-black font-bold bg-green-300 m-2 hover:bg-green-600 pl-3 pr-3 p-2 rounded-lg transition-all ease-in-out duration-500"
              >
                {processing ? "Processing ..." : "Add Expenditure"}
              </button>
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
    <>
      <ModalAlert
        open={open}
        onCloseAll={closeAll}
        onClose={
          !expenditures && !budget && !miscellaneous
            ? close
            : () => {
                setExpenditures(false);
                setBudget(false);
                setMiscellaneous(false);
                setTitle("Expenses App");
              }
        }
        title={title}
        type="expenses"
      >
        <div className="flex-auto m-3 justify-center items-center gap-6 md:w-1/2 lg:w-full w-full">
          {!expenditures && !budget && !miscellaneous && (
            <>
              <button
                data-modal-toggle="defaultModal"
                onClick={() => {
                  closeApp;
                  closeExpe;
                  setTitle("Expenditures Mini App");
                  setExpenditures(true);
                  setBudget(false);
                  setMiscellaneous(false);
                }}
                type="button"
                className="hover:text-white text-black font-bold bg-blue-300 m-2 hover:bg-blue-600 p-3 rounded-lg transition-all ease-in-out duration-500"
              >
                Expenditures
              </button>
              <button
                data-modal-toggle="defaultModal"
                onClick={() => {
                  closeApp;
                  openExpe;
                  setTitle("Budget Mini App");
                  setExpenditures(false);
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
                  setExpenditures(false);
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
        {renderExpenditures()}
        {renderBudget()}
        {renderMiscellaneous()}
      </ModalAlert>
      <ModalAlert
        open={openSubmit}
        onCloseAll={closeAll}
        onClose={
          !expenditures && !budget && !miscellaneous
            ? close
            : () => {
                setExpenditures(true);
                setBudget(false);
                setMiscellaneous(false);
                setOpenSubmit(false);
                setTitle("Expenditures Mini App");
              }
        }
        title="Expenditure State"
        message="Recent Expenditures"
        path="apps/expenses"
      >
        <div className="flex items-center w-full">
          <div className="bg-green-300 opacity-80 relative rounded-full p-2">
            <BsCheck2Circle className="w-10 font-bold text-black h-10" />
          </div>
          <div className="text-md p-3">Expenditure Submitted Successfully!</div>
        </div>
      </ModalAlert>
    </>
  );
};

export default ExpensesAppModal;
