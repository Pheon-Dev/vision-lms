import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { AiFillDelete } from "react-icons/ai"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, productDetailQuery, searchQuery, loanDetailQuery, memberDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'

export default function Preview() {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [loanDetails, setLoanDetails] = useState("");
  const [productId, setProductId] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const fetchLoanDetails = () => {
    const query = `*[_type == "approve" && loanId == '${loanId}']`;
    const pquery = `*[_type == "newProduct" && _id == '${productId}']`;
    let subscription = true;

    if (subscription) {
      client.fetch(pquery).then((data) => {
        setProductDetails(data);
      });

      client.fetch(query).then((data) => {
        setLoanDetails(data);
      });
    }

    return () => subscription = false;
  }

  useEffect(() => {
    fetchLoanDetails();
  }, [loanId, productId]);

  function renderActions() {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-1/2 p-2">
            <div className="w-full md:w-1/2 mr-auto ml-auto">
              <button
                type="button"
                onClick={() => { navigate(`/member/member-detail/${loanDetails[0]?.memberId}`) }}
                className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Back
              </button>
            </div>
          </div>
          <div className="w-1/2 p-2">
            <div className="w-full md:w-1/2 mr-auto ml-auto">
              <button
                type="button"
                onClick={() => {
                  setProductId(loanDetails[0]?.productId)
                }}
                onMouseEnter={() => setProductId(loanDetails[0]?.productId)}

                className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Product Details
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  function renderProductDetails() {
    return (
      <>
        {productDetails && productDetails?.map((product, index) => (
          <div key={index} className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-3">
                <Link to={`/loan/products/${product?._id}`} className="font-bold text-xl mr-2 hover:text-blue-500">
                  {product?.productName}
                </Link>
              </div>
            </div>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Product Code
                </span>
                <span className="ml-auto">DC-{product?.productCode}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Interest Rate
                </span>
                <span className="ml-auto">{product?.interestRate} %</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Interest Frequency
                </span>
                <span className="ml-auto">Per {product?.interestFrequency}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Processing Fee Percentage
                </span>
                <span className="ml-auto">{product?.processingFee} %</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Penalty
                </span>
                <span className="ml-auto">{product?.penaltyTypeChoice === 'amount' ? `KSHs. ${product?.penalty}` : `${product?.penalty} %`}</span>
              </li>
              {/* {product?.repaymentCycle === 'daily' && ( */}
              <>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Penalty Payment
                  </span>
                  <span className="ml-auto">{product?.penaltyPaymentChoice === 'perInstallment' ? 'Per Installment' : product?.penaltyPaymentChoice === 'lastInstallment' ? 'Last Installment' : 'Percentage of Principal'}</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Repayment Cycle
                  </span>
                  <span className="ml-auto">Paid {product?.repaymentCycle}</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Grace Period
                  </span>
                  <span className="ml-auto">{product?.gracePeriod} day</span>
                </li>
              </>
              {/* )} */}
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Principal Range
                </span>
                <span className="ml-auto">KSHs. {product?.minimumRange} - KSHs. {product?.maximumRange}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Maximum Tenure
                </span>
                <span className="ml-auto">{product?.tenureMaximum} {product?.tenureMaximumChoice}</span>
              </li>
            </ul>
          </div>
        ))}
      </>
    )
  }
  return (
    <>
      <div>
        <div className="font-bold mt-5 flex justify-center w-full text-3xl">
          <span className="text-gray-500">Preview of </span>
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
                Product Code
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
              <span className="ml-auto">{loanDetails[0]?.loanTenure} {loanDetails[0]?.repaymentCycle}</span>
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
                Processing Fee Amount
              </span>
              <span className="ml-auto">KShs. {loanDetails[0]?.processingFeeAmount}</span>
            </li>
            {loanDetails[0]?.repaymentCycle === 'days' && (
              <>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Penalty Amount
                  </span>
                  {loanDetails[0]?.penaltyTypeChoice === 'amount' ?
                    <span className="ml-auto">KSHs. {loanDetails[0]?.penalty}</span>
                    :
                    <span className="ml-auto">KSHs. {loanDetails?.loanAccNumber}</span>
                  }
                </li>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Penalty Payment
                  </span>
                  <span className="ml-auto">{loanDetails[0]?.penaltyPaymentChoice === 'perInstallment' ? 'Per Installment' : loanDetails[0]?.penaltyPaymentChoice === 'lastInstallment' ? 'Last Installment' : loanDetails[0]?.penaltyTypeChoice === 'amount' ? 'Each Installment' : 'Percentage of Principal'}</span>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="mb-8" />
      </div>
      {renderProductDetails()}
      {renderActions()}
    </>
  )
}


