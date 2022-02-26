import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { AiFillDelete } from "react-icons/ai"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, productDetailQuery, searchQuery, loanDetailQuery, memberDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'

export default function Approve() {
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

  const [approved, setApproved] = useState('false');
  const [maintained, setMaintained] = useState('true');
  const [disbursed, setDisbursed] = useState('false');

  const fetchLoanDetails = () => {
    setLoading(true)
    const query = `*[_type == "maintenance" && _id == '${loanId}']`;
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
  }, [loanId, productType]);

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

  const handleLoanSave = () => {
    setMaintained('true');
    setApproved('true');
    setDisbursed('false');
    setMemberId(loanDetails[0]?.memberId);
    setMemberEmail(loanDetails[0]?.memberEmail);
    setMemberIdNumber(loanDetails[0]?.memberIdNumber);
    setMemberNames(loanDetails[0]?.memberNames);
    setMemberPhoneNumber(loanDetails[0]?.memberPhoneNumber);
    setPrincipalAmount(loanDetails[0]?.principalAmount);
    setLoanTenure(loanDetails[0]?.loanTenure);
    setInterestAmount(loanDetails[0]?.interestAmount);
    setInstallmentAmount(loanDetails[0]?.installmentAmount);
    setProcessingFeeAmount(loanDetails[0]?.processingFee);
    setPenaltyAmount(loanDetails[0]?.penaltyAmount);
    setLoanAccNumber(loanDetails[0]?.loanAccNumber);
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
    )
  }

  const handleLoanApprove = () => {
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
    ) {
      client
        .patch(loanId)
        .set({
          maintained: 'true',
          approved: 'true',
          disbursed: 'false'
        })
        .commit()
        .then((update) => {
          console.log(update);
        });
      const doc = {
        _type: 'approve',
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
      };
      client.create(doc).then(() => {
        alert('Success')
        console.log(doc)
        navigate('/loan/disbursements')
      });
    }
  }
  return (
    <>
      <div
        onMouseEnter={() => {
          setProductType(loanDetails[0].productType)
        }}
      >
        <div className="font-bold mt-5 flex justify-center w-full text-3xl">
          <span className="text-gray-500">Approve </span>
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
              <span className="ml-auto">KShs. {loanDetails[0]?.processingFee}</span>
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
        <div className="flex justify-center mt-5">
          <div className="w-full md:w-1/3 mr-auto ml-auto">
            <button
              type="button"
              onClick={handleLoanApprove}
              onMouseEnter={handleLoanSave}
              className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="mb-8" />
      </div>
    </>
  )
}



