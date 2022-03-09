import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../../client';
import { productDetailQuery } from '../../utils/data';
import { v4 as uuidv4 } from 'uuid';

export default function PaymentDetail() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [loadLoan, setLoadLoan] = useState(false);
  const [addingPayment, setAddingPayment] = useState(false);

  const [amountPaid, setAmountPaid] = useState('');
  const [mpesaReferenceCode, setMpesaReferenceCode] = useState('');
  const [arrears, setArrears] = useState('');
  const [outstandingBalance, setOutstandingBalance] = useState("");
  const [outstandingPenalty, setOutstandingPenalty] = useState("");
  const [principalPaid, setPrincipalPaid] = useState("");
  const [interestPaid, setInterestPaid] = useState("");
  const [penaltyPaid, setPenaltyPaid] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");

  const fetchCustomerDetails = () => {
    const query = `*[_type == "payments" && _id == '${paymentId}']`;
    const productQuery = productDetailQuery(productType);

    if (productQuery) {
      client.fetch(productQuery).then((data) => {
        setProductDetails(data);
      });
    }

    client.fetch(query).then((data) => {
      setCustomerDetails(data);
    });
  }

  useEffect(() => {
    fetchCustomerDetails();
    return (() => console.log('unsubscribing'));
  }, [paymentId, productType]);

  const date = new Date();

  // console.log((Date().split(' ')[3] + '-' + date.getMonth() + '-' + (Number(date.getDate()) + 7) + ' ' + date.getDay()).toString() + ' | ' + (Date().split(' ')[0] + ' ' + Date().split(' ')[1] + ' ' + (Number(Date().split(' ')[2]) + 7) + ' ' + Date().split(' ')[3]).toString())

  const addPayment = () => {
    setArrears((Number(customerDetails[0]?.principalAmount) - Number(customerDetails[0]?.interestAmount)).toString());
    setOutstandingBalance((Number(customerDetails[0]?.principalAmount) - Number(amountPaid)).toString());
    setOutstandingPenalty("00");
    setPrincipalPaid("00");
    setInterestPaid("00");
    setPenaltyPaid("00");
    setInstallmentDate((Date().split(' ')[3] + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getDay()).toString() + ' | ' + (Date().split(' ')[0] + ' ' + Date().split(' ')[1] + ' ' + Date().split(' ')[2] + ' ' + Date().split(' ')[3]).toString())
    if (
      amountPaid
      && mpesaReferenceCode
      && arrears
      && outstandingBalance
      && outstandingPenalty
      && principalPaid
      && interestPaid
      && penaltyPaid
      && installmentDate
    ) {
      setAddingPayment(true);
      console.log('adding')
      client
        .patch(paymentId)
        .setIfMissing({ recentPayments: [] })
        .insert('after', 'recentPayments[-1]', [
          {
            amountPaid
            , mpesaReferenceCode
            , arrears
            , outstandingBalance
            , outstandingPenalty
            , principalPaid
            , interestPaid
            , penaltyPaid
            , installmentDate
            , _key: uuidv4()
          }
        ])
        .commit()
        .then(() => {
          fetchCustomerDetails();
          setAmountPaid('');
          setMpesaReferenceCode('');
          setAddingPayment(false);
          alert('Payment Added')
        });
    };
  };

  function renderLoanDetails() {
    return (
      <>
        <div
        >
          <div className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-0">
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
                <span className="ml-auto">{customerDetails[0]?.productType}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Loan A/C Number
                </span>
                <span className="ml-auto">DC-{customerDetails[0]?.loanAccNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Principal Amount
                </span>
                <span className="ml-auto">KShs. {customerDetails[0]?.principalAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Loan Tenure
                </span>
                <span className="ml-auto">{customerDetails[0]?.loanTenure} {customerDetails[0]?.repaymentCycle}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Interest Amount
                </span>
                <span className="ml-auto">KSHs. {customerDetails[0]?.interestAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Installment Amount
                </span>
                <span className="ml-auto">KSHs. {customerDetails[0]?.installmentAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Processing Fee Amount
                </span>
                <span className="ml-auto">KShs. {customerDetails[0]?.processingFeeAmount}</span>
              </li>
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
                  <span className="ml-auto">KSHs. {customerDetails[0]?.penaltyAmount}</span>
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
            </ul>
          </div>
          <div className="mb-8" />
        </div>
      </>
    )
  }

  function renderCustomerDetails() {
    return (
      <>
        <div
          onMouseEnter={() => {
            setProductType(customerDetails[0].productType)
          }}
        >
          <div className="font-bold mt-5 flex justify-center w-full text-3xl">
            <span className="text-gray-500">Payments for </span>
            <span className="text-gray-700 ml-3">{customerDetails[0]?.memberNames}</span>
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
                <span className="ml-auto">DC-{customerDetails[0]?.loanAccNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Mobile No.
                </span>
                <span className="ml-auto">{customerDetails[0]?.memberPhoneNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Email
                </span>
                <span className="ml-auto">{customerDetails[0]?.memberEmail}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  ID Number
                </span>
                <span className="ml-auto">{customerDetails[0]?.memberIdNumber}</span>
              </li>
            </ul>
          </div>
          <br />
        </div>
      </>
    )
  }

  function renderRecentPayments() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Loans Pending Approval</span>
        </div>
        <br />
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 border-b-2 border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">M-PESA Code</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penalty Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Penalty</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrears</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerDetails ? customerDetails[0]?.recentPayments?.map((payment) => (
                    <tr
                      // onClick={() => {
                      //   navigate(`/loan/approvals/${payment._id}`);
                      // }}
                      key={payment._id}
                      className="hover:bg-gray-300 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{payment.installmentDate.split('|')[1]}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{payment.amountPaid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.mpesaReferenceCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.penaltyPaid}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.interestPaid}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.principalPaid}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.outstandingPenalty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.arrears}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.outstandingBalance}</div>
                      </td>
                    </tr>
                  ))
                    :
                    null
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderLoanPayments() {
    return (
      <>
        <div
        >
          <div className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-0">
                <span className="font-bold text-xl mr-2">
                  Loan Payments Form
                </span>
              </div>
            </div>
            <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                  Amount Paid (KShs)
                  <span className="text-red-500 italic">*</span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  placeholder="Paid Amount ..."
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                  M-PESA Code
                  <span className="text-red-500 italic">*</span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 uppercase border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="string"
                  placeholder="M-PESA Code ..."
                  value={mpesaReferenceCode}
                  onChange={(e) => setMpesaReferenceCode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <button
                type="button"
                className="bg-cyan-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addPayment}
              >
                {addingPayment ? 'Adding ...' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {renderCustomerDetails()}
      {renderLoanPayments()}
      {renderRecentPayments()}
      {loadLoan ? null :
        <>
          <div className="flex justify-center mt-5">
            <div className="w-full md:w-1/3 mr-auto ml-auto">
              <button
                type="button"
                onClick={() => {
                  setLoadLoan(true);
                  setProductType(customerDetails[0].productType)
                }}
                className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Show Loan Details
              </button>
            </div>
          </div>
        </>
      }
      {loadLoan ? renderLoanDetails() : null}
      {!loadLoan ? null :
        <>
          <div className="flex justify-center mt-5">
            <div className="w-full md:w-1/3 mr-auto ml-auto">
              <button
                type="button"
                onClick={() => {
                  setLoadLoan(false);
                }}
                className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hide Loan Details
              </button>
            </div>
          </div>
        </>
      }
      <pre>{JSON.stringify(customerDetails, undefined, 2)}</pre>
    </>
  )
}





