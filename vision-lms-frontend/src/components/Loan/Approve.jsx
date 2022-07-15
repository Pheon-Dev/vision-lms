import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { ModalAlert } from "../Modals";
import { List } from "../Components";

import { client } from "../../client";

export default function Approve() {
  const { loanId } = useParams();

  const [loanOfficerName, setLoanOfficerName] = useState("");
  const [loanOfficerPhoneNumber, setLoanOfficerPhoneNumber] = useState("");
  const [loanDetails, setLoanDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [approving, setApproving] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchLoanDetails = () => {
    const query = `*[_type == "maintenance" && _id == '${loanId}']`;
    let subscription = true;
    if (subscription) {
      client.fetch(query).then((data) => {
        setLoanDetails(data);
      });
    }
    return () => (subscription = false);
  };

  useEffect(() => {
    fetchLoanDetails();
    if (loanDetails) {
      let subs = true;
      const pquery = `*[_type == "newProduct" && productName == '${loanDetails[0]?.productType}']`;

      if (subs) {
        client.fetch(pquery).then((data) => {
          setProductDetails(data);
        });
      }
      return () => {
        subs = false;
      };
    } else {
      let subs = true;
      const pquery = `*[_type == "newProduct" && productName == '${productType}']`;

      if (subs) {
        client.fetch(pquery).then((data) => {
          setProductDetails(data);
        });
      }
      return () => {
        subs = false;
      };
    }
  }, [loanId, loanDetails, productType]);

  const handleLoanApprove = () => {
    setApproving(true);
    if (loanId &&
        loanOfficerName &&
        loanOfficerPhoneNumber
    ) {
      client
        .patch(loanId)
        .set({
          maintained: "true",
          approved: "true",
          disbursed: "false",
          loanOfficerName: loanOfficerName,
          loanOfficerPhoneNumber: loanOfficerPhoneNumber,
        })
        .commit()
        .then((update) => {
          setOpen(true);
          console.log(update);
        });
    }
  };

  let classInput = "appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  let classUnorderedList =
    "bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm";

  function renderLoanOfficer() {
    return (
      <>
        <div className="w-full flex justify-center mr-auto ml-auto px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
            Loan Officer Details
          </label>
        </div>
        <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Loan Officer Names
            </label>
            <input
              className={classInput}
              type="text"
              placeholder="Full Names ..."
              value={loanOfficerName}
              onChange={(e) => setLoanOfficerName(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Loan Officer Phone
            </label>
            <input
              className={classInput}
              type="text"
              placeholder="Phone Number ..."
              value={loanOfficerPhoneNumber}
              onChange={(e) =>
                setLoanOfficerPhoneNumber(e.target.value.toUpperCase())
              }
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        onMouseEnter={() => {
          fetchLoanDetails();
          setProductType(loanDetails[0].productType);
        }}
      >
        <div className="font-bold mt-5 flex justify-center w-full text-3xl">
          <span className="text-gray-500">Approve </span>
          <span className="text-gray-700 ml-3">
            {loanDetails[0]?.memberNames}
          </span>
        </div>
        <br />
        <div className="ml-auto mr-auto mb-3">
          <div className="flex justify-center items-center px-4 py-4">
            <div className="mt-3">
              <span className="font-bold text-xl mr-2">Personal Details</span>
            </div>
          </div>
          <ul className={classUnorderedList}>
            <List
              title="Member Code"
              note=""
              content={`DC-${loanDetails[0]?.loanAccNumber.split("-")[1]}`}
            />
            <List
              title="Member No."
              note=""
              content={`${loanDetails[0]?.memberPhoneNumber}`}
            />
            <List
              title="Email"
              note=""
              content={`${loanDetails[0]?.memberEmail}`}
            />
            <List
              title="ID Number"
              note=""
              content={`${loanDetails[0]?.memberIdNumber}`}
            />
          </ul>
        </div>
        <br />
        <div className="ml-auto mr-auto mb-3">
          <div className="flex justify-center items-center px-4 py-4">
            <div className="mt-3">
              <span className="font-bold text-xl mr-2">Loan Details</span>
            </div>
          </div>
          <ul className={classUnorderedList}>
            <List
              title="Product Name"
              note=""
              content={`${loanDetails[0]?.productType}`}
            />
            <List
              title="Loan A/C Number"
              note=""
              content={`${loanDetails[0]?.loanAccNumber}`}
            />
            <List
              title="Principal Amount"
              note=""
              content={`KSHs. ${loanDetails[0]?.principalAmount}`}
            />
            <List
              title="Loan Tenure"
              note=""
              content={`${
                loanDetails[0]?.repaymentCycle === "days"
                  ? Number(loanDetails[0]?.loanTenure) -
                    Number(loanDetails[0]?.sundays)
                  : loanDetails[0]?.loanTenure
              } ${loanDetails[0]?.repaymentCycle}`}
            />
            <List
              title="Interest Rate"
              note=""
              content={`${productDetails[0]?.interestRate} %`}
            />
            <List
              title="Interest Amount"
              note=""
              content={`KSHs. ${loanDetails[0]?.interestAmount}`}
            />
            <List
              title="Installment Amount"
              note=""
              content={`KSHs. ${loanDetails[0]?.installmentAmount}`}
            />
            <List
              title="Processing Fee Amount"
              note=""
              content={`KSHs. ${loanDetails[0]?.processingFee}`}
            />
            <List
              title="Processing Fee Rate"
              note=""
              content={`${productDetails[0]?.processingFee} %`}
            />
            {loanDetails[0]?.repaymentCycle === "days" && (
              <>
                <List
                  title="Penalty"
                  note=""
                  content={`${
                    productDetails[0]?.penaltyTypeChoice === "amount"
                      ? `KSHs. ${productDetails[0]?.penalty}`
                      : `${productDetails[0]?.penalty} %`
                  }`}
                />
                <List
                  title="Penalty Amount"
                  note=""
                  content={`${
                    productDetails[0]?.penaltyTypeChoice === "amount"
                      ? `KSHs. ${productDetails[0]?.penalty}`
                      : `KSHs. ${loanDetails[0]?.penaltyAmount}`
                  }`}
                />
                <List
                  title="Penalty Payment"
                  note=""
                  content={`${
                    productDetails[0]?.penaltyPaymentTypeChoice ===
                    "eachInstallment"
                      ? `Each Installment`
                      : `Last Installment`
                  }`}
                />
                <List
                  title="Repayment Cycle"
                  note=""
                  content={`Paid ${productDetails[0]?.repaymentCycle}`}
                />
                <List
                  title="Grace Period"
                  note=""
                  content={`${productDetails[0]?.gracePeriod} ${
                    productDetails[0]?.gracePeriod === "1" ? "day" : "days"
                  }`}
                />
              </>
            )}
          </ul>
        </div>
      {renderLoanOfficer()}
        <div className="flex justify-center mt-5">
          <div className="w-full md:w-1/3 mr-auto ml-auto">
            <button
              type="button"
              onClick={handleLoanApprove}
              className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {approving ? "Approving ..." : "Approve"}
            </button>
          </div>
        </div>
        <div>
          <ModalAlert
            open={open}
            onClose={() => setOpen(false)}
            title={loanDetails[0]?.memberNames}
            message="Navigate to Disbursed Loans ..."
            path="/loan/disbursements"
          >
            <div className="flex items-center w-full">
              <div className="bg-green-300 opacity-80 relative rounded-full p-2">
                <BsCheck2Circle className="w-10 font-bold text-black h-10" />
              </div>
              <div className="text-md p-3">
                <span className="font-bold text-3xl">
                  Successfully Approved!
                </span>
              </div>
            </div>
          </ModalAlert>
        </div>
        <div className="mb-8" />
        {/* <pre>{JSON.stringify(productDetails, undefined, 2)}</pre> */}
      </div>
    </>
  );
}
