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
  // const { memberId } = useParams();
  const [loanDetails, setLoanDetails] = useState("");
  const [memberDetails, setMemberDetails] = useState("");
  const [memberIdentity, setMemberIdentity] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLoanDetails = () => {
    const query = loanDetailQuery(loanId);
    const memberQuery = memberDetailQuery(memberIdentity);
    const productQuery = productDetailQuery(productType);

    if (query) {
      client.fetch(query).then((data) => {
        setLoanDetails(data);
      });
    }

    // window.location.reload()
    if (productQuery) {
      client.fetch(productQuery).then((data) => {
        setProductDetails(data);
      });
    }
    if (memberQuery) {
      client.fetch(memberQuery).then((data) => {
        setMemberDetails(data);
      });
    }
  }


  useEffect(() => {
    fetchLoanDetails();
  }, [loanId, memberIdentity, productType]);

  const ideaName = loanId || 'all';
  if (loading) {
    return (
      <Spinner message={`We are populating ${ideaName} loan data to your feed!`} />
    );
  }

  if (loanDetails?.length === 0) {
    return (
      <Spinner message={`We are populating ${ideaName} loan data to your feed!`} />
    )
  }

  function renderInterestAmount(rate, principal) {
    return ((rate * principal) / 100).toFixed(0);
  }

  function renderInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = ((rate * principal) / 100);
    return ((Number(principalAmount) + Number(principal)) / tenure).toFixed(0);
  }

  function renderProcessingFeeAmount(feePercentage, principal) {
    let procFee = ((feePercentage / 100) * principal).toFixed(0);
    return (procFee < 301 ? 300 : procFee)
  }

  function renderPenaltyAmount(penaltyPercentage, rate, principal, tenure) {
    return (((((rate * principal) / 100) + Number(principal)) / tenure) * (penaltyPercentage / 100)).toFixed(0);
  }

  function renderArrearsAmount(feePercentage, rate, principal, tenure) {
    let arrearsAmount = 0;
    let principalAmount = ((rate * principal) / 100);
    let installmentsAmount = ((Number(principalAmount) + Number(principal)) / tenure);
    let processingFeeAmount = ((feePercentage / 100) * Number(principal));
    arrearsAmount = (Number(installmentsAmount) * Number(tenure) + Number(processingFeeAmount)).toFixed(0);
    return arrearsAmount;
  }

  return (
    <>
      <div onMouseEnter={() => {
        setMemberIdentity(loanDetails[0].memberId)
        setProductType(loanDetails[0].productType)
      }}
      >
        <div className="font-bold mt-5 flex justify-center w-full text-3xl">
          <span className="text-gray-500">Preview of </span>
          <span className="text-gray-700 ml-3">{memberDetails[0]?.personalDetails?.surName} {memberDetails[0]?.personalDetails?.otherNames}</span>
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
              <span className="ml-auto">DC-{memberDetails[0]?.memberNumber}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Mobile No.
              </span>
              <span className="ml-auto">{memberDetails[0]?.personalDetails?.mobileNumber}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Email
              </span>
              <span className="ml-auto">{memberDetails[0]?.personalDetails?.emailAddress}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                ID Number
              </span>
              <span className="ml-auto">{memberDetails[0]?.personalDetails?.idPass}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Product Name
              </span>
              <span className="ml-auto">{productDetails[0]?.productName}</span>
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
              <span className="ml-auto">{productDetails[0]?.productName}</span>
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
              <span className="ml-auto">KShs. {loanDetails[0]?.loanTenure}</span>
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
              <span className="ml-auto">KSHs. {renderInterestAmount(productDetails[0]?.interestRate, loanDetails[0]?.principalAmount)}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Installment Amount
              </span>
              <span className="ml-auto">KSHs. {renderInterestAmount(productDetails[0]?.interestRate, loanDetails[0]?.principalAmount), loanDetails[0]?.loanTenure}</span>
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
              <span className="ml-auto">KShs. {renderProcessingFeeAmount(productDetails[0]?.processingFee, loanDetails[0]?.principalAmount)}</span>
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
                    <span className="ml-auto">KSHs. {renderPenaltyAmount(productDetails[0]?.penalty, productDetails[0]?.interestRate, loanDetails[0]?.principalAmount, loanDetails[0]?.loanTenure)}</span>
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
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Principal Range
              </span>
              <span className="ml-auto">KSHs. {productDetails[0]?.minimumRange} - KSHs. {productDetails[0]?.maximumRange}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Maximum Tenure
              </span>
              <span className="ml-auto">{productDetails[0]?.tenureMaximum} {productDetails[0]?.tenureMaximumChoice}</span>
            </li>
          </ul>
        </div>
        <pre>
          {/* {JSON.stringify(loanDetails, undefined, 2)} */}
          {/* {JSON.stringify(memberDetails, undefined, 2)} */}
          {/* {JSON.stringify(productDetails, undefined, 2)} */}
        </pre>
      </div>
    </>
  )
}


