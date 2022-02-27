import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { client } from '../../client';

export default function NewProduct() {
  const [fields, setFields] = useState();
  const [product, setProduct] = useState();
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [minimumRange, setMinimumRange] = useState("");
  const [maximumRange, setMaximumRange] = useState("");
  const [interestRate, setInterestRate] = useState('');
  const [interestFrequency, setInterestFrequency] = useState('');
  const [penalty, setPenalty] = useState('');
  const [penaltyPaymentChoice, setPenaltyPaymentChoice] = useState('');
  const [penaltyTypeChoice, setPenaltyTypeChoice] = useState('');
  const [tenureMaximum, setTenureMaximum] = useState('');
  const [tenureMaximumChoice, setTenureMaximumChoice] = useState('');
  const [repaymentCycle, setRepaymentCycle] = useState('');
  const [processingFee, setProcessingFee] = useState('');
  const [gracePeriod, setGracePeriod] = useState('');

  const navigate = useNavigate();
  const [code, setCode] = useState();

  useEffect(() => {
    const query = '*[_type == "newProduct"]';

    client.fetch(query).then((data) => {
      setCode(data);
    });

    return (() => console.log('unsubscribing'));

  }, []);

  const frequencies = [
    {
      id: "0",
      label: "...",
      value: null,
    },
    // {
    //   id: "1",
    //   label: "Per Week",
    //   value: "week",
    // },
    {
      id: "1",
      label: "Per Month",
      value: "month",
    },
    {
      id: "2",
      label: "Per Annum",
      value: "annum",
    },
  ];

  const penalties = [
    {
      id: "0",
      label: "...",
      value: null,
    },
    {
      id: "1",
      label: "Percentage",
      value: "percentage",
    },
    {
      id: "2",
      label: "Amount (KSHs)",
      value: "amount",
    },
    // {
    //   id: "3",
    //   label: "Monthly Loan",
    //   value: "monthlyLoan",
    // },
  ];

  const payments = [
    {
      id: "0",
      label: "...",
      value: null,
    },
    {
      id: "1",
      label: "Per Installment",
      value: "perInstallment",
    },
    {
      id: "2",
      label: "Last Installment",
      value: "lastInstallment",
    },
    {
      id: "3",
      label: "% of Principal",
      value: "percentageOfPrincipal",
    },
  ];

  const tenures = [
    {
      id: "0",
      label: "...",
      value: null,
    },
    {
      id: "1",
      label: "Days",
      value: "days",
    },
    {
      id: "2",
      label: "Weeks",
      value: "weeks",
    },
    {
      id: "3",
      label: "Months",
      value: "months",
    },
  ];

  const cycles = [
    {
      id: "0",
      label: "...",
      value: null,
    },
    {
      id: "1",
      label: "Daily",
      value: "daily",
    },
    {
      id: "2",
      label: "Weekly",
      value: "weekly",
    },
    {
      id: "3",
      label: "Monthly",
      value: "monthly",
    },
  ];

  const grace = [
    {
      id: "0",
      label: "...",
      value: null,
    },
    {
      id: "1",
      label: "1 Day",
      value: "1",
    },
    // {
    //   id: "2",
    //   label: "2 Days",
    //   value: "2",
    // },
  ];

  const handleProductSave = () => {
    // setProductCode(`${Date().split(' ')[4].split(':')[0] + Date().split(' ')[4].split(':')[1] + Date().split(' ')[4].split(':')[2]}`)
    setProductCode(`${(code?.length > 9 ? code?.length > 99 ? code?.length > 999 ? (Number(code?.length) + 1) : 'P' + (Number(code?.length) + 1) : 'P0' + (Number(code?.length) + 1) : 'P00' + (Number(code?.length) + 1))}`)

    setGracePeriod(gracePeriod === '...' ? 'null' : gracePeriod)
    setPenaltyTypeChoice(penaltyTypeChoice === '...' ? 'null' : penaltyTypeChoice)
    setPenaltyPaymentChoice(penaltyPaymentChoice === '...' ? 'null' : penaltyPaymentChoice)
    if (productName
      && productCode
      && minimumRange
      && maximumRange
      && interestRate
      && interestFrequency
      && penalty
      && penaltyTypeChoice
      && penaltyPaymentChoice
      && tenureMaximum
      && repaymentCycle
      && processingFee
      && gracePeriod
      && product
    ) {
      const doc = {
        _type: 'newProduct',
        productName
        , productCode
        , minimumRange
        , maximumRange
        , interestRate
        , interestFrequency
        , penalty
        , penaltyTypeChoice
        , penaltyPaymentChoice
        , tenureMaximum
        , repaymentCycle
        , processingFee
        , gracePeriod
        , product
      };
      console.log(doc)
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
  const handleProductCreate = () => {
    if (productName
      && productCode
      && minimumRange
      && maximumRange
      && interestRate
      && interestFrequency
      && penalty
      && penaltyTypeChoice
      && penaltyPaymentChoice
      && tenureMaximum
      && repaymentCycle
      && processingFee
      && gracePeriod
      && product
    ) {
      const doc = {
        _type: 'newProduct',
        productName
        , productCode
        , minimumRange
        , maximumRange
        , interestRate
        , interestFrequency
        , penalty
        , penaltyTypeChoice
        , penaltyPaymentChoice
        , tenureMaximum
        , repaymentCycle
        , processingFee
        , gracePeriod
        , product
      };
      client.create(doc).then(() => {
        alert('Success')
        navigate('/loan/maintenance')
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


  function renderNewProduct() {
    return (
      <div>
        <div className="w-full mt-5">
          <span className="flex uppercase mb-3 justify-center items-center sm:text-3xl p-2 font-bold text-3xl flex-col">New Product</span>
          <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full md:w-1/2 px-3 mb-0 md:mb-0">
              <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                Product Name
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
              </label>
              <span
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                {`DC-${(code?.length > 9 ? code?.length > 99 ? code?.length > 999 ? (Number(code?.length) + 1) : 'P' + (Number(code?.length) + 1) : 'P0' + (Number(code?.length) + 1) : 'P00' + (Number(code?.length) + 1))}`}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap mt-8 -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Minimum Range (KShs)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="minimumRange"
                type="number"
                placeholder="Minimum Range ..."
                value={minimumRange}
                onChange={(e) => setMinimumRange(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Maximum Range (KSHs)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="maximumRange"
                type="number"
                placeholder="Maximum Range ..."
                value={maximumRange}
                onChange={(e) => setMaximumRange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Interest Rate (%)</span>
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
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Frequency (pm, pa)
              </label>
              <div className="relative">
                <select value={interestFrequency} onChange={(e) => setInterestFrequency(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  {frequencies.map((option) => (
                    <option key={option.id} value={option.value}>{option?.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Repayment Cycle
              </label>
              <div className="relative">
                <select value={repaymentCycle} onChange={(e) => { setRepaymentCycle(e.target.value); setProduct(e.target.value) }} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  {cycles.map((option) => (
                    <option key={option.id} value={option.value}>{option?.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Processing Fee (%)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="processingFee"
                type="number"
                placeholder="Processing Fee ..."
                value={processingFee}
                onChange={(e) => setProcessingFee(e.target.value)}
              />
            </div>
            {/* {repaymentCycle !== 'daily' && ( */}
            {/*   <div className="w-full md:w-1/3 px-3"> */}
            {/*     <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md"> */}
            {/*       Penalty Rate */}
            {/*       <span className="text-red-500 italic"> */}
            {/*         {penaltyTypeChoice === 'amount' ? `Minimum 300 /=` : null} */}
            {/*       </span> */}
            {/*     </label> */}
            {/*     <input */}
            {/*       className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" */}
            {/*       id="penalty" */}
            {/*       type="number" */}
            {/*       placeholder="Penalty ..." */}
            {/*       value={penalty} */}
            {/*       onChange={(e) => setPenalty(e.target.value)} */}
            {/*     /> */}
            {/*   </div> */}
            {/* )} */}
            {/* {repaymentCycle === 'daily' && ( */}
            <>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Grace Period
                </label>
                <div className="relative">
                  <select value={gracePeriod} onChange={(e) => setGracePeriod(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    {grace.map((option) => (
                      <option key={option.id} value={option.value}>{option?.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </>
            {/* )} */}
          </div>
          <div className="flex flex-wrap mt-8 -mx-3 mb-6">
            {/* {repaymentCycle === 'daily' && ( */}
            <div className="w-full md:w-1/3 px-3">
              <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                Penalty Rate
                <span className="text-red-500 italic">
                  {penaltyTypeChoice === 'amount' ? `Minimum 300 /=` : null}
                </span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="penalty"
                type="number"
                placeholder="Penalty ..."
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
              />
            </div>
            {/* )} */}
            {/* {repaymentCycle === 'daily' && ( */}
            <>

              <div className="w-full md:w-1/3 px-3">
                <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                  Penalty Type
                </label>
                <div className="relative">
                  <select value={penaltyTypeChoice} onChange={(e) => setPenaltyTypeChoice(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    {penalties.map((option) => (
                      <option key={option.id} value={option.value}>{option?.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                  Penalty Payment
                </label>
                <div className="relative">
                  <select value={penaltyPaymentChoice} onChange={(e) => setPenaltyPaymentChoice(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    {payments.map((option) => (
                      <option key={option.id} value={option.value}>{option?.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </>
            {/* )} */}
          </div>
          <div className="flex flex-wrap mt-8 -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Maximum Tenure</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="tenureMaximum"
                type="number"
                placeholder="Tenure Maximum ..."
                value={tenureMaximum}
                onChange={(e) => setTenureMaximum(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs mb-2">
              </label>
              <span
                className="appearance-none block w-full font-semibold text-xl text-gray-700 py-3 mt-5 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                {repaymentCycle === 'daily' ? tenures[1].value : repaymentCycle === 'weekly' ? tenures[2].value : tenures[3].value}
              </span>
            </div>
          </div>
        </div>
        {
          fields && (
            <p className="flex justify-center items-center ml-auto mr-auto text-red-500 mb-3 text-xl transition-all duration-150 ease-in">
              Please Fill All the Required Fields!
            </p>
          )
        }
        <div className="flex justify-center mt-5">
          <div className="w-full md:w-1/3 mr-auto ml-auto">
            <button
              type="button"
              onClick={handleProductCreate}
              onMouseEnter={handleProductSave}
              className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Product
            </button>
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

