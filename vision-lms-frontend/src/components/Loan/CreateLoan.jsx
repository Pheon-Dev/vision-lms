import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { client } from '../../client';
import { productDetailQuery } from '../../utils/data';

export default function CreateLoan() {
  const navigate = useNavigate();
  const [fields, setFields] = useState();

  const [memberId, setMemberId] = useState("");
  const [memberIdNumber, setMemberIdNumber] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberIdentity, setMemberIdentity] = useState("");
  const [memberDetail, setMemberDetail] = useState();
  const [membersList, setMembersList] = useState("");
  const [memberNames, setMemberNames] = useState("");
  const [memberPhoneNumber, setMemberPhoneNumber] = useState("");

  const [productList, setProductList] = useState("");
  const [productType, setProductType] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const [principalAmount, setPrincipalAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [loanAccNumber, setLoanAccNumber] = useState("");

  const [interestAmount, setInterestAmount] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [processingFee, setProcessingFee] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");

  const [maintained, setMaintained] = useState('');
  const [approved, setApproved] = useState('');
  const [disbursed, setDisbursed] = useState('');

  const id = memberIdentity.split(' ')[0]
  const sname = memberIdentity.split(' ')[1]
  const oname = memberIdentity.split(' ')[2] + ' ' + memberIdentity.split(' ')[3]
  const names = sname + ' ' + oname

  useEffect(() => {
    const membersListQuery = '*[_type == "member" && maintained == "false"]';
    const memberQuery = `*[_type == "member" && memberNumber match '${id}' || personalDetails.surName match '${sname}' || personalDetails.otherNames match '${oname}']`;
    const productListQuery = '*[_type == "newProduct"]';
    const productTypeQuery = productDetailQuery(productType);

    client.fetch(membersListQuery).then((data) => {
      setMembersList(data);
    });

    client.fetch(memberQuery).then((data) => {
      setMemberDetail(data);
    });

    client.fetch(productListQuery).then((data) => {
      setProductList(data);
    });

    if (productTypeQuery) {
      client.fetch(productTypeQuery).then((data) => {
        setProductDetails(data);
      });
    }

  }, [productType, id, sname, oname, names]);

  function renderInterestAmount(rate, principal) {
    return roundOff(((rate * principal) / 100));
  }

  function renderInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = ((rate * principal) / 100);
    return roundOff((Number(principalAmount) + Number(principal)) / tenure);
  }

  function renderProcessingFeeAmount(feePercentage, principal) {
    let procFee = roundOff((feePercentage / 100) * principal);
    return (procFee < '301' ? '300' : procFee)
  }

  function renderPenaltyAmount(penaltyPercentage, rate, principal, tenure) {
    return roundOff(((((rate * principal) / 100) + Number(principal)) / tenure) * (penaltyPercentage / 100));
  }

  function roundOff(x) {
    return ((Number((x).toString().split('.')[1]) > 0 ? Number((x).toString().split('.')[0]) + 1 : Number((x).toString().split('.')[0]) + 0).toString())
  }

  const handleLoanSave = () => {
    setMaintained('true');
    setApproved('false');
    setDisbursed('false');
    setMemberId(memberDetail[0]?._id);
    setMemberNames(memberDetail[0]?.personalDetails?.surName + ' ' + memberDetail[0]?.personalDetails?.otherNames);
    setMemberPhoneNumber(memberDetail[0]?.personalDetails?.mobileNumber);
    setInterestAmount(renderInterestAmount(productDetails[0]?.interestRate, principalAmount).toString());
    setInstallmentAmount(renderInstallmentsAmount(productDetails[0]?.interestRate, principalAmount, loanTenure).toString());
    setProcessingFee(renderProcessingFeeAmount(productDetails[0]?.processingFee, principalAmount).toString());
    setPenaltyAmount(productDetails[0]?.penaltyTypeChoice === 'amount' ? productDetails[0]?.penalty : renderPenaltyAmount(productDetails[0]?.penalty, productDetails[0]?.interestRate, principalAmount, loanTenure).toString());
    setLoanAccNumber(productDetails[0]?.productCode + '-' + memberDetail[0]?.memberNumber)
    setMemberIdNumber(memberDetail[0]?.personalDetails?.idPass)
    setMemberEmail(memberDetail[0]?.personalDetails?.emailAddress)
  }

  const handleLoanSubmit = () => {
    if (
      productType
      && principalAmount
      && memberId
      && memberIdNumber
      && memberEmail
      && memberNames
      && memberPhoneNumber
      && loanTenure
      && interestAmount
      && installmentAmount
      && processingFee
      && penaltyAmount
      && maintained
      && approved
      && disbursed
      && loanAccNumber
    ) {
      client
        .patch(memberId)
        .set({
          maintained: 'true',
        })
        .commit()
        .then((update) => {
          console.log(update);
        });
      const doc = {
        _type: 'maintenance',
        productType
        , principalAmount
        , memberId
        , memberIdNumber
        , memberEmail
        , memberNames
        , memberPhoneNumber
        , loanTenure
        , interestAmount
        , installmentAmount
        , processingFee
        , penaltyAmount
        , maintained
        , approved
        , disbursed
        , loanAccNumber
      };
      client.create(doc).then(() => {
        alert('Loan Maintained Successfully!')
        console.log('Submitted', doc)
        navigate("/loan/approvals")
        // navigate(`/loan/preview/${_id}`)
      });

    } else {
      setFields(true);
      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  }

  function renderMaintenance() {
    return (
      <>
        <div
          onMouseEnter={() => setMemberId(memberDetail[0]?._id)}
          className="w-full md:w-full md:mx-2"
        >
          {memberDetail && productDetails && (
            <>
              <div className="flex justify-center items-center px-4 py-4">
                {
                  membersList.length !== 0 ?
                    <div className="mt-3">
                      {memberDetail.length === 0 ?
                        <span className="font-bold text-blue-500 text-xl mr-2">
                          Select a Member
                        </span>
                        :
                        <>
                          <span className="font-bold text-gray-500 text-xl mr-2">
                            Maintain
                          </span>
                          <span className="font-bold text-gray-500 text-xl mr-2">
                            for
                          </span>
                          <span className="font-bold text-xl mr-2">
                            {memberDetail[0]?.personalDetails?.surName + ' ' + memberDetail[0]?.personalDetails?.otherNames}
                          </span>
                        </>
                      }
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center ml-auto mr-auto">
                      <div className="mt-3">
                        <span className="font-bold text-red-500 text-xl mr-2">
                          No
                        </span>
                        <span className="font-bold text-gray-500 text-xl mr-2">
                          members available ...
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-blue-500 text-xl mr-2">
                          They've either been maintained for or have an active loan.
                        </span>
                      </div>
                    </div>
                }
              </div>
              <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Select a Member
                  </label>
                  <div className="relative">
                    <select value={memberIdentity} onChange={(e) => setMemberIdentity(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                      <option
                        className="text-gray-500"
                      >Select a Member ...</option>
                      {
                        membersList && (
                          membersList?.map((member, index) => (
                            <option key={index.toString()}>{member.memberNumber + ' ' + member.personalDetails.surName + ' ' + member.personalDetails.otherNames}</option>
                          )
                          ))
                      }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Select a Product
                  </label>
                  <div className="relative">
                    <select value={productType} onChange={(e) => setProductType(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                      <option
                        className="text-gray-500"
                      >Select a Product ...</option>
                      {productList && (
                        productList?.map((item, index) => (
                          <option key={index.toString()}>{item.productName}</option>
                        )
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                    Amount (KShs)
                    <span className="text-red-500 italic">*</span>
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="principalAmount"
                    type="number"
                    placeholder="Principal Amount ..."
                    value={principalAmount}
                    onChange={(e) => setPrincipalAmount(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block tracking-wide text-xs mb-2">
                    <span className="uppercase text-gray-700 font-bold text-md">Loan Tenure </span>
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="loanTenure"
                    type="number"
                    placeholder="Loan Tenure ..."
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                  />
                </div>
              </div>
              {productDetails && productDetails?.map((item, index) => (
                <>
                  <span key={item._id} className="flex justify-center w-full text-red-500 italic">{Number(loanTenure) > Number(item.tenureMaximum) ? `Maximum Tenure is ${item.tenureMaximum} ${item.tenureMaximumChoice}` : null}</span>
                  <span className="flex justify-center w-full text-red-500 italic">{Number(principalAmount) > Number(item.maximumRange) ? `Maximum Principal Amount is KSHs. ${item.maximumRange}` : null}</span>
                  <span className="flex justify-center w-full text-red-500 italic">{Number(principalAmount) < Number(item.minimumRange) ? `Minimum Principal Amount is KSHs. ${item.minimumRange}` : null}</span>
                  <div key={index.toString()} className="flex flex-wrap">
                    <ul className="bg-gray-100 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Product Type
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          {item.productName}
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Loan A/C Number
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          DC-{item.productCode}-{memberDetail[0]?.memberNumber}
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Interest Rate
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          {item?.interestRate}
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Interest Amount
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          KSHs. {renderInterestAmount(item?.interestRate, principalAmount)}
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Installments
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          KSHs. {renderInstallmentsAmount(item?.interestRate, principalAmount, loanTenure)}
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Repayment Cycle
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          {item?.repaymentCycle}
                        </span>
                      </li>
                      {item?.repaymentCycle === 'daily' ?
                        <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                          <span className="tracking-wide text-l text-gray-700 font-bold">
                            Grace Period
                          </span>
                          <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                            {item?.gracePeriod}
                          </span>
                        </li>
                        :
                        null
                      }
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Processing Fee
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          KSHs. {renderProcessingFeeAmount(item?.processingFee, principalAmount)}
                        </span>
                      </li>
                      {item?.repaymentCycle === 'daily' ?
                        <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                          <span className="tracking-wide text-l text-gray-700 font-bold">
                            Penalty
                          </span>
                          <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                            {item?.penaltyTypeChoice === 'amount' ? `KSHs. ${item?.penalty}` : `${renderPenaltyAmount(item?.penalty, item?.interestRate, principalAmount, loanTenure)} %`}
                          </span>
                        </li>
                        :
                        <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                          <span className="tracking-wide text-l text-gray-700 font-bold">
                            Penalty
                          </span>
                          <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                            {item?.penaltyTypeChoice === 'amount' ? `KSHs. ${item?.penalty}` : `${item?.penalty} %`}
                          </span>
                        </li>
                      }
                    </ul>
                  </div>
                </>
              ))}
              {memberDetail.length !== 0 ?
                <div>
                  <div className="ml-auto mr-auto mb-3">
                    <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Member Code
                        </span>
                        <span className="ml-auto">DC-{memberDetail[0]?.memberNumber}</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Mobile No.
                        </span>
                        <span className="ml-auto">{memberDetail[0]?.personalDetails?.mobileNumber}</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Email
                        </span>
                        <span className="ml-auto">{memberDetail[0]?.personalDetails?.emailAddress}</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          ID Number
                        </span>
                        <span className="ml-auto">{memberDetail[0]?.personalDetails?.idPass}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                :
                null
              }

            </>
          )}
        </div>
        <>
          <div className="flex justify-center mt-5">
            <div className="w-full md:w-1/3 mr-auto ml-auto">
              <button
                type="button"
                onClick={handleLoanSubmit}
                onMouseEnter={handleLoanSave}
                className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-1/2 ml-auto mr-auto">
              {
                fields && (
                  <p className="text-red-500 mt-3 text-xl transition-all duration-150 ease-in">
                    Please Fill All the Required Fields!
                  </p>
                )
              }
            </div>
          </div>
        </>
        {/* <pre>{JSON.stringify(memberDetail, undefined, 2)}</pre> */}
        <br />
      </>
    )
  }

  return (
    <>
      {membersList?.length === 0 ?
        <>
          <div className="flex flex-col justify-center items-center ml-auto mr-auto">
            <div className="mt-9">
              <span className="font-bold text-red-500 text-xl mr-2">
                No
              </span>
              <span className="font-bold text-gray-500 text-xl mr-2">
                members available ...
              </span>
            </div>
            <div className="mt-5">
              <span className="font-bold text-blue-400 text-xl mr-2">
                They've either been maintained for or have an active loan.
              </span>
            </div>
            <div className="mt-0">
              <span className="font-bold text-blue-500 text-xl mr-2">
                Checkout the approval list ...
              </span>
            </div>
            <div className="mt-8">
              <Link
                to="/loan/approvals"
                className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Approval List
              </Link>
            </div>
          </div>
        </>
        :
        renderMaintenance()
      }
    </>
  );
}


