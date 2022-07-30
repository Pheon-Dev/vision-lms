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
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Expenses App");
  const [expenditureDate, setExpenditureDate] = useState("");
  const [expenditureType, setExpenditureType] = useState("");
  const [expenditureAmount, setExpenditureAmount] = useState("");
  const [expenditureDescription, setExpenditureDescription] = useState("");
  const [recentExpenditures, setRecentExpenditures] = useState("");
  const [validator, setValidator] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const fetchExpenditureDetails = () => {
    const query = `*[_type == "expenditures"]`;
    let subscription = true;
    if (subscription) {
      client.fetch(query).then((data) => {
        setRecentExpenditures(data);
      });
    }
    return () => (subscription = false);
  };

  useEffect(() => {
    fetchExpenditureDetails();
  }, []);
  const overheadSelector = [
    {
      id: 0,
      name: "Rent",
    },
    {
      id: 1,
      name: "Internet",
    },
  ];

  const operationalSelector = [
    {
      id: 0,
      name: "Salaries",
    },
    {
      id: 1,
      name: "Electricity",
    },
    {
      id: 2,
      name: "Drinking Water",
    },
    {
      id: 3,
      name: "Kitchen & Cleaning",
    },
    {
      id: 4,
      name: "Transport",
    },
    {
      id: 5,
      name: "Stationery, Printing & Photocopying",
    },
    {
      id: 6,
      name: "Telephone & Airtime",
    },
    {
      id: 7,
      name: "Bank & Safaricom Charges",
    },
  ];

  const otherSelector = [
    {
      id: 0,
      name: "Miscellaneous",
    },
  ];

  const expenditureTypeSelector = [
    {
      id: 0,
      name: "Expenditures",
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
        setShow(false);
        setExpenditureDate("");
        setExpenditureAmount("");
        setExpenditureType("");
        setExpenditureDescription("");
      });
    } else {
      setValidator(true);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentExpenditures?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = ["Date", "Description", "Type", "Amount"];

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

  const TableData = ({ children }) => (
    <td className="px-6 py-2 whitespace-nowrap">
      <div className="text-sm font-semibold text-gray-900">{children}</div>
    </td>
  );
  function renderExpendituresTable() {
    return (
      <ListLayout
        // title="Recent Expenditures List"
        headers={headers}
        itemsPerPage={itemsPerPage}
        totalItems={recentExpenditures?.length}
        paginate={paginate}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
      >
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((expenditure) => (
            <tr
              onClick={() => {
                // navigate("/loan/disbursements");
                console.log(expenditure.expenditureAmount);
              }}
              key={expenditure._id}
              className={
                expenditure.expenditureType === "EXPENDITURE"
                  ? "hover:bg-green-200 -py-2 bg-green-50 cursor-pointer transition-all duration-300"
                  : "hover:bg-blue-200 bg-blue-50 cursor-pointer transition-all duration-300"
              }
            >
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {expenditure.expenditureDate}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {expenditure.expenditureDescription}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {expenditure.expenditureType}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  {expenditure.expenditureType === "EXPENDITURE" ? (
                    <div className="text-sm font-semibold text-blue-900">
                      {expenditure.expenditureAmount}
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-green-900">
                      {expenditure.expenditureAmount}
                    </div>
                  )}
                </div>
              </TableData>
            </tr>
          ))}
        </tbody>
      </ListLayout>
    );
  }

  let classInput =
    "rounded-lg bg-gray-700 focus:bg-gray-600 focus:text-gray-200 text-gray-300 focus:outline-none";
  function renderExpenditures() {
    return (
      <>
        {expenditures && (
          <div>
            <div className="flex justify-center items-center p-2 gap-8">
          {!expenditureType || expenditureType === "EXPENDITURES" && (
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
          )}
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
          {expenditureType === "EXPENDITURES" ? null : (
              <div className="w-full md:w-1/2">
                <Label
                  valid={validator}
                  label="Expenditure Desc"
                  item={expenditureDescription}
                />
                <select
                  onChange={(e) => {
                    setExpenditureDescription(e.target.value.toUpperCase());
                    setShow(true);
                  }}
                  className={classInput}
                >
                  {expenditureType === "OVERHEAD" && overheadSelector.map((item) => (
                    <option
                      key={item.id}
                      className={classInput}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                  {expenditureType === "OPERATIONAL" && operationalSelector.map((item) => (
                    <option
                      key={item.id}
                      className={classInput}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                  {expenditureType === "OTHER" && otherSelector.map((item) => (
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
          )}
            </div>
            {show && (
              <div>
                <div className="flex justify-center items-center mt-3">
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
                    <button
                      data-modal-toggle="defaultModal"
                      onClick={() => {
                        handleSubmit();
                        setValidator(true);
                        setShow(false);
                      }}
                      type="button"
                      className="hover:text-white text-black font-bold bg-green-300 m-2 hover:bg-green-600 pl-3 pr-3 p-2 rounded-lg transition-all ease-in-out duration-500"
                    >
                      {processing ? "Processing ..." : "Add Expenditure"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {renderExpendituresTable()}
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
                  fetchExpenditureDetails();
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
                  fetchExpenditureDetails();
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
                  fetchExpenditureDetails();
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
                fetchExpenditureDetails();
                setTitle("Expenditures Mini App");
              }
        }
        title="Expenditure State"
        message="Recent Expenditures"
        type="expenses"
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
