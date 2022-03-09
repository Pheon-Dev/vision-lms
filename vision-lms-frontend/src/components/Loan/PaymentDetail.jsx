import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../../client';
import { productDetailQuery } from '../../utils/data';

export default function PaymentDetail() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [loadLoan, setLoadLoan] = useState(false);

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

  return (
    <>
      {renderCustomerDetails()}
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





