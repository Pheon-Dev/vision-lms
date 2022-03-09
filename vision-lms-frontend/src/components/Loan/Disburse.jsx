import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { client } from '../../client';
import { productDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'

export default function Disburse() {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [loanDetails, setLoanDetails] = useState("");
  const [loanAccNumber, setLoanAccNumber] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");

  const [memberEmail, setMemberEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberIdNumber, setMemberIdNumber] = useState("");
  const [memberNames, setMemberNames] = useState("");
  const [memberPhoneNumber, setMemberPhoneNumber] = useState("");
  const [principalAmount, setPrincipalAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [processingFeeAmount, setProcessingFeeAmount] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [repaymentCycle, setRepaymentCycle] = useState("");

  const [loanOfficerName, setLoanOfficerName] = useState("");
  const [loanOfficerPhoneNumber, setLoanOfficerPhoneNumber] = useState("");
  const [interestDue, setInterestDue] = useState(0);
  const [installmentsDue, setInstallmentsDue] = useState(0);
  const [arrearsDue, setArrearsDue] = useState(0);
  const [daysInArrears, setDaysInArrears] = useState(0);
  const [disbursedAmount, setDisbursedAmount] = useState(0);
  const [disbursementDate, setDisbursementDate] = useState("");
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [outstandingPenalty, setOutstandingPenalty] = useState(0);
  const [penaltyDue, setPenaltyDue] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);
  const [penaltyPaid, setPenaltyPaid] = useState(0);
  const [installmentDate, setInstallmentsDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [mpesaReferenceCode, setMpesaReferenceCode] = useState("");

  const [approved, setApproved] = useState('false');
  const [maintained, setMaintained] = useState('true');
  const [disbursed, setDisbursed] = useState('false');

  const fetchLoanDetails = () => {
    setLoading(true)
    const query = `*[_type == "approve" && _id == '${loanId}']`;
    const productQuery = productDetailQuery(productType);

    client.fetch(query).then((data) => {
      setLoanDetails(data);
    });

    if (productQuery) {
      client.fetch(productQuery).then((data) => {
        setProductDetails(data);
      });
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchLoanDetails();
    return (() => console.log('unsubscribing'));
  }, [loanId, productType]);

  // console.log(loanDetails)

  const ideaName = memberNames || 'all';
  if (loading) {
    return (
      <Spinner message={`Fetching ${ideaName} data ...`} />
    );
  }

  if (loanDetails?.length === 0) {
    return (
      <Spinner message={`Fetching ${ideaName} data ...`} />
    )
  }

  const handleLoanSave = () => {
    setMaintained('true');
    setApproved('true');
    setDisbursed('true');
    setMemberId(loanDetails[0]?.memberId);
    setMemberEmail(loanDetails[0]?.memberEmail);
    setMemberIdNumber(loanDetails[0]?.memberIdNumber);
    setMemberNames(loanDetails[0]?.memberNames);
    setMemberPhoneNumber(loanDetails[0]?.memberPhoneNumber);
    setPrincipalAmount(loanDetails[0]?.principalAmount);
    setLoanTenure(loanDetails[0]?.loanTenure);
    setInterestAmount(loanDetails[0]?.interestAmount);
    setInstallmentAmount(loanDetails[0]?.installmentAmount);
    setProcessingFeeAmount(loanDetails[0]?.processingFeeAmount);
    setPenaltyAmount(loanDetails[0]?.penaltyAmount);
    setLoanAccNumber(loanDetails[0]?.loanAccNumber);
    setRepaymentCycle(loanDetails[0]?.repaymentCycle);
    setInterestDue(0);
    setInstallmentsDue(0);
    setArrearsDue(0);
    setDaysInArrears(0);
    setDisbursedAmount(0);
    setDisbursementDate("");
    setOutstandingAmount(0);
    setOutstandingBalance(0);
    setOutstandingPenalty(0);
    setPenaltyDue(0);
    setPrincipalPaid(0);
    setAmountPaid(0);
    setInterestPaid(0);
    setPenaltyPaid(0);
    setInstallmentsDate("");
    setReferenceNumber("");
    setMpesaReferenceCode("");
    console.log(
      loanId
      , productType
      , memberNames
      , principalAmount
      , loanTenure
      , interestAmount
      , installmentAmount
      , penaltyAmount
      , processingFeeAmount
      , memberPhoneNumber
      , maintained
      , approved
      , disbursed
      , memberId
      , memberIdNumber
      , memberEmail
      , loanAccNumber
      , repaymentCycle
      , loanOfficerName
      , loanOfficerPhoneNumber
      , interestDue
      , installmentsDue
      , arrearsDue
      , daysInArrears
      , disbursedAmount
      , disbursementDate
      , outstandingAmount
      , outstandingBalance
      , outstandingPenalty
      , penaltyDue
      , principalPaid
      , amountPaid
      , interestPaid
      , penaltyPaid
      , installmentDate
      , referenceNumber
      , mpesaReferenceCode
    )
  }

  const handleLoanDisburse = () => {
    if (
      loanId
      && productType
      && memberNames
      && principalAmount
      && loanTenure
      && interestAmount
      && installmentAmount
      && processingFeeAmount
      && penaltyAmount
      && memberPhoneNumber
      && maintained
      && approved
      && disbursed
      && memberId
      && memberIdNumber
      && memberEmail
      && loanAccNumber
      && repaymentCycle
      && loanOfficerName
      && loanOfficerPhoneNumber
      && interestDue
      && installmentsDue
      && arrearsDue
      && daysInArrears
      && disbursedAmount
      && disbursementDate
      && outstandingAmount
      && outstandingBalance
      && outstandingPenalty
      && penaltyDue
      && principalPaid
      && amountPaid
      && interestPaid
      && penaltyPaid
      && installmentDate
      && referenceNumber
      && mpesaReferenceCode
    ) {
      client
        .patch(loanId)
        .set({
          maintained: 'true',
          approved: 'true',
          disbursed: 'true'
        })
        .commit()
        .then((update) => {
          console.log(update);
        });
      const doc = {
        _type: 'disburse',
        loanId
        , productType
        , memberNames
        , principalAmount
        , loanTenure
        , interestAmount
        , installmentAmount
        , penaltyAmount
        , processingFeeAmount
        , memberPhoneNumber
        , maintained
        , approved
        , disbursed
        , memberId
        , memberIdNumber
        , memberEmail
        , loanAccNumber
        , repaymentCycle
        , disbursedAmount
        , disbursementDate
        , installmentDate
        , referenceNumber
        , loanOfficerName
        , loanOfficerPhoneNumber
      };
      client.create(doc).then(() => {
        console.log(doc)
      });
      const doc1 = {
        _type: 'payments',
        loanId
        , productType
        , memberNames
        , principalAmount
        , loanTenure
        , interestAmount
        , installmentAmount
        , penaltyAmount
        , processingFeeAmount
        , memberPhoneNumber
        , maintained
        , approved
        , disbursed
        , memberId
        , memberIdNumber
        , memberEmail
        , loanAccNumber
        , repaymentCycle
        , loanOfficerName
        , loanOfficerPhoneNumber
        , interestDue
        , installmentsDue
        , arrearsDue
        , daysInArrears
        , disbursedAmount
        , disbursementDate
        , outstandingAmount
        , outstandingBalance
        , outstandingPenalty
        , penaltyDue
        , principalPaid
        , amountPaid
        , interestPaid
        , penaltyPaid
        , installmentDate
        , referenceNumber
        , mpesaReferenceCode
      };
      client.create(doc1).then(() => {
        alert('Success')
        console.log(doc1)
        navigate('/loan')
      });
    }
  }

  function renderLoaninfo() {
    return (
      <>
        <div
          onMouseEnter={() => {
            setProductType(loanDetails[0].productType)
          }}
        >
          <div className="font-bold mt-5 flex justify-center w-full text-3xl">
            <span className="text-gray-500">Disburse </span>
            <span className="text-gray-700 ml-3">{loanDetails[0]?.memberNames}</span>
          </div>
          <br />
          <div className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-3">
                <span className="font-bold text-xl mr-2">
                  Personal Details
                </span>
              </div>
            </div>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Member Code
                </span>
                <span className="ml-auto">DC-{loanDetails[0]?.loanAccNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Mobile No.
                </span>
                <span className="ml-auto">{loanDetails[0]?.memberPhoneNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Email
                </span>
                <span className="ml-auto">{loanDetails[0]?.memberEmail}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  ID Number
                </span>
                <span className="ml-auto">{loanDetails[0]?.memberIdNumber}</span>
              </li>
            </ul>
          </div>
          <br />
          <div className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-3">
                <span className="font-bold text-xl mr-2">
                  Loan Details
                </span>
              </div>
            </div>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Product Name
                </span>
                <span className="ml-auto">{loanDetails[0]?.productType}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Loan A/C Number
                </span>
                <span className="ml-auto">DC-{loanDetails[0]?.loanAccNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Principal Amount
                </span>
                <span className="ml-auto">KShs. {loanDetails[0]?.principalAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Loan Tenure
                </span>
                <span className="ml-auto">{loanDetails[0]?.loanTenure} {productDetails[0]?.repaymentCycle === 'weekly' ? 'weeks' : null}{productDetails[0]?.repaymentCycle === 'monthly' ? 'months' : null}{productDetails[0]?.repaymentCycle === 'daily' ? 'days' : null}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Interest Rate
                </span>
                <span className="ml-auto">{productDetails[0]?.interestRate} %</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Interest Amount
                </span>
                <span className="ml-auto">KSHs. {loanDetails[0]?.interestAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Installment Amount
                </span>
                <span className="ml-auto">KSHs. {loanDetails[0]?.installmentAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Processing Fee Percentage
                </span>
                <span className="ml-auto">{productDetails[0]?.processingFee} %</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Processing Fee Amount
                </span>
                <span className="ml-auto">KShs. {loanDetails[0]?.processingFeeAmount}</span>
              </li>
              {productDetails[0]?.repaymentCycle === 'daily' && (
                <>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span>
                      Penalty
                    </span>
                    <span className="ml-auto">{productDetails[0]?.penaltyTypeChoice === 'amount' ? `KSHs. ${productDetails[0]?.penalty}` : `${productDetails[0]?.penalty} %`}</span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span>
                      Penalty Amount
                    </span>
                    {productDetails[0]?.penaltyTypeChoice === 'amount' ?
                      <span className="ml-auto">KSHs. {productDetails[0]?.penalty}</span>
                      :
                      <span className="ml-auto">KSHs. {loanDetails[0]?.penaltyAmount}</span>
                    }
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span>
                      Penalty Payment
                    </span>
                    <span className="ml-auto">{productDetails[0]?.penaltyPaymentChoice === 'perInstallment' ? 'Per Installment' : productDetails[0]?.penaltyPaymentChoice === 'lastInstallment' ? 'Last Installment' : productDetails[0]?.penaltyTypeChoice === 'amount' ? 'Each Installment' : 'Percentage of Principal'}</span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span>
                      Repayment Cycle
                    </span>
                    <span className="ml-auto">Paid {productDetails[0]?.repaymentCycle}</span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span>
                      Grace Period
                    </span>
                    <span className="ml-auto">{productDetails[0]?.gracePeriod} day</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="mb-8" />
        </div>
      </>
    )
  }

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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Full Names ..."
              value={loanOfficerName}
              onChange={(e) => setLoanOfficerName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Loan Officer Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="tel"
              placeholder="Phone Number ..."
              value={loanOfficerPhoneNumber}
              onChange={(e) => setLoanOfficerPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </>
    )
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
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Reference Number
              </span>
              <span className="ml-auto">DC-R001-{loanDetails[0]?.loanAccNumber}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Disbursement Amount
              </span>
              <span className="ml-auto">KSHs. {loanDetails[0]?.principalAmount}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Disbursement Date
              </span>
              <span className="ml-auto">{Date().split(' ')[0] + ' ' + Date().split(' ')[1] + ' ' + Date().split(' ')[2] + ' ' + Date().split(' ')[3]}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Installment Date
              </span>
              <span className="ml-auto">{Date().split(' ')[0] + ' ' + Date().split(' ')[1] + ' ' + Number(Number(Date().split(' ')[2]) + 7) + ' ' + Date().split(' ')[3]}</span>
            </li>
          </ul>
        </div>
        <br />
      </>
    )
  }

  return (
    <>
      {renderLoaninfo()}
      {renderInitialInfo()}
      {renderLoanOfficer()}
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/3 mr-auto ml-auto">
          <button
            type="button"
            onClick={handleLoanDisburse}
            onMouseEnter={handleLoanSave}
            className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Disburse
          </button>
        </div>
      </div>
    </>
  )
}




