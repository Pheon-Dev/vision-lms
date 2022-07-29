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
  const [transactions, setTransactions] = useState(false);
  const [budget, setBudget] = useState(false);
  const [miscellaneous, setMiscellaneous] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Expenses App");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [recentTransactions, setRecentTransactions] = useState("");
  const [validator, setValidator] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const fetchTransactionDetails = () => {
    const query = `*[_type == "transactions"]`;
    let subscription = true;
    if (subscription) {
      client.fetch(query).then((data) => {
        setRecentTransactions(data);
      });
    }
    return () => (subscription = false);
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

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

  const handleSubmit = () => {
    setProcessing(true);
    if (transactionDate && transactionType && transactionAmount) {
      const doc = {
        _type: "transactions",
        transactionDate,
        transactionType,
        transactionAmount,
        transactionDescription,
      };
      client.create(doc).then(() => {
        setOpenSubmit(true);
        setProcessing(false);
        setShow(false);
        setTransactionDate("");
        setTransactionAmount("");
        setTransactionType("");
        setTransactionDescription("");
      });
    } else {
      setValidator(true);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentTransactions?.slice(
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
  function renderTransactionsTable() {
    return (
      <ListLayout
        // title="Recent Transactions List"
        headers={headers}
        itemsPerPage={itemsPerPage}
        totalItems={recentTransactions?.length}
        paginate={paginate}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
      >
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((transaction) => (
            <tr
              onClick={() => {
                // navigate("/loan/disbursements");
                console.log(transaction.transactionAmount);
              }}
              key={transaction._id}
              className={
                transaction.transactionType === "EXPENDITURE"
                  ? "hover:bg-green-200 -py-2 bg-green-50 cursor-pointer transition-all duration-300"
                  : "hover:bg-blue-200 bg-blue-50 cursor-pointer transition-all duration-300"
              }
            >
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {transaction.transactionDate}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {transaction.transactionDescription}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {transaction.transactionType}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
              {
                transaction.transactionType === "EXPENDITURE"
                  ?
                  <div className="text-sm font-semibold text-blue-900">
                    {transaction.transactionAmount}
                  </div>
                :
                  <div className="text-sm font-semibold text-green-900">
                    {transaction.transactionAmount}
                  </div>
              }
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
                  onChange={(e) => {
                    setTransactionAmount(e.target.value);
                  }}
                  className={classInput}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Label
                  valid={validator}
                  label="Transaction Date"
                  item={transactionDate}
                />
                <input
                  type="date"
                  value={transactionDate}
                  onChange={(e) => {
                    setTransactionDate(e.target.value.toUpperCase())
                    setShow(true);
                  }}
                  className={classInput}
                />
              </div>
            </div>
          {show && (
            <div>
              <div className="flex justify-center items-center mt-3">
                <div className="w-full md:w-1/2">
                  <Label
                    valid={validator}
                    label="Transaction Description"
                    item={transactionDescription}
                  />
                  <textarea
                    value={transactionDescription}
                    onChange={(e) => setTransactionDescription(e.target.value)}
                    className="rounded-lg bg-gray-700 focus:bg-gray-600 focus:text-gray-200 text-gray-300 focus:outline-none"
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
                    {processing ? "Processing ..." : "Add Transaction"}
                  </button>
                </div>
              </div>
            </div>
          )}
            {renderTransactionsTable()}
          </div>
        )}
      </>
    );
  }
  console.log(show)

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
                  fetchTransactionDetails();
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
                  fetchTransactionDetails();
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
                  fetchTransactionDetails();
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
      <ModalAlert
        open={openSubmit}
        onCloseAll={closeAll}
        onClose={
          !transactions && !budget && !miscellaneous
            ? close
            : () => {
                setTransactions(true);
                setBudget(false);
                setMiscellaneous(false);
                setOpenSubmit(false);
              fetchTransactionDetails();
                setTitle("Transactions Mini App");
              }
        }
        title="Transaction State"
        message="Recent Transactions"
        type="expenses"
      >
        <div className="flex items-center w-full">
          <div className="bg-green-300 opacity-80 relative rounded-full p-2">
            <BsCheck2Circle className="w-10 font-bold text-black h-10" />
          </div>
          <div className="text-md p-3">Transaction Submitted Successfully!</div>
        </div>
      </ModalAlert>
    </>
  );
};

export default ExpensesAppModal;
