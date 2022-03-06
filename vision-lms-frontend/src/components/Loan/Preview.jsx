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
  const [memberDetails, setMemberDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const [memberIdentity, setMemberIdentity] = useState("");
  const [productType, setProductType] = useState("");

  const [memberNames, setMemberNames] = useState("");
  const [memberPhoneNumber, setMemberPhoneNumber] = useState("");
  const [principalAmount, setPrincipalAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [productCode, setProductCode] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [processingFeeAmount, setProcessingFeeAmount] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");

  const [submitted, setSubmitted] = useState('');
  const [maintained, setMaintained] = useState('');
  const [approved, setApproved] = useState('');
  const [disbursed, setDisbursed] = useState('');

  const fetchLoanDetails = () => {
    const query = `*[_type == "approve" && loanId == '${loanId}']`;
    // const memberQuery = memberDetailQuery(memberIdentity);
    const productQuery = productDetailQuery(productType);

    if (query) {
      client.fetch(query).then((data) => {
        setLoanDetails(data);
      });
    }

    if (productQuery) {
      client.fetch(productQuery).then((data) => {
        setProductDetails(data);
      });
    }
    // if (memberQuery) {
    //   client.fetch(memberQuery).then((data) => {
    //     setMemberDetails(data);
    //   });
    // }
  }

  useEffect(() => {
    fetchLoanDetails();
    return console.log('unsubscribing')
  }, [loanId, productType]);

  console.log(productDetails)

  const handleLoanSave = () => {
    if (
      memberIdentity
      && loanId
      && productType
      && memberNames
      && principalAmount
      && loanTenure
      && productCode
      && interestAmount
      && installmentAmount
      && processingFeeAmount
      && penaltyAmount
      && memberPhoneNumber
      && maintained
      && approved
      && submitted
      && disbursed
    ) {
      console.log(
        memberIdentity
        , loanId
        , productType
        , memberNames
        , principalAmount
        , loanTenure
        , productCode
        , interestAmount
        , installmentAmount
        , penaltyAmount
        , processingFeeAmount
        , memberPhoneNumber
        , maintained
        , approved
        , submitted
        , disbursed
      )
      const doc = {
        _type: 'preview',
        memberIdentity
        , loanId
        , productType
        , memberNames
        , principalAmount
        , loanTenure
        , productCode
        , interestAmount
        , installmentAmount
        , penaltyAmount
        , processingFeeAmount
        , memberPhoneNumber
        , maintained
        , approved
        , submitted
        , disbursed
      };
      client.create(doc).then(() => {
        alert('Success')
        console.log(doc)
        navigate('/loan/approvals')
      });
    }
  }
  // console.log(subId)
  // console.log(loanDetails)
  return (
    <>
      <div onMouseEnter={() => {
        setProductType(loanDetails[0].productType)
      }}
      >
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
              <span className="ml-auto">{loanDetails[0]?.loanTenure} {productDetails[0]?.tenureMaximumChoice}</span>
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
                    <span className="ml-auto">KSHs. {loanDetails?.loanAccNumber}</span>
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
            {/* <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3"> */}
            {/*   <span> */}
            {/*     Principal Range */}
            {/*   </span> */}
            {/*   <span className="ml-auto">KSHs. {productDetails[0]?.minimumRange} - KSHs. {productDetails[0]?.maximumRange}</span> */}
            {/* </li> */}
            {/* <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3"> */}
            {/*   <span> */}
            {/*     Maximum Tenure */}
            {/*   </span> */}
            {/*   <span className="ml-auto">{productDetails[0]?.tenureMaximum} {productDetails[0]?.tenureMaximumChoice}</span> */}
            {/* </li> */}
          </ul>
        </div>
        <pre>
          {/* {JSON.stringify(loanDetails, undefined, 2)} */}
          {/* {JSON.stringify(memberDetails, undefined, 2)} */}
          {/* {JSON.stringify(productDetails, undefined, 2)} */}
        </pre>
        {/* <div className="flex w-full mt-8 justify-center items-center ml-8"> */}
        {/*   <button */}
        {/*     onClick={handleLoanSave} */}
        {/*     type="button" */}
        {/*     className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" */}
        {/*   > */}
        {/*     Submit */}
        {/*   </button> */}
        {/* </div> */}

        {/* {submittedList && */}
        {/*   submittedList.map((subs) => ( */}
        {/*     subs.loanId === subId ? */}
        {/*       subs.submitted === 'true' ? */}
        {/*         <div key={subs.loanId} className="flex justify-center mt-5"> */}
        {/*           <Link */}
        {/*             className="bg-green-500 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" */}
        {/*             to="/loan/approvals" */}
        {/*           // to={`/loan/approvals/${submittedList[0]?.loanId}`} */}
        {/*           > */}
        {/*             <span className="w-full md:w-1/3 mr-auto ml-auto"> */}
        {/*               Approvals */}
        {/*             </span> */}
        {/*           </Link> */}
        {/*         </div> */}
        {/*         : */}
        {/*         <div className="flex justify-center mt-5"> */}
        {/*           <div className="w-full md:w-1/3 mr-auto ml-auto"> */}
        {/*             <button */}
        {/*               type="button" */}
        {/*               // onClick={submittedList[0]?.submitted === 'true' ? navigate(`/loan/approvals/${submittedList[0]?.memberIdentity}`) : handleLoanSave} */}
        {/*               onClick={handleLoanSave} */}
        {/*               className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" */}
        {/*             > */}
        {/*               Save */}

        {/*             </button> */}
        {/*           </div> */}

        {/*           <div className="w-full md:w-1/3 mr-auto ml-auto"> */}
        {/*             <button */}
        {/*               type="button" */}
        {/*               onClick={handleLoanSave} */}
        {/*               // onClick={submittedList[0]?.submitted === 'true' ? navigate(`/loan/approvals/${submittedList[0]?.memberIdentity}`) : handleLoanSave} */}
        {/*               className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" */}
        {/*             > */}
        {/*               Submit */}
        {/*             </button> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       : */}
        {/*       null */}
        {/*   )) */}
        {/* } */}
        {/* {renderSubmission()} */}
        <div className="mb-8" />
      </div>
    </>
  )
}


