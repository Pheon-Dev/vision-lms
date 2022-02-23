import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { AiFillDelete } from "react-icons/ai"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, productDetailQuery, memberDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'


export default function MaintenanceDetail() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState();
  const [memberDetail, setMemberDetail] = useState();
  const [comment, setComment] = useState('');

  const [productList, setProductList] = useState("");
  const [productType, setProductType] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [principalAmount, setPrincipalAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [installments, setInstallments] = useState("");
  const [processingFee, setProcessingFee] = useState("");
  const [repaymentCycle, setRepaymentCycle] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [arrears, setArrears] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");

  const [addingCollaterals, setAddingCollaterals] = useState(false);
  const [collateralList, setCollateralList] = useState([{ collateral: "", value: "", image: "" }]);
  const [guarantor, setGuarantor] = useState([{ fullName: "", idNumber: "", phoneNumber: "", relationship: "" }]);

  useEffect(() => {
    const query = '*[_type == "newProduct"]';

    client.fetch(query).then((data) => {
      setProductList(data);
    });

  }, []);

  const fetchProductDetails = () => {
    const query = productDetailQuery(productType);

    if (query) {
      client.fetch(query).then((data) => {
        setProductDetails(data);
      });
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productType]);


  const fetchMemberDetails = () => {
    let query = memberDetailQuery(memberId);

    if (query) {
      client.fetch(query).then((data) => {
        setMemberDetail(data[0]);
        // console.log(data);
        if (data[0]) {
          query = memberDetailMoreMemberQuery(data[0]);
          client.fetch(query).then((res) => {
            setMembers(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(memberId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchMemberDetails();
          setComment('');
          setAddingComment(false);
        });
    };
  };

  if (!memberDetail) {
    return (
      <Spinner message="Loading Member Details ..." />
    );
  };
  const handleCollateralChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...collateralList];
    list[index][name] = value;
    setCollateralList(list);
  };

  const handleCollateralAdd = () => {
    setCollateralList([...collateralList, { collateral: "", value: "" }]);
  };

  const handleCollateralDelete = (index) => {
    const list = [...collateralList];
    list.splice(index, 1);
    setCollateralList(list);
  };

  const handleCollateralSave = () => {
    if (collateralList) {
      const doc = {
        collateralList,
      };
      // client.create(doc).then(() => {
      //   navigate('/');
      // });
      console.log(doc)
    }
    // navigate("/create-group")
  };

  const handleLoanSave = () => {
    // setMemberNames(memberDetail?.surName + memberDetail?.otherNames)
    if (
      productType
      && principalAmount
      && memberId
      // && startDate
      // && endDate
      && loanTenure
    ) {
      const doc = {
        _type: 'maintenance',
        productType
        , principalAmount
        , memberId
        // , startDate
        // , endDate
        , loanTenure
      };
      client.create(doc).then(() => {
        alert('Success')
        console.log(doc)
        navigate('/loan')
      });
    }
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
    <div>
      <div className="w-full md:w-full md:mx-2">
        {memberDetail && productDetails && (
          <>
            <div className="bg-white p-3">
              <div className="image overflow-hidden">
                <img className="h-auto w-1/4 mx-auto" src={(memberDetail?.image && urlFor(memberDetail?.image).url())} alt="member-profile-pic" />
              </div>
              <div className="text-gray-900 flex justify-center font-bold text-xl leading-8 my-1">{memberDetail?.personalDetails.surName} {memberDetail?.personalDetails.otherNames}</div>
              <ul className="bg-gray-100 border border-gray-300 w-full md:w-1/2 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>
                    Date Registered
                  </span>
                  <span className="ml-auto">{memberDetail?.date}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>
                    Phone Number
                  </span>
                  <span className="ml-auto">{memberDetail?.personalDetails.mobileNumber}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>
                    Member Number
                  </span>
                  <span className="ml-auto">{memberDetail?.memberNumber}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Fee Payment</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">{memberDetail?.personalDetails.mpesaTransNumber}</span>
                  </span>
                </li>
              </ul>
            </div>

          </>
        )}
        <div className="my-4"></div>
        <div className="bg-white hidden p-3 hover:shadow">
          <div className="flex items-center flex justify-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
            <span className="text-cyan-500">
              <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            <span>Group Members</span>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-center my-2">
              <img className="h-16 w-16 rounded-full mx-auto" alt="group-member" src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg" />
              <a href="#" className="text-main-color">Sam Smith</a>
            </div>
            <div className="text-center my-2">
              <img className="h-16 w-16 rounded-full mx-auto" alt="group-member" src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg" />
              <a href="#" className="text-main-color">Rose Mayor</a>
            </div>
            <div className="text-center my-2">
              <img className="h-16 w-16 rounded-full mx-auto" alt="group-member" src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png" />
              <a href="#" className="text-main-color">Ben Foster</a>
            </div>
          </div>
        </div>
        {/* Loan */}

        <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold mt-5 p-2">Loan Maintenance</div>
        <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
          <div className="w-full md:w-1/3 px-3">
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
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Select Product
            </label>
            <div className="relative">
              <select value={productType} onChange={(e) => setProductType(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option
                  className="text-gray-500"
                >Select a Product ...</option>
                {productList === 0 ? null : productList?.map((item, index) => (
                  <option key={index.toString()}>{item.productName}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex hidden flex-wrap mr-auto ml-auto mt-8 -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Start Date</span>
              {/* <span className="text-red-500 italic">*</span> */}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="startDate"
              type="date"
              placeholder="Start Date..."
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">End Date</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="endDate"
              type="date"
              placeholder="End Date..."
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {productDetails?.map((item, index) => (
          <>
            <span className="flex justify-center w-full text-red-500 italic">{Number(loanTenure) > Number(item.tenureMaximum) ? `Maximum Tenure is ${item.tenureMaximum} ${item.tenureMaximumChoice}` : null}</span>
            <span className="flex justify-center w-full text-red-500 italic">{Number(principalAmount) > Number(item.maximumRange) ? `Maximum Principal Amount is KSHs. ${item.maximumRange}` : null}</span>
            <span className="flex justify-center w-full text-red-500 italic">{Number(principalAmount) < Number(item.minimumRange) ? `Minimum Principal Amount is KSHs. ${item.minimumRange}` : null}</span>
            <div key={index.toString()} className="bg-white flex flex-wrap p-3">
              <ul className="bg-gray-100 w-full md:w-1/2 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Interest Rate
                  </span>
                  <span value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {item?.interestRate}
                  </span>
                </li>
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Interest Amount
                  </span>
                  <span value={interestAmount} onChange={(e) => setInterestAmount(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {/* KSHs. {(item?.interestRate * principalAmount) / 100} */}
                    KSHs. {renderInterestAmount(item?.interestRate, principalAmount)}
                  </span>
                </li>
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Installments
                  </span>
                  <span value={installments} onChange={(e) => setInstallments(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {/* KSHs. {((((item?.interestRate * principalAmount) / 100) + principalAmount) / loanTenure / 30).toFixed(0)} */}
                    KSHs. {renderInstallmentsAmount(item?.interestRate, principalAmount, loanTenure)}
                  </span>
                </li>
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Processing Fee
                  </span>
                  <span value={processingFee} onChange={(e) => setProcessingFee(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {/* KSHs. {(item?.processingFee / 100) * principalAmount} */}
                    KSHs. {renderProcessingFeeAmount(item?.processingFee, principalAmount)}
                  </span>
                </li>
              </ul>
              <ul className="bg-gray-100 border-l-2 border-gray-300 w-full md:w-1/2 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Repayment Cycle
                  </span>
                  <span value={repaymentCycle} onChange={(e) => setRepaymentCycle(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {item?.repaymentCycle}
                  </span>
                </li>
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Grace Period
                  </span>
                  <span value={gracePeriod} onChange={(e) => setGracePeriod(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {item?.gracePeriod}
                  </span>
                </li>
                {/* <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3"> */}
                {/*   <span className="tracking-wide text-l text-gray-700 font-bold"> */}
                {/*     Arrears */}
                {/*   </span> */}
                {/*   <span value={arrears} onChange={(e) => setArrears(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto"> */}
                {/* KSHs. 00 */}
                {/* KSHs. {renderArrearsAmount(item?.penaltyPercentage, item?.processingFee, item?.interestRate, principalAmount, loanTenure)} */}
                {/*     KSHs. {renderArrearsAmount(item?.processingFee, item?.interestRate, principalAmount, loanTenure)} */}
                {/*   </span> */}
                {/* </li> */}
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Product Code
                  </span>
                  <span value={arrears} onChange={(e) => setArrears(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {/* KSHs. 00 */}
                    {/* KSHs. {renderArrearsAmount(item?.penaltyPercentage, item?.processingFee, item?.interestRate, principalAmount, loanTenure)} */}
                    DC-{item.productCode}
                  </span>
                </li>
                <li className="flex items-center hover:bg-gray-300 p-2 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Penalty
                  </span>
                  <span value={penaltyAmount} onChange={(e) => setPenaltyAmount(e.target.value)} className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                    {/* KSHs. {((item?.penaltyPercentage / 100) * (((item?.interestRate * principalAmount) / 100) + principalAmount) / loanTenure / 30).toFixed(0)} */}
                    KSHs. {renderPenaltyAmount(item?.penaltyPercentage, item?.interestRate, principalAmount, loanTenure)}
                  </span>
                </li>
              </ul>
            </div>
          </>
        ))}
        <div className="flex hidden flex-col uppercase text-xl text-gray-700 mb-5 items-center sm:text-xl font-semibold p-2">Guarantors add new or select</div>
        <div className="flex hidden flex-col justify-center w-full flex-wrap -mx-3 mt-9">
          <div className="flex flex-col uppercase text-xl text-gray-700 mb-5 items-center sm:text-xl font-semibold p-2">Collateral List</div>
          <div className="flex w-full md:w-1/2 mb-6 mr-auto ml-auto flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">Collateral Items</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">Value (KSHs)</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
          </div>
          {collateralList.map((singleItem, index) => (
            <div key={index.toString()} >
              <div className="flex flex-wrap w-full mb-2">
                <span className="font-bold flex justify-end w-1/6 text-gray-700 p-2 mt-1">{index + 1}.</span>
                <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="collateralName"
                    type="text"
                    name="collateral"
                    placeholder="Item Name ..."
                    value={singleItem.collateral}
                    onChange={(e) => handleCollateralChange(e, index)}
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="idNumber"
                    type="number"
                    name="value"
                    placeholder="Value ..."
                    value={singleItem.value}
                    onChange={(e) => handleCollateralChange(e, index)}
                    required
                  />
                </div>
                {collateralList.length !== 1 && (
                  <span className="w-full md:w-1/6">
                    <button
                      onClick={() => handleCollateralDelete(index)}
                      type="button"
                      className="text-red-400 hover:text-red-600 p-2 mt-1 font-bold"
                    >
                      <AiFillDelete />
                    </button>
                  </span>
                )}
              </div>
              {collateralList.length - 1 === index && collateralList.length < 10 && (
                <div className="flex justify-center items-center">
                  <button
                    onClick={handleCollateralAdd}
                    type="button"
                    className="bg-blue-500 m-2 w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add a Item +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full mt-8 justify-center items-center ml-8">
          <button
            onClick={handleLoanSave}
            type="button"
            className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
        <div className="mb-6" />
      </div>
    </div>
  )
}



