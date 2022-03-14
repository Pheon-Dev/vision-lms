import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { client } from '../../client';
import { productDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'

export default function Disburse() {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false)

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
  const [interestDue, setInterestDue] = useState("");
  const [installmentsDue, setInstallmentsDue] = useState("");
  const [arrears, setArrears] = useState("");
  const [daysInArrears, setDaysInArrears] = useState("");
  const [disbursedAmount, setDisbursedAmount] = useState("");
  const [outstandingAmount, setOutstandingAmount] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState("");
  const [outstandingPenalty, setOutstandingPenalty] = useState("");
  const [penaltyDue, setPenaltyDue] = useState("");
  const [principalPaid, setPrincipalPaid] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [interestPaid, setInterestPaid] = useState("");
  const [penaltyPaid, setPenaltyPaid] = useState("");
  const [disbursementDate, setDisbursementDate] = useState("");
  const [firstInstallmentDate, setFirstInstallmentDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [mpesaReferenceCode, setMpesaReferenceCode] = useState("");

  const [approved, setApproved] = useState('false');
  const [maintained, setMaintained] = useState('true');
  const [disbursed, setDisbursed] = useState('false');
  const [payoff, setPayoff] = useState('false');
  const [loans, setLoans] = useState('');

  const fetchLoanDetails = () => {
    const date = new Date();
    const query = `*[_type == "approve" && _id == '${loanId}']`;
    const lquery = `*[_type == "payments" && memberId == '${memberId}']`;
    const productQuery = productDetailQuery(productType);
    let subscription = true;

    if (subscription) {
      client.fetch(query).then((data) => {
        setLoanDetails(data);
        setDisbursementDate(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate())
      });

      client.fetch(productQuery).then((data) => {
        setProductDetails(data);
      });

      client.fetch(lquery).then((data) => {
        setLoans(data);
      });
    }

    return () => subscription = false;

  }

  useEffect(() => {
    fetchLoanDetails();
  }, [loanId, productType, memberId]);

  // const ideaName = memberNames || 'all';
  // if (loading) {
  //   return (
  //     <Spinner message={`Fetching ${ideaName} data ...`} />
  //   );
  // }

  // if (loanDetails?.length === 0) {
  //   return (
  //     <Spinner message={`Fetching ${ideaName} data ...`} />
  //   )
  // }

  function renderFirstDailyInstallment(installment_date) {
    let day = installment_date.split('-')[2];
    let month = installment_date.split('-')[1];
    let year = installment_date.split('-')[0];
    const date = new Date(year, month, day);
    // date.setDate(date.getDate() + (Number(tenure) + 1))
    date.setDate(date.getDate() + 2)
    let result = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return result.toString();
  }

  function renderFirstWeeklyInstallment(installment_date) {
    let day = installment_date.split('-')[2];
    let month = installment_date.split('-')[1];
    let year = installment_date.split('-')[0];
    const date = new Date(year, month, day);
    // date.setDate(date.getDate() + (Number(tenure) * 7))
    date.setDate(date.getDate() + 7)
    let result = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return result.toString();
  }

  function renderFirstMonthlyInstallment(installment_date) {
    let day = installment_date.split('-')[2];
    let month = installment_date.split('-')[1];
    let year = installment_date.split('-')[0];
    const date = new Date(year, month, day);
    // date.setDate(date.getDate() + (Number(tenure) * 30))
    date.setDate(date.getDate() + 30)
    let result = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return result.toString();
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
    setDisbursedAmount(loanDetails[0]?.principalAmount);
    setOutstandingAmount((Number(loanDetails[0]?.principalAmount) + Number(loanDetails[0]?.interestAmount)).toString());
    setOutstandingPenalty('false')
    setFirstInstallmentDate(
      (
        loanDetails[0]?.repaymentCycle === 'days' ?
          renderFirstDailyInstallment(disbursementDate).split('-')[0]
          + '-' +
          renderFirstDailyInstallment(disbursementDate).split('-')[1]
          + '-' +
          renderFirstDailyInstallment(disbursementDate).split('-')[2]
          :
          loanDetails[0]?.repaymentCycle === 'weeks' ?
            renderFirstWeeklyInstallment(disbursementDate).split('-')[0]
            + '-' +
            renderFirstWeeklyInstallment(disbursementDate).split('-')[1]
            + '-' +
            renderFirstWeeklyInstallment(disbursementDate).split('-')[2]
            :
            renderFirstMonthlyInstallment(disbursementDate).split('-')[0]
            + '-' +
            renderFirstMonthlyInstallment(disbursementDate).split('-')[1]
            + '-' +
            renderFirstMonthlyInstallment(disbursementDate).split('-')[2]
      ));
    setReferenceNumber((`${loans?.length > 9 ? Number(loans?.length) + 1 : '0' + (Number(loans?.length) + 1)}-${loanDetails[0]?.loanAccNumber}`).toString());
    setMpesaReferenceCode("");
    console.log(
      loanId
      // , productType
      // , memberNames
      // , principalAmount
      // , loanTenure
      // , interestAmount
      // , installmentAmount
      // , penaltyAmount
      // , processingFeeAmount
      // , memberPhoneNumber
      // , maintained
      // , approved
      // , disbursed
      // , payoff
      // , memberId
      // , memberIdNumber
      // , memberEmail
      // , loanAccNumber
      // , repaymentCycle
      // , loanOfficerName
      // , loanOfficerPhoneNumber
      // , interestDue
      // , installmentsDue
      // , arrears
      // , daysInArrears
      // , disbursedAmount
      , disbursementDate
      // , outstandingAmount
      // , outstandingBalance
      // , outstandingPenalty
      // , penaltyDue
      // , principalPaid
      // , amountPaid
      // , interestPaid
      // , penaltyPaid
      , firstInstallmentDate
      // , referenceNumber
      // , mpesaReferenceCode
    )
  }

  const handleLoanDisburse = () => {
    if (
      loanId
      && productType
      && memberNames
      && principalAmount
      && loanTenure
      && payoff
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
      || interestDue
      || installmentsDue
      || arrears
      || daysInArrears
      && disbursedAmount
      && disbursementDate
      && outstandingAmount
      || outstandingBalance
      || outstandingPenalty
      || penaltyDue
      || principalPaid
      || amountPaid
      || interestPaid
      || penaltyPaid
      || firstInstallmentDate
      && referenceNumber
      || mpesaReferenceCode
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
        , firstInstallmentDate
        , referenceNumber
        , loanOfficerName
        , loanOfficerPhoneNumber
        , payoff
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
        , payoff
        , memberId
        , memberIdNumber
        , memberEmail
        , loanAccNumber
        , repaymentCycle
        , loanOfficerName
        , loanOfficerPhoneNumber
        , arrears
        , daysInArrears
        , disbursedAmount
        , disbursementDate
        , outstandingAmount
        , outstandingPenalty
        , firstInstallmentDate
        , referenceNumber
      };
      client.create(doc1).then(() => {
        alert('Success')
        console.log(doc1)
        navigate('/loan/payments')
      });
    }
  }

  const toggleClass = "transform translate-x-6"

  function renderLoaninfo() {
    return (
      <>
        <div>
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

  function renderPayoffButton() {
    return (
      //   Switch Container
      <div
        className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${!toggle ? 'bg-gray-400' : 'bg-green-500'} rounded-full p-1 cursor-pointer`}
        onClick={() => {
          setToggle(!toggle);
          setPayoff(!toggle ? 'true' : 'false');
        }}
      >
        {/* Switch */}
        <div
          className={`${!toggle ? 'bg-green-100' : 'bg-red-100'} md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md ease-in-out duration-500` + (toggle ? null : toggleClass)}
        >
        </div>
      </div>
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
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Reference Number
              </span>
              <span className="ml-auto">DC-{`${loans?.length > 9 ? Number(loans?.length) + 1 : '0' + (Number(loans?.length) + 1)}-${loanDetails[0]?.loanAccNumber}`}</span>
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
              {
                disbursementDate ?
                  <span className="ml-auto">{disbursementDate.split('-')[2] + '-' + disbursementDate.split('-')[1] + '-' + disbursementDate.split('-')[0]}</span>
                  :
                  null
              }
              {/* <input */}
              {/*   className="ml-auto rounded-lg" */}
              {/*   type="date" */}
              {/*   value={disbursementDate} */}
              {/*   onChange={(e) => setDisbursementDate(e.target.value)} */}
              {/* /> */}
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                First Installment Date
              </span>
              {
                loanDetails[0]?.repaymentCycle === 'days' ?
                  <span className="ml-auto">{renderFirstDailyInstallment(disbursementDate)}</span>
                  :
                  loanDetails[0]?.repaymentCycle === 'weeks' ?
                    <span className="ml-auto">{renderFirstWeeklyInstallment(disbursementDate)}</span>
                    :
                    <span className="ml-auto">{renderFirstMonthlyInstallment(disbursementDate)}</span>
              }
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Payoff
              </span>
              <span className="ml-auto">
                {renderPayoffButton()}
              </span>
            </li>
          </ul>
        </div>
        <br />
      </>
    )
  }

  function renderPayoff() {
    return (
      <>
        <div className="ml-auto mr-auto mb-3">
          <div className="flex justify-center items-center px-4 py-4">
            <div className="mt-3">
              <span className="font-bold text-red-400 text-xl mr-2">
                Payoff Details coming soon!
              </span>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      onMouseEnter={() => {
        setProductType(loanDetails[0]?.productType)
        setMemberId(loanDetails[0]?.memberId)
      }}
    >
      {renderLoaninfo()}
      {renderInitialInfo()}
      {toggle ? renderPayoff() : null}
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
    </div>
  )
}




