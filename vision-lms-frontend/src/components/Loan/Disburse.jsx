import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { ModalAlert } from "../Modals";
import { List } from "../Components";

import { client } from "../../client";

export default function Disburse() {
  const { loanId } = useParams();

  const [loanDetails, setLoanDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [disbursing, setDisbursing] = useState(false);
  const [open, setOpen] = useState(false);

  const [loanTenure, setLoanTenure] = useState("");
  const [memberId, setMemberId] = useState("");

  const [arrears, setArrears] = useState("");
  const [paymentCount, setPaymentCount] = useState("");
  const [counter, setCounter] = useState(0);
  const [paymentDay, setPaymentDay] = useState("");
  const [outstandingPenalty, setOutstandingPenalty] = useState("");
  const [disbursementDate, setDisbursementDate] = useState("");
  const [faceDisbursementDate, setFaceDisbursementDate] = useState("");
  const [firstInstallmentDate, setFirstInstallmentDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [loans, setLoans] = useState("");

  const fetchLoanDetails = () => {
    const date = new Date();
    const query = `*[_type == "maintenance" && _id == '${loanId}']`;
    const lquery = `*[_type == "maintenance" && memberId == '${memberId}']`;
    let subscription = true;

    if (subscription) {
      client.fetch(query).then((data) => {
        setLoanDetails(data);
        setFaceDisbursementDate(
          date.getFullYear() +
            (Number(date.getMonth() + 1) > 9 ? "-" : "-0") +
            Number(date.getMonth() + 1) +
            "-" +
            (Number(date.getDate()) > 9 ? "" : "0") +
            date.getDate()
        );
        setDisbursementDate(
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
        );
      });
      client.fetch(lquery).then((data) => {
        setLoans(data);
      });
    }

    return () => (subscription = false);
  };
  console.log(loans);

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
  }, [loanId, productType, memberId]);

  function renderFirstInstallmentDate(installment_date, cycle) {
    let day = installment_date.split("-")[2];
    let month = installment_date.split("-")[1];
    let year = installment_date.split("-")[0];
    const date = new Date(year, month, day);
    // date.setDate(date.getDate() + (Number(tenure) * 30))
    cycle === "days"
      ? date.setDate(date.getDate() + 2)
      : cycle === "weeks"
      ? date.setDate(date.getDate() + 7)
      : date.setDate(date.getDate() + 30);
    let result =
      (date.getDay() === 0
        ? (Number(date.getDate()) + 1).toString()
        : date.getDate()) +
      "-" +
      (Number(date.getMonth()) + 1).toString() +
      "-" +
      date.getFullYear();
    return result.toString();
  }

  const handleLoanSave = () => {
    setPaymentCount("zero");
    setCounter("zero");
    setLoanTenure(
      loanDetails[0]?.repaymentCycle === "days"
        ? (
            Number(loanDetails[0]?.loanTenure) - Number(loanDetails[0]?.sundays)
          ).toString()
        : loanDetails[0]?.loanTenure
    );
    setOutstandingPenalty("false");
    setPaymentDay("zero");
    setArrears("true");
    setFirstInstallmentDate(
      renderFirstInstallmentDate(
        disbursementDate,
        loanDetails[0]?.repaymentCycle
      ).split("-")[0] +
        "-" +
        (
          Number(
            renderFirstInstallmentDate(
              disbursementDate,
              loanDetails[0]?.repaymentCycle
            ).split("-")[1]
          ) - 1
        ).toString() +
        "-" +
        renderFirstInstallmentDate(
          disbursementDate,
          loanDetails[0]?.repaymentCycle
        ).split("-")[2]
    );
    setReferenceNumber(
      `${
        loans?.length > 99
          ? Number(loans?.length)
          : loans?.length > 9
          ? "0" + Number(loans?.length)
          : "00" + Number(loans?.length)
      }-${loanDetails[0]?.loanAccNumber}`.toString()
    );
  };

  const handleLoanDisburse = () => {
    if (
      (loanId &&
        loanTenure &&
        memberId &&
        counter &&
        paymentCount &&
        paymentDay &&
        arrears) ||
      (disbursementDate && outstandingPenalty) ||
      (firstInstallmentDate && referenceNumber)
    ) {
      setDisbursing(true);
      client
        .patch(loanId)
        .set({
          maintained: "true",
          approved: "true",
          disbursed: "true",
          loanTenure: loanTenure,
          loanId: loanId,
          memberId: memberId,
          counter: counter,
          paymentCount: paymentCount,
          paymentDay: paymentDay,
          arrears: arrears,
          disbursementDate: disbursementDate,
          outstandingPenalty: outstandingPenalty,
          firstInstallmentDate: firstInstallmentDate,
          referenceNumber: referenceNumber,
        })
        .commit()
        .then((update) => {
          setOpen(true);
          console.log(update);
        });
    }
  };

  function renderLoaninfo() {
    return (
      <>
        <div>
          <div className="font-bold mt-5 flex justify-center w-full text-3xl">
            <span className="text-gray-500">Disburse </span>
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
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <List
                title="Member Code"
                note=""
                content={`DC-${loanDetails[0]?.loanAccNumber.split("-")[1]}`}
              />
              <List
                title="Phone No."
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
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
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
          <div className="mb-8" />
        </div>
      </>
    );
  }

  function renderInitialInfo() {
    return (
      <>
        <div className="ml-auto mr-auto mb-3">
          <div className="flex justify-center items-center px-4 py-4">
            <div className="mt-3">
              <span className="font-bold text-xl mr-2">
                Initial Loan Details Before Disbursement
              </span>
            </div>
          </div>
          <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
            <List
              title="Reference Number"
              note=""
              content={`DC-${
                loans?.length > 99
                  ? Number(loans?.length)
                  : loans?.length > 9
                  ? "0" + Number(loans?.length)
                  : "00" + Number(loans?.length)
              }-${loanDetails[0]?.loanAccNumber}`}
            />
            <List
              title="Disbursement Amount"
              note=""
              content={`KSHs. ${loanDetails[0]?.principalAmount}`}
            />
            <List
              title="Disbursement Date"
              note=""
              content={`${
                faceDisbursementDate.split("-")[2] +
                "-" +
                faceDisbursementDate.split("-")[1] +
                "-" +
                faceDisbursementDate.split("-")[0]
              }`}
            />
            <List
              title="First Installment Date"
              note=""
              content={`${
                (Number(
                  renderFirstInstallmentDate(
                    disbursementDate,
                    loanDetails[0]?.repaymentCycle
                  ).split("-")[0]
                ) > 9
                  ? `${
                      renderFirstInstallmentDate(
                        disbursementDate,
                        loanDetails[0]?.repaymentCycle
                      ).split("-")[0]
                    }`
                  : `0${
                      renderFirstInstallmentDate(
                        disbursementDate,
                        loanDetails[0]?.repaymentCycle
                      ).split("-")[0]
                    }`) +
                (Number(
                  renderFirstInstallmentDate(
                    disbursementDate,
                    loanDetails[0]?.repaymentCycle
                  ).split("-")[1]
                ) > 9
                  ? `-${
                      renderFirstInstallmentDate(
                        disbursementDate,
                        loanDetails[0]?.repaymentCycle
                      ).split("-")[1]
                    }`
                  : `-0${
                      renderFirstInstallmentDate(
                        disbursementDate,
                        loanDetails[0]?.repaymentCycle
                      ).split("-")[1]
                    }`) +
                "-" +
                renderFirstInstallmentDate(
                  disbursementDate,
                  loanDetails[0]?.repaymentCycle
                ).split("-")[2]
              }`}
            />
          </ul>
        </div>
        <br />
      </>
    );
  }

  return (
    <div
      onMouseEnter={() => {
    fetchLoanDetails();
        setProductType(loanDetails[0]?.productType);
        setMemberId(loanDetails[0]?.memberId);
      }}
      onClick={() => {
    fetchLoanDetails();
        setProductType(loanDetails[0]?.productType);
        setMemberId(loanDetails[0]?.memberId);
      }}
    >
      {renderLoaninfo()}
      {renderInitialInfo()}
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/3 mr-auto ml-auto">
          <button
            type="button"
            onClick={handleLoanDisburse}
            onMouseEnter={handleLoanSave}
            className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {disbursing ? "Disbursing ..." : "Disburse"}
          </button>
        </div>
      </div>
      <div>
        <ModalAlert
          open={open}
          onClose={() => setOpen(false)}
          message="Navigate to Payments ..."
          title={loanDetails[0]?.memberNames}
          path="/loan/payments"
        >
          <div className="flex items-center w-full">
            <div className="bg-green-300 opacity-80 relative rounded-full p-2">
              <BsCheck2Circle className="w-10 font-bold text-black h-10" />
            </div>
            <div className="text-md p-3">
              <span className="font-bold text-3xl">
                Successfully Disbursed!
              </span>
            </div>
          </div>
        </ModalAlert>
      </div>
      {/* <pre>{JSON.stringify(loanDetails, undefined, 2)}</pre> */}
    </div>
  );
}
