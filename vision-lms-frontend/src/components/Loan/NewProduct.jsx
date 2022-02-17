import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// const productTwo = (principal, time) => {
//   return (principal * (1 + (interestRate * time)));
// }

export default function NewProduct() {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [minimumRange, setMinimumRange] = useState("");
  const [maximumRange, setMaximumRange] = useState("");
  const [interestRate, setInterestRate] = useState(0);

  const ID = uuidv4();
  console.log(ID)
  console.log(ID.split('-')[0])

  function renderNewProduct() {
    return (
      <div>
        <div className="w-full mt-5">
          <span className="flex uppercase mb-3 justify-center items-center sm:text-3xl p-2 font-bold text-3xl flex-col">New Product</span>
          <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full md:w-1/2 px-3 mb-0 md:mb-0">
              <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                Product Name
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="productName"
                type="text"
                placeholder="Product Name ..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                Product Code
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="productCode"
                type="text"
                placeholder="Product Code ..."
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
          </div>
          <div className="flex mt-0">
            <div className="w-1/3 mt-6">
              <div className="mt-2"></div>
              <label className="tracking-wide text-xs mb-2 m-3 flex-col p-2">
                <span className="uppercase mt-8 text-gray-700 font-bold text-md">
                  Loan Range
                </span>
              </label>
            </div>
            <div className="w-1/3">
              <label className="tracking-wide text-xs mb-2 m-3 p-2">
                <span className="uppercase text-gray-700 font-bold text-md">
                  Minimum
                </span>
              </label>
              <input
                id="minimumRange"
                type="text"
                className="appearance-none w-5/6 bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-right focus:outline-none focus:bg-white"
                placeholder="Minimum Range ..."
                value={minimumRange}
                onChange={(e) => setMinimumRange(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <label className="tracking-wide text-xs mb-2 m-3 p-2">
                <span className="uppercase text-gray-700 font-bold text-md">
                  Maximum
                </span>
              </label>
              <input
                id="maximumRange"
                type="text"
                className="appearance-nonew w-5/6 bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-right focus:outline-none focus:bg-white"
                placeholder="Maximum Range ..."
                value={maximumRange}
                onChange={(e) => setMaximumRange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-8 -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Interest Rate (%)</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="interestRate"
                type="number"
                placeholder="Interest Rate ..."
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Processing Fee (KShs)</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="processingFee"
                type="text"
                placeholder="Processing Fee ..."
              // value={processingFee}
              // onChange={(e) => setProcessingFee(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Loan Tenure</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="loanTenure"
                type="text"
                placeholder="Loan Tenure ..."
              // value={loanTenure}
              // onChange={(e) => setLoanTenure(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Repayment Cycle
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Grace Period
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>24 Hours</option>
                  <option>48 Hours</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">Penalty</div>
          <div className="flex">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                Amount (KShs)
                <span className="text-red-500 italic">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="penaltyAmount"
                type="text"
              // placeholder="Repayment Cycle ..."
              // value={surName}
              // onChange={(e) => setSurName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Repayment Cycle
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                Total Penalty (KShs)
              </label>
              <span
                className="appearance-none block w-full text-gray-700 justify-center items-center mt-5 ml-5"
                id="penaltyAmount"
                type="text"
              // placeholder="Repayment Cycle ..."
              // value={surName}
              // onChange={(e) => setSurName(e.target.value)}
              >KShs. ##### </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {renderNewProduct()}
    </>
  )
}

